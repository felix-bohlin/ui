"use client"

import { useId } from "react"
import "../../elements/file-upload.js"
import { cx } from "../cx"
import { useHydrated, useListener } from "../react"
import Button from "../Button/Button.react"
import Progress from "../Progress/Progress.react"
import type { Props } from "./types.react"

export default function FileUpload({
  accept,
  className,
  description,
  disabled,
  id,
  items,
  label,
  multiple,
  onRemove,
  onSelect,
  progressLabel = "Uploading {label}",
  ref,
  removeLabel = "Remove {label}",
  status,
  ...rest
}: Props) {
  const uid = useId()
  const base = id || `file-upload-${uid}`
  const inputId = base
  const descriptionId = description ? `${base}-description` : undefined
  const rootRef = useHydrated(
    useListener(useListener(ref, "remove", onRemove), "select", onSelect),
  )

  return (
    <opui-file-upload
      className={cx(["ui-file-upload", className])}
      data-hydrating=""
      ref={rootRef}
      {...rest}
    >
      <div className="ui-content">
        <div className="ui-field-container">
          <label className="ui-label">
            <input
              accept={accept}
              aria-describedby={descriptionId}
              className="ui-sr-only"
              disabled={disabled}
              id={inputId}
              multiple={multiple || undefined}
              type="file"
            />
            <span className="ui-button ui-outlined">{label}</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            />
          </label>
          {description && (
            <span className="ui-description" id={descriptionId}>
              {description}
            </span>
          )}
        </div>
        {items && items.length > 0 && (
          <ul className="ui-list">
            {items.map((item, index) => (
              <li
                key={index}
                className={cx([{ "ui-state-error": item.state === "error" }])}
              >
                <div className="ui-start">
                  {item.preview && <img alt="" src={item.preview} />}
                  {item.state === "error" && item.description && (
                    <button
                      aria-labelledby={`${inputId}-label-${index} ${inputId}-description-${index}`}
                      popoverTarget={`${inputId}-description-${index}`}
                      type="button"
                    />
                  )}
                </div>
                <div className="ui-text">
                  <p dir="auto" id={`${inputId}-label-${index}`}>
                    {item.label}
                  </p>
                  {(item.state === "queued" || item.state === "uploading") && (
                    <Progress
                      aria-label={progressLabel.replace("{label}", item.label)}
                      value={
                        item.state === "uploading"
                          ? (item.progress ?? 0)
                          : undefined
                      }
                    />
                  )}
                  {item.description && (
                    <p
                      className="ui-description"
                      id={`${inputId}-description-${index}`}
                      popover={item.state === "error" ? "auto" : undefined}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="ui-end">
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
                    />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="ui-sr-only" role="status">
        {status}
      </span>
    </opui-file-upload>
  )
}
