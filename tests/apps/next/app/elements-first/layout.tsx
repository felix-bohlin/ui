import type { ReactNode } from "react"
import Elements from "../../examples/elements"

export default function ElementsFirst({ children }: { children: ReactNode }) {
  return (
    <>
      <Elements />
      {children}
    </>
  )
}
