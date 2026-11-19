import { Avatar } from "opui-css/solid"
import type { User } from "reference-shared"
import { Show } from "solid-js"

type Props = { link?: boolean; size?: "large" | "small"; user: User }

export default function UserAvatar(props: Props) {
  return (
    <Show
      when={props.link}
      fallback={
        <Show
          when={props.user.photo}
          fallback={
            <Avatar aria-hidden="true" size={props.size}>
              {props.user.initials}
            </Avatar>
          }
        >
          {(photo) => <Avatar alt="" size={props.size} src={photo()} />}
        </Show>
      }
    >
      <Show
        when={props.user.photo}
        fallback={
          <Avatar
            aria-hidden="true"
            href={`/u/${props.user.handle}`}
            size={props.size}
            tabindex={-1}
          >
            {props.user.initials}
          </Avatar>
        }
      >
        {(photo) => (
          <Avatar
            alt=""
            aria-hidden="true"
            href={`/u/${props.user.handle}`}
            size={props.size}
            src={photo()}
            tabindex={-1}
          />
        )}
      </Show>
    </Show>
  )
}
