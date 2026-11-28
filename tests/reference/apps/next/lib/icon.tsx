import { ICONS, type IconName } from "reference-shared"

export default function Icon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={ICONS[name]} />
    </svg>
  )
}
