<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { EntryWithJournals } from '../types/entry';
  import { formatDate } from './dates';
  import Pill from './Pill.svelte';
  export let entry: EntryWithJournals;
  export let isViewDetail: boolean = false;
</script>

<div class="j-entry">
  <article class="j-container">
    <SvelteMarkdown source="{entry.entry}" />
    <footer class="j-flex-centre">
      {#if entry.journals?.name}
        <Pill href="{`/journal/${entry.journals.id}`}">
          {entry.journals.name}
        </Pill>
      {/if}
      {#if entry.date}
        <span class="date j-flex-centre">
          <i class="ph-duotone ph-calendar-blank"></i>
          <time>{formatDate(entry.date)}</time>
        </span>
      {/if}
      {#if !isViewDetail}
        <a href="/entry/{entry.id}">Link</a>
      {:else}
        <a href="{entry.id}/edit">Edit</a>
        <button onclick="d.showModal()">Delete</button>
        <dialog id="d">
          <form method="POST" action="?/delete">
            <section>
              <header>
                <p>Delete this entry?</p>
                <input type="hidden" name="id" value="{entry.id}" />
              </header>
              <footer>
                <button aria-label="Delete this entry">Confirm</button>
              </footer>
            </section>
          </form>
        </dialog>
      {/if}
    </footer>
  </article>
</div>

<style>
  .j-entry {
    border-bottom: 1px solid var(--slate4);
    padding: var(--space-m);
  }
  article {
    margin-inline-start: auto;
    margin-inline-end: auto;
    max-width: 65ch;
  }

  footer {
    font-size: var(--step--1);
    gap: var(--space-s);
  }

  .date {
    gap: var(--space-2xs);
  }
</style>
