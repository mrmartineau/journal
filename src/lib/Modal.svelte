<script lang="ts">
  export let showModal: boolean;
  export let centre: boolean = false;

  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this="{dialog}"
  on:close="{() => (showModal = false)}"
  on:click|self="{() => dialog.close()}"
  class:centre="{centre}"
>
  <div on:click|stopPropagation>
    <slot />
    <!-- svelte-ignore a11y-autofocus -->
    <button
      autofocus
      on:click="{() => dialog.close()}"
      class="modal-close"
      aria-label="Close modal"
    >
      <i class="ph-duotone ph-x-circle"></i>
    </button>
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
    position: relative;
    background: var(--theme6);

    &.centre {
      text-align: center;
    }
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: var(--space-s);
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .modal-close {
    all:unset;
    position: absolute;
    top: 0px;
    right: 3px;
    font-size: 16px;
    color: var(--theme9);

    &:hover,
    &:focus {
      color: var(--accent11);
    }
  }
</style>
