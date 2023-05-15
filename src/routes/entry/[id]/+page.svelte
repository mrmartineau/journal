<script lang="ts">
  import { formatDate } from '$lib/dates';
  import SvelteMarkdown from 'svelte-markdown';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ entry } = data);
</script>

<svelte:head>
  <title>
    Viewing entry ID: {entry.id} - {formatDate(entry.date ?? new Date())}
  </title>
</svelte:head>

<article>
  <header>
    {#if entry.journals?.name}
      <a href="{`${entry.journals.id}`}">
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
    <div class="grid">
      <a href="{`${entry.id}/edit`}">Edit</a>
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
  </footer>
</article>

<style>
  header {
    font-size: 0.875rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  h3 {
    text-align: center;
  }

  span {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }
</style>
