"use client"

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "opui-css/react"
import { PHOTOS, user } from "reference-shared"
import { useRef, useState, type KeyboardEvent } from "react"
import Icon from "@/lib/icon"

export default function Photos() {
  const viewer = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const current = PHOTOS[index]!

  const show = (at: number) => {
    setIndex(at)
    viewer.current?.showModal()
  }

  const step = (by: number) =>
    setIndex((at) => (at + by + PHOTOS.length) % PHOTOS.length)

  const keydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") step(-1)
    if (event.key === "ArrowRight") step(1)
  }

  return (
    <>
      <div className="app-screen" data-screen="photos">
        <h1>Photos</h1>
        <ul aria-label="Photos" className="app-photo-grid">
          {PHOTOS.map(({ alt, id, src }, at) => (
            <li key={id}>
              <button
                className="app-photo"
                onClick={() => show(at)}
                type="button"
              >
                <img alt={alt} src={src} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Dialog
        aria-label="Photo viewer"
        className="app-viewer"
        closedby="any"
        id="photo-viewer"
        onKeyDown={keydown}
        ref={viewer}
      >
        <DialogHeader closeButton>
          <p aria-live="polite">{`Photo ${index + 1} of ${PHOTOS.length}`}</p>
        </DialogHeader>
        <DialogContent className="app-viewer-body">
          <img alt={current.alt} src={current.src} />
          <p>By {user(current.by)!.name}</p>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => step(-1)} variant="outlined">
            <Icon name="previous" />
            <span className="ui-text">Previous</span>
          </Button>
          <Button onClick={() => step(1)} variant="outlined">
            <span className="ui-text">Next</span>
            <Icon name="next" />
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
