<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { EntryWithJournals } from '../types/entry';
  import { formatDate } from './dates';
  import Pill from './Pill.svelte';
  export let entry: EntryWithJournals;
  export let isViewDetail: boolean = false;
</script>

<div class="j-entry">
  <div class="j-container">
    <article>
      {#if entry.date}
        <div class="j-date j-flex-centre">
          <i class="ph-duotone ph-calendar-blank"></i>
          <time>{formatDate(entry.date)}</time>
        </div>
      {/if}
      <div class="flow">
        <SvelteMarkdown source="{entry.entry}" />
      </div>
      <footer class="j-flex-centre">
        {#if entry.journals?.name}
          <Pill href="{`/journal/${entry.journals.id}`}">
            {entry.journals.name}
          </Pill>
        {/if}
        {#if !isViewDetail}
          <a href="/entry/{entry.id}">Link</a>
        {:else}
          <a href="{entry.id}/edit">Edit</a>
          <button onclick="d.showModal()">Delete</button>
          <dialog id="d">
            <form method="POST" action="?/delete" class="flow">
              <p>Delete this entry?</p>
              <input type="hidden" name="id" value="{entry.id}" />
              <footer>
                <button aria-label="Delete this entry">Confirm</button>
              </footer>
            </form>
          </dialog>
        {/if}
      </footer>
    </article>
  </div>
</div>

<style lang="postcss">
  .j-entry {
    border-bottom: 1px solid var(--accent4);
    padding: var(--space-m) 0;
  }
  article {
    max-width: 65ch;
  }
  footer {
    font-size: var(--step--1);
    gap: var(--space-s);
  }

  .j-date {
    margin-bottom: var(--space-xs);
    gap: var(--space-2xs);
    font-size: var(--step-0);
    color: var(--theme10);
    font-variation-settings: 'wght' 400, 'wdth' 125;
  }
</style>
