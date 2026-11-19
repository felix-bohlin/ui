import type { Metadata } from "next"
import Photos from "./photos"

export const metadata: Metadata = { title: "Photos" }

export default function PhotosPage() {
  return <Photos />
}
