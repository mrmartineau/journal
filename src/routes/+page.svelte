<script lang="ts">
  import { formatDate } from '$lib/dates';
  import SvelteMarkdown from 'svelte-markdown';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ session, entries, journals } = data);
</script>

<svelte:head>
  <title>Journal</title>
</svelte:head>

<!-- {#if journals?.length}
  <div class="grid">
    {#each journals as item}
      <a href={`/journal/${item.id}`}>
        {item.name ?? ''}
      </a>
    {/each}
  </div>
{/if} -->

{#if session}
  {#if entries}
    {#each entries as item}
      <article>
        <header>
          {#if item.journals?.name}
            <a href="{`/journal/${item.journals.id}`}">
              <span class="pill">{item.journals.name}</span>
            </a>
          {/if}
          {#if item.date}
            <small>
              <time>{formatDate(item.date)}</time>
            </small>
          {/if}
        </header>
        <SvelteMarkdown source="{item.entry}" />
        <footer>
          <a href="/entry/{item.id}">Link</a>
        </footer>
      </article>
    {/each}
  {/if}
{/if}
