<script lang="ts">
  import { formatDate } from '$lib/dates';
  import type { PageData } from './$types';
  import JournalEntry from '$lib/JournalEntry.svelte';

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
      <JournalEntry entry="{item}" isViewDetail="{false}" />
    {/each}
  {/if}
{/if}

<style>
  h3 {
    text-align: center;
  }
</style>
