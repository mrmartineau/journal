<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { EntryWithJournals } from '../types/entry';
  import { formatDate } from './dates';
  import Pill from './Pill.svelte';
  import Modal from './Modal.svelte';
  export let entry: EntryWithJournals;
  export let isViewDetail: boolean = false;
  let showModal = false;
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
        <a href="/entry/{entry.id}/edit">
          <i class="ph-duotone ph-pencil-simple"></i>
          Edit
        </a>
        {#if !isViewDetail}
          <a href="/entry/{entry.id}">
            <span class="visually-hidden">Link</span>
            <i class="ph-duotone ph-link-simple"></i>
          </a>
        {:else}
          <button on:click="{() => (showModal = true)}">Delete</button>
          <Modal bind:showModal="{showModal}" centre>
            <form method="POST" action="?/delete" class="flow">
              <p>Delete this entry?</p>
              <input type="hidden" name="id" value="{entry.id}" />
              <footer>
                <button aria-label="Delete this entry">Confirm</button>
              </footer>
            </form>
          </Modal>
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

    a {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3xs);
    }
  }

  .j-date {
    margin-bottom: var(--space-xs);
    gap: var(--space-2xs);
    font-size: var(--step-0);
    color: var(--theme10);
    font-variation-settings: 'wght' 400, 'wdth' 125;
  }
</style>
