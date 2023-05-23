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
    icon: string;
  }
  const aiOptions: AiOption[] = [
    {
      action: 'continue',
      label: 'Continue writing',
      icon: 'ph-pencil-line'
    },
    {
      action: 'improve',
      label: 'Improve writing',
      icon: 'ph-magic-wand'
    },
    {
      action: 'fix',
      label: 'Fix grammar',
      icon: 'ph-checks'
    },
    {
      action: 'shorter',
      label: 'Make shorter',
      icon: 'ph-sort-descending'
    },
    {
      action: 'longer',
      label: 'Make longer',
      icon: 'ph-sort-ascending'
    },
    {
      action: 'simplify',
      label: 'Simplify',
      icon: 'ph-sparkle'
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
      <div class="j-entryForm-ai-suggestion-content flow">
        <SvelteMarkdown source="{aiSuggestion}" />
      </div>
      {#if !aiLoading}
        <div in:fade>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{() => handleInsertAISuggestion('replace', aiSuggestion)}"
            disabled="{aiLoading}"
          >
            <i class="ph-duotone ph-swap"></i>
            Replace
          </button>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{() => handleInsertAISuggestion('insert', aiSuggestion)}"
            disabled="{aiLoading}"
          >
            <i class="ph-duotone ph-caret-down"></i>
            Insert below
          </button>
          <button
            class="j-btn-ai"
            type="button"
            on:click="{handleClearAISuggestion}"
            disabled="{aiLoading}"
          >
            <i class="ph-duotone ph-backspace"></i>
            Clear AI suggestion
          </button>
        </div>
      {/if}
    </div>
  {/if}

  {#if entryContent?.length}<div
      class="j-entryForm-ai-options j-flex-centre j-flex-wrap"
    >
      {#each aiOptions as item}
        <button
          class="j-btn-ai"
          type="button"
          on:click="{() => handleAI(item.action)}"
          formaction="?/ai"
          aria-pressed="{aiAction === item.action}"
          disabled="{isEntryEmpty || aiLoading}"
        >
          <i class="ph-duotone {item.icon}"></i>
          {item.label}
          {#if aiLoading && aiAction === item.action}<i
              class="ph-duotone ph-spinner-gap loading"
            ></i>{/if}
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
    border-bottom: 1px solid var(--accentA5);
    padding-block-end: var(--space-xs);
    margin-block-end: var(--space-xs);

    :global(p) {
      margin-block-start: 0;
    }
  }

  .j-entryForm-ai-options {
    gap: var(--space-3xs);
  }
</style>
