<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import autosize from 'autosize';
  import { formatDate } from './dates';
  import { isYesterday, isToday } from 'date-fns';

  export let journals: any[] | null = [];
  export let entry: any = null;
  let date = entry?.date || new Date().toISOString().slice(0, 10);
  let endDate = entry?.end_date
    ? new Date(entry?.end_date).toISOString().slice(0, 10)
    : undefined;
  let multipleDays = entry?.end_date || false;
  $: dayString = isToday(new Date(date))
    ? 'Today'
    : isYesterday(new Date(date))
    ? 'Yesterday'
    : '';

  onMount(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      autosize(textarea);
    }
  });
</script>

<div class="form-container">
  <div class="j-container">
    <h3>
      {#if entry?.entry}Edit: {/if}
      {#if dayString}
        {dayString}
        <span>{formatDate(date)}</span>
      {:else}
        {formatDate(date)}
      {/if}
    </h3>
    <form method="post" use:enhance class="j-form">
      <div class="form-main">
        <fieldset>
          <label for="entry" class="visually-hidden">Entry</label>
        </fieldset>
        {#if entry?.entry}
          <!-- svelte-ignore a11y-autofocus -->
          <!-- prettier-ignore -->
          <textarea
            id="entry"
            name="entry"
            required
            placeholder="What happened today?"
            autofocus
          >{entry.entry}</textarea>
        {:else}
          <!-- svelte-ignore a11y-autofocus -->
          <textarea
            id="entry"
            name="entry"
            required
            placeholder="What happened?"
            autofocus
          ></textarea>
        {/if}
      </div>
      <div class="form-secondary">
        <div class="form-secondary-content">
          <fieldset>
            <label for="date" class="visually-hidden">
              {#if multipleDays}Start date{:else}Date{/if}
            </label>
            <div class="j-date-field j-flex-centre">
              <i class="ph-duotone ph-calendar-blank"></i>
              <input
                type="date"
                id="date"
                name="date"
                bind:value="{date}"
                on:input="{() => console.log('New value:', date)}"
                required
              />
            </div>
          </fieldset>
          {#if multipleDays}
            <fieldset>
              <label for="end_date" class="visually-hidden">
                End date (optional)
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value="{endDate}"
              />
            </fieldset>
          {/if}
          <!-- <div class="j-flex-centre">
            <label for="multipleDays">
              <input
                type="checkbox"
                id="multipleDays"
                name="multipleDays"
                bind:checked="{multipleDays}"
              />
              Multiple days?
            </label>
          </div> -->
          {#if journals?.length}
            <fieldset class="j-entryForm-journals-container">
              <legend class="visually-hidden">Journal</legend>
              <div class="j-entryForm-journals-list">
                {#each journals as journalItem}
                  <label>
                    <input
                      type="radio"
                      value="{journalItem.id}"
                      name="journal"
                      checked="{entry?.journals?.id === journalItem.id}"
                    />
                    {journalItem.name}
                  </label>
                {/each}
              </div>
            </fieldset>
          {/if}
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</div>

<style lang="postcss">
  .form-container {
    border-bottom: 1px solid var(--theme4);
    padding-bottom: var(--space-m);
  }
  @media screen and (min-width: 850px) {
    .j-form {
      flex-direction: row;
    }
  }
  h3 {
    display: flex;
    align-items: baseline;
    gap: var(--space-xs);
    margin-block-end: 0;
    flex-wrap: wrap;

    span {
      font-size: var(--step--1);
      color: var(--theme9);
      font-variation-settings: 'wght' 400, 'wdth' 125, 'ital' 0;
      flex-shrink: 0;
    }
  }
  .form-main {
    width: 80%;
  }
  .form-secondary {
    width: 20%;
    font-size: var(--step--1);
    position: relative;
  }
  .form-secondary-content {
    position: sticky;
    top: 1rem;
  }
  /* input[type='date'] {
    width: fit-content;
  } */
  .j-date-field {
    gap: var(--space-2xs);
  }
  textarea {
    all: unset;
    width: 100%;
    min-height: 10rem;
    resize: vertical;
    display: block;
    font-family: var(--f-base);
    font-size: var(--step-1);
    color: var(--accent10);
  }
  .j-entryForm-journals-list {
    margin-block-start: var(--space-xs);
    display: flex;
    gap: var(--space-xs);
    align-items: center;

    label {
      flex-shrink: 0;
      vertical-align: text-top;
    }
    @media screen and (min-width: 850px) {
      display: block;
    }
  }
  button {
    margin-block-start: var(--space-s);
    line-height: 2.7;
    padding: 0 var(--space-m);
  }
</style>
