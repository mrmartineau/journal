<svelte:head>
  <title>Login</title>
</svelte:head>

<form method="POST" action="?/login">
  <label>
    Email
    <input name="email" type="email" autocomplete="username" />
  </label>
  <label>
    Password
    <input name="password" type="password" autocomplete="current-password" />
  </label>

  <div class="grid">
    <button formaction="?/register" class="secondary">Register</button>
    <button>Log in</button>
  </div>
</form>
