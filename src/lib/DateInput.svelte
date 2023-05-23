<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  interface $$Props extends HTMLInputAttributes {
    value?: string;
    name: string;
  }

  export let value: $$Props['value'];
  export let name: $$Props['name'];
</script>

<div class="j-date-field j-flex-centre">
  <i class="ph-duotone ph-calendar-blank"></i>
  <input
    type="date"
    id="{name}"
    name="{name}"
    bind:value="{value}"
    on:input="{() => console.log('New value:', value)}"
    required
  />
</div>

<style lang="postcss">
  .j-date-field {
    gap: var(--space-2xs);
    position: relative;
    width: fit-content;

    input {
      display: inline-flex;
      width: max-content;
      padding-right: 2rem;
      align-items: center;

      &::-webkit-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    i {
      font-size: var(--step-0);
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
</style>
