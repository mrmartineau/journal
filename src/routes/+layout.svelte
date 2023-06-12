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
        <img src="/logo@0.5x.png" alt="Journal logo" class="logo" />
        Journal
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

  .logo {
    width: 1.6rem;
    height: 1.6rem;
    margin-inline-end: 0.5rem;
    vertical-align: middle;
    @media (prefers-color-scheme: light) {
      border-radius: 0.4rem;
      box-shadow: 0 0 0 3px var(--indigoA6);
    }
  }
</style>
