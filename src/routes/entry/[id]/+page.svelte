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
      <small>
        <time>{formatDate(entry.date)}</time>
      </small>
    {/if}
  </header>
  <SvelteMarkdown source="{entry.entry}" />

  <div class="grid">
    <a href="{`${entry.id}/edit`}">Edit</a>
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

    <button onclick="d.showModal()">Delete</button>
  </div>
</article>
