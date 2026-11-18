/** @jsxImportSource @solidjs/web */
import { createUniqueId, For, omit } from "solid-js"
import "../../elements/file-upload.js"
import Button from "../Button/Button.solid"
import Progress from "../Progress/Progress.solid"
import { cx } from "../cx"
import { hydrated, hydrating } from "../solid"
import type { Props } from "./types.solid"

export default function FileUpload(props: Props) {
  const rest = omit(
    props,
    "accept",
    "class",
    "description",
    "disabled",
    "id",
    "items",
    "label",
    "multiple",
    "progressLabel",
    "ref",
    "removeLabel",
    "status",
  )
  const uid = createUniqueId()
  const progressLabel = () =>
    props.progressLabel === undefined
      ? "Uploading {label}"
      : props.progressLabel
  const removeLabel = () =>
    props.removeLabel === undefined ? "Remove {label}" : props.removeLabel
  const base = () => props.id || `file-upload-${uid}`
  const inputId = () => base()
  const descriptionId = () =>
    props.description ? `${base()}-description` : undefined

  return (
    <opui-file-upload
      class={["ui-file-upload", props.class]}
      {...hydrating()}
      ref={[props.ref, hydrated]}
      {...rest}
    >
      <div class="ui-content">
        <div class="ui-field">
          <label class="ui-label">
            <input
              accept={props.accept}
              aria-describedby={descriptionId()}
              class="ui-sr-only"
              disabled={props.disabled}
              id={inputId()}
              multiple={props.multiple}
              type="file"
            />
            <span class="ui-button ui-outlined">{props.label}</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            />
          </label>
          {props.description && (
            <span class="ui-description" id={descriptionId()}>
              {props.description}
            </span>
          )}
        </div>
        {props.items && props.items.length > 0 && (
          <ul class="ui-list">
            <For each={props.items} keyed={false}>
              {(item, index) => {
                const value = () =>
                  item().state === "uploading"
                    ? (item().progress ?? 0)
                    : undefined
                return (
                  <li class={cx([{ "ui-error": item().state === "error" }])}>
                    <div class="ui-start">
                      {item().preview && <img alt="" src={item().preview} />}
                      {item().state === "error" && item().description && (
                        <button
                          aria-labelledby={`${inputId()}-label-${index} ${inputId()}-description-${index}`}
                          popovertarget={`${inputId()}-description-${index}`}
                          type="button"
                        />
                      )}
                    </div>
                    <div class="ui-text">
                      <p dir="auto" id={`${inputId()}-label-${index}`}>
                        {item().label}
                      </p>
                      {(item().state === "queued" ||
                        item().state === "uploading") && (
                        <Progress
                          aria-label={progressLabel().replace(
                            "{label}",
                            item().label,
                          )}
                          value={value()}
                        />
                      )}
                      {item().description && (
                        <p
                          class="ui-description"
                          id={`${inputId()}-description-${index}`}
                          popover={
                            item().state === "error" ? "auto" : undefined
                          }
                        >
                          {item().description}
                        </p>
                      )}
                    </div>
                    <div class="ui-end">
                      <Button
                        aria-label={removeLabel().replace(
                          "{label}",
                          item().label,
                        )}
                        command="--remove"
                        commandfor={inputId()}
                        round
                        size="small"
                        value={item().value}
                      >
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                        />
                      </Button>
                    </div>
                  </li>
                )
              }}
            </For>
          </ul>
        )}
      </div>
      <span class="ui-sr-only" role="status">
        {props.status}
      </span>
    </opui-file-upload>
  )
}
