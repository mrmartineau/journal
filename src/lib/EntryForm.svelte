<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import autosize from 'autosize';
  import { formatDate } from './dates';
  import { isYesterday, isToday } from 'date-fns';
  import AiEntry from './AiEntry.svelte';
  import { fade } from 'svelte/transition';
  import DateInput from './DateInput.svelte';

  export let journals: any[] | null = [];
  export let entry: any = null;
  let entryContent: string = entry?.entry || '';
  let date = entry?.date || new Date().toISOString().slice(0, 10);
  // Uncomment this to enable end date
  // let endDate = entry?.end_date
  //   ? new Date(entry?.end_date).toISOString().slice(0, 10)
  //   : undefined;
  let multipleDays = entry?.end_date || false;
  $: dayString = isToday(new Date(date))
    ? 'Today'
    : isYesterday(new Date(date))
    ? 'Yesterday'
    : '';

  const handleInsertAISuggestion = (
    action: 'replace' | 'insert',
    suggestion: string
  ) => {
    entryContent =
      action === 'replace' ? suggestion : entryContent + '\n' + suggestion;
  };

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
    <form method="post" use:enhance class="j-form" action="?/save">
      <div class="form-main">
        <fieldset>
          <label for="entry" class="visually-hidden">Entry</label>
        </fieldset>
        <!-- svelte-ignore a11y-autofocus -->
        <textarea
          id="entry"
          name="entry"
          required
          placeholder="What happened?"
          autofocus
          bind:value="{entryContent}"
        ></textarea>

        {#if entryContent?.length}
          <div transition:fade>
            <AiEntry
              entryContent="{entryContent}"
              handleInsertAISuggestion="{handleInsertAISuggestion}"
            />
          </div>
        {/if}
      </div>
      <div class="form-secondary">
        <div class="form-secondary-content">
          <fieldset>
            <label for="date" class="visually-hidden">
              {#if multipleDays}Start date{:else}Date{/if}
            </label>
            <DateInput name="date" bind:value="{date}" />
          </fieldset>

          <!-- Uncomment this to allow multiple day entry -->
          <!-- {#if multipleDays}
            <fieldset>
              <label for="end_date" class="visually-hidden">
                End date (optional)
              </label>
              <DateInput name="end_date" bind:value="{endDate}" />
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
    border-bottom: 1px solid var(--accent4);
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
    @media screen and (min-width: 850px) {
      width: 70%;
    }
  }
  .form-secondary {
    font-size: var(--step--1);
    position: relative;

    @media screen and (min-width: 850px) {
      width: 30%;
    }
  }
  .form-secondary-content {
    position: sticky;
    top: 1rem;
  }
  textarea {
    all: unset;
    width: 100%;
    min-height: 10rem;
    resize: vertical;
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
  button[type='submit'] {
    margin-block-start: var(--space-s);
    line-height: 2.7;
    padding: 0 var(--space-m);
  }
</style>
