<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"

const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
</script>

<template>
<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button aria-label="Up">
      <span v-html="plusIcon"></span>
    </Button>
    <Button aria-label="Decrease">
      <span v-html="minusIcon"></span>
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="outlined">
    <Button aria-label="Up">
      <span v-html="plusIcon"></span>
    </Button>
    <Button aria-label="Decrease">
      <span v-html="minusIcon"></span>
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="tonal">
    <Button aria-label="Up">
      <span v-html="plusIcon"></span>
    </Button>
    <Button aria-label="Decrease">
      <span v-html="minusIcon"></span>
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="filled">
    <Button aria-label="Up">
      <span v-html="plusIcon"></span>
    </Button>
    <Button aria-label="Decrease">
      <span v-html="minusIcon"></span>
    </Button>
  </ButtonGroup>
</div>

<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="outlined">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="tonal">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="filled">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>
</div>
</template>
