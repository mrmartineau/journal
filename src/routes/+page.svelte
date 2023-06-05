<script lang="ts">
  import type { PageData } from './$types';
  import JournalEntry from '$lib/JournalEntry.svelte';
  import EntryForm from '$lib/EntryForm.svelte';

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
  <EntryForm journals="{journals}" />

  {#if entries}
    <div id="entries">
      {#each entries as item}
        <JournalEntry entry="{item}" isViewDetail="{false}" />
      {/each}
    </div>
  {/if}
{/if}
