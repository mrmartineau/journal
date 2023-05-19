<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import autosize from 'autosize';

  let multipleDays = false;
  export let journals: any[] | null = [];
  let date = new Date().toISOString().slice(0, 10);

  onMount(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      autosize(textarea);
    }
  });
</script>

<div class="form-container">
  <form method="post" use:enhance>
    <div class="form-main">
      <fieldset>
        <label for="entry" class="visually-hidden">Entry</label>
        <!-- svelte-ignore a11y-autofocus -->
        <textarea
          id="entry"
          name="entry"
          required
          placeholder="What happened today?"
          autofocus
        ></textarea>
      </fieldset>
      <button type="submit">Submit</button>
    </div>

    <div class="form-secondary">
      <fieldset>
        <label for="date" class="visually-hidden">
          {#if multipleDays}Start date{:else}Date{/if}
        </label>
        <input type="date" id="date" name="date" value="{date}" required />
      </fieldset>
      {#if multipleDays}
        <fieldset>
          <label for="end_date" class="visually-hidden">
            End date (optional)
          </label>
          <input type="date" id="end_date" name="end_date" />
        </fieldset>
      {/if}
      <div class="j-flex-centre">
        <label for="multipleDays">
          <input
            type="checkbox"
            id="multipleDays"
            name="multipleDays"
            bind:checked="{multipleDays}"
          />
          Multiple days?
        </label>
      </div>

      {#if journals?.length}
        <fieldset class="j-journals-list">
          <legend class="visually-hidden">Journal</legend>
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
    </div>
  </form>
</div>

<style>
  .form-container {
    border-bottom: 1px solid var(--slate4);
    padding: 0 var(--space-m) var(--space-m);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
  }

  @media screen and (min-width: 850px) {
    form {
      flex-direction: row;
    }
  }

  .form-main {
    width: 80%;
  }

  .form-secondary {
    width: 20%;
    font-size: var(--step--1);
  }

  fieldset {
    all: unset;
    display: block;
  }
  label {
    display: block;
    margin-block-end: 0.3rem;
  }
  textarea {
    all: unset;
    width: 100%;
    min-height: 10rem;
    resize: vertical;
    display: block;
    font-family: var(--f-base);
    font-size: var(--step-1);
  }
  .j-journals-list {
    margin-block-start: var(--space-xs);
  }
</style>
