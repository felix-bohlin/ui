<script lang="ts">
  import "../../elements/password-toggle.js"
  import type { Props } from "./types.svelte"

  let {
    for: htmlFor,
    label = "Show password",

    // Snippets
    iconChecked,
    iconUnchecked,
    ...rest
  }: Props = $props()
</script>

<opui-password-toggle {...rest}>
  <button
    class="ui-button ui-round"
    type="button"
    aria-label={label}
    aria-pressed="false"
    command="--toggle-password"
    commandfor={htmlFor}
  >
    {#if iconUnchecked}
      <span aria-hidden="true" class="ui-icon-unchecked">
        {@render iconUnchecked()}
      </span>
    {:else}
      <svg
        aria-hidden="true"
        class="ui-icon-unchecked"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg>
    {/if}
    {#if iconChecked}
      <span aria-hidden="true" class="ui-icon-checked">
        {@render iconChecked()}
      </span>
    {:else}
      <svg
        aria-hidden="true"
        class="ui-icon-checked"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg>
    {/if}
  </button>
</opui-password-toggle>
