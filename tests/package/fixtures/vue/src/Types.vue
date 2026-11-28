<script setup lang="ts">
import DeepButton from "opui-css/components/Button/Button.vue"
import { Button, Dialog } from "opui-css/vue"
import { useTemplateRef } from "vue"

const dialog = useTemplateRef("dialog")
const open = () => {
  // @ts-expect-error $el is the <dialog>, not any
  dialog.value?.$el.showDialog()
  dialog.value?.$el.showModal()
}
</script>

<template>
  <Button variant="filled">Save</Button>
  <DeepButton variant="filled">Save</DeepButton>
  <!-- @vue-expect-error -->
  <Button variant="unknown">Save</Button>
  <!-- @vue-expect-error -->
  <DeepButton variant="unknown">Save</DeepButton>
  <Button @click="open">Open</Button>
  <Dialog id="types-dialog" ref="dialog" aria-label="Types" />
</template>
