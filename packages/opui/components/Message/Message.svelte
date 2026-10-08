<script lang="ts">
  import Button from "../Button/Button.svelte"
  import type { Props } from "./types.svelte"

  let {
    author,
    class: className,
    datetime,
    newAuthor,
    outgoing,
    picker,
    pickerLabel = "Add reaction",
    reactions,
    reactionsLabel = "Reactions",
    time,
    typing,

    // Snippets
    avatar,
    children,
    footer,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const pickerId = `reactions-${uid}`
  const hasPicker = $derived(!!picker?.length)
</script>

<li
  class={[
    "ui-message",
    {
      "ui-new-author": newAuthor,
      "ui-outgoing": outgoing,
      "ui-typing": typing,
    },
    className,
  ]}
  {...rest}
>
  {@render avatar?.()}
  {#if typing}
    <div class="ui-bubble" role="status">
      <span class="ui-sr-only">{@render children?.()}</span>
    </div>
  {:else}
    <div class="ui-bubble">
      {#if author}
        <p class="ui-header">{author}</p>
      {/if}
      {@render children?.()}
      {#if time || footer}
        <p class="ui-footer">
          {#if time}
            <time {datetime}>{time}</time>
          {/if}
          {@render footer?.()}
        </p>
      {/if}
    </div>
  {/if}
  {#if reactions?.length}
    <div aria-label={reactionsLabel} class="ui-reactions" role="group">
      {#each reactions as { count, emoji, label, mine, value } (value ?? emoji)}
        <label class="ui-reaction" data-count={count}>
          <input
            checked={mine}
            class="ui-sr-only"
            defaultChecked={mine}
            form={hasPicker ? pickerId : undefined}
            name="reaction"
            type="checkbox"
            value={value ?? emoji}
          />
          <span aria-hidden="true">{emoji}</span>
          <span class="ui-sr-only">{label}</span>
        </label>
      {/each}
    </div>
  {/if}
  {#if hasPicker}
    <Button
      class="ui-reaction-add"
      command="toggle-popover"
      commandfor={pickerId}
      label={pickerLabel}
      rounded
      size="x-small"
    >
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
        />
      </svg>
    </Button>
    <form class="ui-reaction-picker" id={pickerId} popover="">
      {#each picker ?? [] as { emoji, label, value } (value ?? emoji)}
        <button
          aria-label={label}
          name="add"
          type="submit"
          value={value ?? emoji}>{emoji}</button
        >
      {/each}
    </form>
  {/if}
</li>
