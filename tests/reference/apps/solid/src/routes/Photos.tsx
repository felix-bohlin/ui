import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "opui-css/solid"
import { PHOTOS, user } from "reference-shared"
import { createMemo, createSignal, For } from "solid-js"
import Icon from "../lib/Icon"
import { useTitle } from "../lib/title"

export default function Photos() {
  useTitle(() => "Photos")
  const [index, setIndex] = createSignal(0)
  const current = createMemo(() => PHOTOS[index()]!)
  let viewer: HTMLDialogElement | undefined

  const show = (at: number) => {
    setIndex(at)
    viewer?.showModal()
  }

  const step = (by: number) =>
    setIndex((at) => (at + by + PHOTOS.length) % PHOTOS.length)

  const keydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") step(-1)
    if (event.key === "ArrowRight") step(1)
  }

  return (
    <>
      <div class="app-screen" data-screen="photos">
        <h1>Photos</h1>
        <ul aria-label="Photos" class="app-photo-grid">
          <For each={PHOTOS}>
            {(item, at) => (
              <li>
                <button
                  class="app-photo"
                  onClick={() => show(at())}
                  type="button"
                >
                  <img alt={item.alt} src={item.src} />
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
      <Dialog
        aria-label="Photo viewer"
        class="app-viewer"
        closedby="any"
        id="photo-viewer"
        onKeyDown={keydown}
        ref={(element) => (viewer = element)}
      >
        <DialogHeader closeButton>
          <p aria-live="polite">
            Photo {index() + 1} of {PHOTOS.length}
          </p>
        </DialogHeader>
        <DialogContent class="app-viewer-body">
          <img alt={current().alt} src={current().src} />
          <p>By {user(current().by)!.name}</p>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => step(-1)} variant="outlined">
            <Icon name="previous" />
            <span class="ui-text">Previous</span>
          </Button>
          <Button onClick={() => step(1)} variant="outlined">
            <span class="ui-text">Next</span>
            <Icon name="next" />
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
