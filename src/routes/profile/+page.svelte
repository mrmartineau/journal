<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ user } = data);
</script>

<div>Protected content for {user.email}</div>
<pre>{JSON.stringify(user, null, 2)}</pre>

<style>
  pre {
    padding: 1rem;
    margin: 1rem 0;
  }
</style>
