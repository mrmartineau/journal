<script lang="ts">
  import { formatDate } from '$lib/dates';
  import SvelteMarkdown from 'svelte-markdown';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ session, entries, journals } = data);
  export let today = new Date();
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
  <h3>
    <i class="ph-duotone ph-calendar-blank"></i>
    {formatDate(today)}
  </h3>
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
            <span>
              <i class="ph-duotone ph-calendar-blank"></i>
              <time>{formatDate(item.date)}</time>
            </span>
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

<style>
  header {
    font-size: 0.875rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  h3 {
    text-align: center;
  }

  span {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }
</style>
