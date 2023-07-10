<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import JournalEntry from '$lib/JournalEntry.svelte';
  import EntryForm from '$lib/EntryForm.svelte';
  import { invalidate } from '$app/navigation';

  export let data: PageData;
  $: ({ session, entries, journals } = data);

  export let form: ActionData;
  if (form?.success) {
    invalidate('/');
  }
</script>

<svelte:head>
  <title>Journal</title>
</svelte:head>

{#if session}
  <EntryForm journals="{journals}" />

  <!-- {#if journals?.length}
  <div class="text-center">
    {#each journals as item}
      <a href={`/journal/${item.id}`}>
        {item.name ?? ''}
      </a>
    {/each}
  </div>
{/if} -->

  {#if entries}
    <div id="entries">
      {#each entries as item}
        <JournalEntry entry="{item}" isViewDetail="{false}" />
      {/each}
    </div>
  {/if}
{/if}
