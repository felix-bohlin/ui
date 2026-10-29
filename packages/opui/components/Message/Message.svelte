<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    author,
    class: className,
    datetime,
    newAuthor,
    outgoing,
    time,
    typing,

    // Snippets
    children,
    actions,
    bottom,
    end,
    start,
    ...rest
  }: Props = $props()
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
  {@render start?.()}
  {#if typing}
    <div class="ui-content" role="status">
      <span class="ui-sr-only">{@render children?.()}</span>
    </div>
  {:else}
    <div class="ui-content">
      {#if author}
        <p class="ui-header">{author}</p>
      {/if}
      {@render children?.()}
      {#if time || end}
        <p class="ui-footer">
          {#if time}
            <time {datetime}>{time}</time>
          {/if}
          {#if end}
            <span class="ui-end">{@render end()}</span>
          {/if}
        </p>
      {/if}
    </div>
  {/if}
  {#if actions}
    <div class="ui-actions">{@render actions()}</div>
  {/if}
  {#if bottom}
    <div class="ui-bottom">{@render bottom()}</div>
  {/if}
</li>
