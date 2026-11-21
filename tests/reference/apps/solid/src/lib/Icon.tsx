import { ICONS, type IconName } from "reference-shared"

export default function Icon(props: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d={ICONS[props.name]} />
    </svg>
  )
}
