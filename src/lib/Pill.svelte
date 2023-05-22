<script lang="ts">
  export let href: string;
</script>

<a href="{href}"><slot /></a>

<style lang="postcss">
  a {
    color: var(--muted-color);
    background: var(--accent5);
    border-radius: 0.25rem;
    padding: 0 var(--space-2xs);
    text-transform: uppercase;
    text-decoration: none;
    line-height: 1.7;

    &:hover {
      background: var(--accent3);
    }
  }
</style>
