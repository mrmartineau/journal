<script lang="ts">
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<main class="container">
  <header>
    <nav>
      {#if session}
        <a href="/">📝 Home</a>
        <a href="/new">➕ New</a>
        <a href="/logout">Logout ({session.user.email})</a>
      {:else}
        <a href="/login">Login / Register</a>
      {/if}
    </nav>
  </header>

  <slot />
</main>

<style>
  @import 'https://unpkg.com/@picocss/pico@latest/css/pico.min.css';

  :global(body) {
    padding: 2rem;
  }

  :global(.pill) {
    color: var(--muted-color);
    background: var(--muted-border-color);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
  }

  header {
    margin-block-end: 1rem;
  }
</style>
