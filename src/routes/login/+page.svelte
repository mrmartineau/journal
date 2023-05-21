<svelte:head>
  <title>Login</title>
</svelte:head>

<form method="POST" action="?/login" class="j-form">
  <div class="j-container">
    <div class="j-flex-centre">
      <fieldset>
        <label for="email">Email</label>
        <input name="email" id="email" type="email" autocomplete="username" />
      </fieldset>
      <fieldset>
        <label for="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          autocomplete="current-password"
        />
      </fieldset>
    </div>
    <footer class="j-flex-centre">
      <button formaction="?/register" class="secondary">Register</button>
      <button>Log in</button>
    </footer>
  </div>
</form>
