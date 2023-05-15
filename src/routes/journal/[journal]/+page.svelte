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
  <h2>{journal?.name}</h2>
{/if}

{#if entries}
  {#each entries as entry}
    <JournalEntry entry="{entry}" />
  {/each}
{/if}
