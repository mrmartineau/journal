<script lang="ts">
  import EntryForm from '$lib/EntryForm.svelte';
  export let data;
  $: ({ journals, entry } = data);
</script>

<svelte:head>
  <title>Edit entry: {entry?.id}</title>
</svelte:head>

<EntryForm journals="{journals}" entry="{entry}" />
