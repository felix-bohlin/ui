/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Message(props: Props) {
  const rest = omit(
    props,
    "author",
    "class",
    "datetime",
    "newAuthor",
    "outgoing",
    "time",
    "typing",
    "children",
    "bottom",
    "end",
    "start",
  )
  const resolvedBottom = children(() => props.bottom)
  const resolvedChildren = children(() => props.children)
  const resolvedEnd = children(() => props.end)

  return (
    <li
      class={[
        "ui-message",
        {
          "ui-new-author": props.newAuthor,
          "ui-outgoing": props.outgoing,
          "ui-typing": props.typing,
        },
        props.class,
      ]}
      {...rest}
    >
      {props.start}
      {props.typing ? (
        <div class="ui-content" role="status">
          <span class="ui-sr-only">{resolvedChildren()}</span>
        </div>
      ) : (
        <div class="ui-content">
          {props.author && <p class="ui-header">{props.author}</p>}
          {resolvedChildren()}
          {(props.time || resolvedEnd()) && (
            <p class="ui-footer">
              {props.time && (
                <time datetime={props.datetime}>{props.time}</time>
              )}
              {resolvedEnd() && <span class="ui-end">{resolvedEnd()}</span>}
            </p>
          )}
        </div>
      )}
      {resolvedBottom() && <div class="ui-bottom">{resolvedBottom()}</div>}
    </li>
  )
}
