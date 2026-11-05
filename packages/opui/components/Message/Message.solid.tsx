/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
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
          <span class="ui-sr-only">{props.children}</span>
        </div>
      ) : (
        <div class="ui-content">
          {props.author && <p class="ui-header">{props.author}</p>}
          {props.children}
          {(props.time || props.end) && (
            <p class="ui-footer">
              {props.time && (
                <time datetime={props.datetime}>{props.time}</time>
              )}
              {props.end && <span class="ui-end">{props.end}</span>}
            </p>
          )}
        </div>
      )}
      {props.bottom && <div class="ui-bottom">{props.bottom}</div>}
    </li>
  )
}
