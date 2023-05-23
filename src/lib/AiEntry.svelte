<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import {
    createParser,
    type ParsedEvent,
    type ReconnectInterval
  } from 'eventsource-parser';
  import { fade } from 'svelte/transition';

  export let entryContent: string;
  export let handleInsertAISuggestion: (
    action: 'replace' | 'insert',
    suggestion: string
  ) => void;
  let aiSuggestion = '';
  let aiLoading = false;
  let aiAction: HandleAIAction | undefined;
  $: isEntryEmpty = entryContent?.length ? false : true;

  type HandleAIAction =
    | 'continue'
    | 'improve'
    | 'fix'
    | 'shorter'
    | 'longer'
    | 'simplify'
    | 'tone:casual'
    | 'tone:confident';
  const handleAI = async (action: HandleAIAction) => {
    aiLoading = true;
    aiAction = action;
    handleClearAISuggestion();

    const aiResponse = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({
        action,
        entry: entryContent
      })
    });
    const reader = aiResponse.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();

    function onParse(event: ParsedEvent | ReconnectInterval) {
      if (event.type === 'event') {
        try {
          const data = JSON.parse(event.data);
          const content = data?.choices[0]?.delta?.content;
          console.log('content: %s', content);
          if (content !== undefined) {
            aiSuggestion += content;
          }
        } catch (e) {
          console.log('error parsing data: %s', event.data);
        }
      } else if (event.type === 'reconnect-interval') {
        console.log(
          'We should set reconnect interval to %d milliseconds',
          event.value
        );
      }
    }

    const parser = createParser(onParse);

    while (true) {
      const { value, done } = await reader?.read();
      if (done) {
        aiLoading = false;
        aiAction = undefined;
        break;
      }
      parser.feed(value);
    }
  };
  // const handleInsertAISuggestion = (action: 'replace' | 'insert') => {
  //   entryContent = action === 'replace' ? aiSuggestion : entry + '\n' + aiSuggestion;
  // };
  const handleClearAISuggestion = () => {
    aiSuggestion = '';
  };
  interface AiOption {
    action: HandleAIAction;
    label: string;
  }
  const aiOptions: AiOption[] = [
    {
      action: 'continue',
      label: 'Continue writing'
    },
    {
      action: 'improve',
      label: 'Improve writing'
    },
    {
      action: 'fix',
      label: 'Fix grammar'
    },
    {
      action: 'shorter',
      label: 'Make shorter'
    },
    {
      action: 'longer',
      label: 'Make longer'
    },
    {
      action: 'simplify',
      label: 'Simplify'
    }
    // {
    //   action: 'tone:casual',
    //   label: 'More casual'
    // },
    // {
    //   action: 'tone:confident',
    //   label: 'More confident'
    // }
  ];
</script>

<div class="j-entryForm-aiContainer">
  {#if aiSuggestion}
    <div class="j-entryForm-ai-suggestion">
      <SvelteMarkdown source="{aiSuggestion}" />
      {#if !aiLoading}
        <div in:fade>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{() => handleInsertAISuggestion('replace', aiSuggestion)}"
            disabled="{aiLoading}"
          >
            Replace
          </button>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{() => handleInsertAISuggestion('insert', aiSuggestion)}"
            disabled="{aiLoading}"
          >
            Insert below
          </button>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{handleClearAISuggestion}"
            disabled="{aiLoading}"
          >
            Clear AI suggestion
          </button>
        </div>
        {/if}
    </div>
  {/if}

  {#if entryContent?.length}<div
      class="j-entryForm-ai-options j-flex-centre j-flex-wrap"
    >
      AI:
      {#each aiOptions as item}
        <button
          class="j-btn-ai"
          type="button"
          on:click="{() => handleAI(item.action)}"
          formaction="?/ai"
          aria-pressed="{aiAction === item.action}"
          disabled="{isEntryEmpty || aiLoading}"
        >
          {item.label}
          {#if aiLoading && aiAction === item.action}<i class="ph-duotone ph-spinner-gap"></i>{/if}
        </button>
      {/each}
    </div>{/if}
</div>

<style lang="postcss">
  .j-entryForm-aiContainer {
    background-color: var(--accentA3);
    border-radius: var(--space-3xs);
    padding: var(--space-xs);
  }
  .j-entryForm-ai-suggestion {
    margin-block-end: var(--space-s);

    :global(p) {
      margin-block-start: 0;
    }
  }
  .j-entryForm-ai-options {
    gap: var(--space-3xs);
  }
</style>
