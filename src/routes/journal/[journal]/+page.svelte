<script lang="ts">
  import type { PageData } from './$types';
  import JournalEntry from '$lib/JournalEntry.svelte';

  export let data: PageData;
  $: ({ entries, journal } = data);
</script>

<svelte:head>
  <title>{journal?.name}</title>
</svelte:head>

{#if journal?.name}
  <div class="j-container">
    <h2>{journal?.name}</h2>
  </div>
{/if}

{#if entries}
  {#each entries as entry}
    <JournalEntry entry="{entry}" />
  {/each}
{/if}
