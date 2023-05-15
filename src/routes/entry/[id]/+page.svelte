<script lang="ts">
  import { formatDate } from '$lib/dates';
  import type { PageData } from './$types';
  import JournalEntry from '$lib/JournalEntry.svelte';

  export let data: PageData;
  $: ({ entry } = data);
</script>

<svelte:head>
  <title>
    Viewing entry ID: {entry.id} - {formatDate(entry.date ?? new Date())}
  </title>
</svelte:head>

<JournalEntry entry="{entry}" isViewDetail="{true}" />
