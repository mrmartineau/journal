<script lang="ts">
  import { formatDate } from '$lib/dates';
  import SvelteMarkdown from 'svelte-markdown';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ entries, journal } = data);
</script>

<svelte:head>
  <title>{journal?.name}</title>
</svelte:head>

{#if journal?.name}
  <h2>{journal?.name}</h2>
{/if}

{#if entries}
  {#each entries as item}
    <article>
      <header>
        {#if item.journals.name}
          <span class="pill">{item.journals.name ?? ''}</span>
        {/if}
        {#if item.date}<small>
            <time>{formatDate(item.date)}</time>
          </small>{/if}
      </header>
      <SvelteMarkdown source="{item.entry}" />
      <footer>
        <a href="/entry/{item.id}">Link</a>
      </footer>
    </article>
  {/each}
{/if}
