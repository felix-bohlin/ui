<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
  } from "opui-css/svelte"
  import { PHOTOS, user } from "reference-shared"
  import Icon from "#lib/Icon.svelte"

  let index = $state(0)
  const current = $derived(PHOTOS[index]!)

  const viewer = () =>
    document.getElementById("photo-viewer") as HTMLDialogElement

  const show = (at: number) => {
    index = at
    viewer().showModal()
  }

  const step = (by: number) => {
    index = (index + by + PHOTOS.length) % PHOTOS.length
  }

  const keydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") step(-1)
    if (event.key === "ArrowRight") step(1)
  }
</script>

<svelte:head>
  <title>Photos | Reference</title>
</svelte:head>

<div class="app-screen" data-screen="photos">
  <h1>Photos</h1>
  <ul aria-label="Photos" class="app-photo-grid">
    {#each PHOTOS as { alt, id, src }, at (id)}
      <li>
        <button class="app-photo" onclick={() => show(at)} type="button">
          <img {alt} {src} />
        </button>
      </li>
    {/each}
  </ul>
</div>

<Dialog
  aria-label="Photo viewer"
  class="app-viewer"
  closedby="any"
  id="photo-viewer"
  onkeydown={keydown}
>
  <DialogHeader closeButton>
    <p aria-live="polite">Photo {index + 1} of {PHOTOS.length}</p>
  </DialogHeader>
  <DialogContent class="app-viewer-body">
    <img alt={current.alt} src={current.src} />
    <p>By {user(current.by)!.name}</p>
  </DialogContent>
  <DialogFooter>
    <Button onclick={() => step(-1)} variant="outlined">
      <Icon name="previous" />
      <span class="ui-text">Previous</span>
    </Button>
    <Button onclick={() => step(1)} variant="outlined">
      <span class="ui-text">Next</span>
      <Icon name="next" />
    </Button>
  </DialogFooter>
</Dialog>
