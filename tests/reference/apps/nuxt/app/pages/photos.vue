<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "opui-css/vue"
import { PHOTOS, user } from "reference-shared"

useHead({ title: "Photos" })

const index = ref(0)
const current = computed(() => PHOTOS[index.value]!)
const step = (by: number) => {
  index.value = (index.value + by + PHOTOS.length) % PHOTOS.length
}

const keydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") step(-1)
  if (event.key === "ArrowRight") step(1)
}
</script>

<template>
  <div class="app-screen" data-screen="photos">
    <h1>Photos</h1>
    <ul aria-label="Photos" class="app-photo-grid">
      <li v-for="({ alt, id, src }, at) in PHOTOS" :key="id">
        <button
          class="app-photo"
          command="show-modal"
          commandfor="photo-viewer"
          type="button"
          @click="index = at"
        >
          <img :alt="alt" :src="src" />
        </button>
      </li>
    </ul>
    <Dialog
      aria-label="Photo viewer"
      class="app-viewer"
      closedby="any"
      id="photo-viewer"
      @keydown="keydown"
    >
      <DialogHeader closeButton>
        <p aria-live="polite">Photo {{ index + 1 }} of {{ PHOTOS.length }}</p>
      </DialogHeader>
      <DialogContent class="app-viewer-body">
        <img :alt="current.alt" :src="current.src" />
        <p>By {{ user(current.by)!.name }}</p>
      </DialogContent>
      <DialogFooter>
        <Button variant="outlined" @click="step(-1)">
          <AppIcon name="previous" />
          <span class="ui-text">Previous</span>
        </Button>
        <Button variant="outlined" @click="step(1)">
          <span class="ui-text">Next</span>
          <AppIcon name="next" />
        </Button>
      </DialogFooter>
    </Dialog>
  </div>
</template>
