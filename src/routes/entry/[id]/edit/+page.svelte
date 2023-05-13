<script lang="ts">
  import { enhance } from '$app/forms';
  import autosize from 'autosize';
  import { onMount } from 'svelte';
  export let data;
  $: ({ journals, entry } = data);
  let date = data.entry?.date
    ? new Date(data.entry?.date).toISOString().slice(0, 10)
    : undefined;
  let endDate = data.entry?.end_date
    ? new Date(data.entry?.end_date).toISOString().slice(0, 10)
    : undefined;
  export let multipleDays = endDate ? true : false;
  onMount(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      autosize(textarea);
    }
  });
</script>

<svelte:head>
  <title>Edit entry: {entry?.id}</title>
</svelte:head>

{#if entry}
  <h1>Edit entry: {entry.id}</h1>

  <form method="post" use:enhance>
    <fieldset>
      <label for="entry">Entry</label>
      <textarea id="entry" name="entry" required>{entry.entry}</textarea>
    </fieldset>

    {#if journals?.length}
      <fieldset>
        <legend>Journal</legend>
        <div class="grid">
          {#each journals as journalItem}
            <label>
              <input
                type="radio"
                value="{journalItem.id}"
                name="journal"
                checked="{entry.journals?.id === journalItem.id}"
                required
              />
              {journalItem.name}
            </label>
          {/each}
        </div>
      </fieldset>
    {/if}

    <div class="grid">
      <fieldset>
        <label for="date">
          {#if multipleDays}Start date{:else}Date{/if}
        </label>
        <input type="date" id="date" name="date" value="{date}" required />
      </fieldset>
      {#if multipleDays}
        <fieldset>
          <label for="end_date">End date (optional)</label>
          <input type="date" id="end_date" name="end_date" />
        </fieldset>
      {/if}
      <div>
        <label for="multipleDays">Multiple days?</label>
        <input
          type="checkbox"
          id="multipleDays"
          name="multipleDays"
          bind:checked="{multipleDays}"
        />
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  fieldset {
    all: unset;
  }
  label {
    display: block;
    margin-block-end: 0.3rem;
  }
  textarea {
    width: 100%;
    height: 10rem;
    resize: vertical;
  }
</style>
