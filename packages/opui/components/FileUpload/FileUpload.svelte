<script lang="ts">
  import "../../elements/file-upload.js"
  import { hydrated } from "../svelte"
  import Button from "../Button/Button.svelte"
  import Progress from "../Progress/Progress.svelte"
  import { classAttrs } from "../cx"
  import type { Props } from "./types.svelte"

  let {
    accept,
    class: className,
    description,
    disabled,
    id,
    items,
    label,
    multiple,
    onremove,
    onselect,
    progressLabel = "Uploading {label}",
    removeLabel = "Remove {label}",
    status,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const base = $derived(id || `file-upload-${uid}`)
  const inputId = $derived(base)
  const descriptionId = $derived(
    description ? `${base}-description` : undefined,
  )
</script>

<opui-file-upload
  class={["ui-file-upload", className]}
  {onremove}
  {onselect}
  data-hydrating=""
  {@attach hydrated}
  {...rest}
>
  <div class="ui-content">
    <div class="ui-field">
      <label class="ui-label">
        <input
          {accept}
          aria-describedby={descriptionId}
          class="ui-sr-only"
          {disabled}
          id={inputId}
          {multiple}
          type="file"
        />
        <span class="ui-button ui-outlined">{label}</span>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        ></svg>
      </label>
      {#if description}
        <span class="ui-description" id={descriptionId}>{description}</span>
      {/if}
    </div>
    {#if items && items.length > 0}
      <ul class="ui-list">
        {#each items as item, index (index)}
          <li {...classAttrs([{ "ui-error": item.state === "error" }])}>
            <div class="ui-start">
              {#if item.preview}
                <img alt="" src={item.preview} />
              {/if}{#if item.state === "error" && item.description}
                <button
                  aria-labelledby={`${inputId}-label-${index} ${inputId}-description-${index}`}
                  popovertarget={`${inputId}-description-${index}`}
                  type="button"
                ></button>
              {/if}
            </div>
            <div class="ui-text">
              <p dir="auto" id={`${inputId}-label-${index}`}>{item.label}</p>
              {#if item.state === "queued" || item.state === "uploading"}
                <Progress
                  aria-label={progressLabel.replace("{label}", item.label)}
                  value={item.state === "uploading"
                    ? (item.progress ?? 0)
                    : undefined}
                />
              {/if}{#if item.description}
                <p
                  class="ui-description"
                  id={`${inputId}-description-${index}`}
                  popover={item.state === "error" ? "auto" : undefined}
                >
                  {item.description}
                </p>
              {/if}
            </div>
            <div class="ui-end">
              <Button
                aria-label={removeLabel.replace("{label}", item.label)}
                command="--remove"
                commandfor={inputId}
                round
                size="small"
                value={item.value}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                ></svg>
              </Button>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <span class="ui-sr-only" role="status">{status}</span>
</opui-file-upload>
