<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { EntryWithJournals } from '../types/entry';
  import { formatDate } from './dates';
  export let entry: EntryWithJournals;
  export let isViewDetail: boolean = false;
</script>

<article>
  <header>
    {#if entry.journals?.name}
      <a href="{`/journal/${entry.journals.id}`}">
        <span class="pill">{entry.journals.name}</span>
      </a>
    {/if}
    {#if entry.date}
      <span>
        <i class="ph-duotone ph-calendar-blank"></i>
        <time>{formatDate(entry.date)}</time>
      </span>
    {/if}
  </header>

  <SvelteMarkdown source="{entry.entry}" />

  <footer>
    {#if !isViewDetail}
      <a href="/entry/{entry.id}">Link</a>
    {:else}
      <div class="grid">
        <a href="{entry.id}/edit">Edit</a>
        <button onclick="d.showModal()">Delete</button>
        <dialog id="d">
          <form method="POST" action="?/delete">
            <article>
              <header>
                <p>Delete this entry?</p>
                <input type="hidden" name="id" value="{entry.id}" />
              </header>
              <footer>
                <button aria-label="Delete this entry">Confirm</button>
              </footer>
            </article>
          </form>
        </dialog>
      </div>
    {/if}
  </footer>
</article>

<style>
  header {
    font-size: 0.875rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  span {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }
</style>
