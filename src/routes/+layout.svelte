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
    } = supabase.auth.onAuthStateChange((_, _session) => {
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

<header class="j-container">
  <nav>
    {#if session}
      <a href="/">
        <i class="ph-duotone ph-notebook"></i>
        Entries
      </a>
      <a href="/profile">
        <i class="ph-duotone ph-user-circle"></i>
        Profile
      </a>
    {:else}
      <a href="/login">
        <i class="ph-duotone ph-sign-in"></i>
        Login / Register
      </a>
    {/if}
  </nav>
</header>

<main>
  <slot />
</main>

<style>
  @import '../css/index.css';

  header {
    margin-block-end: 1rem;
    padding-inline-start: var(--space-m);
    padding-inline-end: var(--space-m);
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav i {
    vertical-align: baseline;
  }
</style>
