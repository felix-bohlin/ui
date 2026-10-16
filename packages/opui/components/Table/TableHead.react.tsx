import type { SectionProps as Props } from "./types.react"

export default function TableHead(props: Props<"thead">) {
  return <thead {...props} />
}
