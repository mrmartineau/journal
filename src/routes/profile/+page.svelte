<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ user } = data);
</script>

<h3>Hello, {user.email}</h3>
<p>
  User ID: <code>{user.id}</code>
</p>

<a href="/logout">
  <i class="ph-duotone ph-sign-out"></i>
  Logout
</a>
