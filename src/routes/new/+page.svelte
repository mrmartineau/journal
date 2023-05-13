<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import autosize from 'autosize';
  export let data;
  export let multipleDays = false;
  $: ({ journals } = data);
  let date = new Date().toISOString().slice(0, 10);

  onMount(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      autosize(textarea);
    }
  });
</script>

<svelte:head>
  <title>➕ New entry</title>
</svelte:head>

<h1>➕ New entry</h1>

<form method="post" use:enhance>
  <fieldset>
    <label for="entry">Entry</label>
    <textarea id="entry" name="entry" required></textarea>
  </fieldset>

  {#if journals?.length}
    <fieldset>
      <legend>Journal</legend>
      <div class="grid">
        {#each journals as journalItem}
          <label>
            <input type="radio" value="{journalItem.id}" name="journal" />
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
    min-height: 10rem;
    resize: vertical;
  }
</style>
