<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"
</script>

<template>
  <nav aria-label="Pagination">
    <ButtonGroup size="small" variant="outlined">
      <Button disabled href="#page-0">Previous</Button>
      <Button aria-current="page" href="#page-1">1</Button>
      <Button href="#page-2">2</Button>
      <Button href="#page-3">3</Button>
      <Button href="#page-22">22</Button>
      <Button href="#page-2">Next</Button>
    </ButtonGroup>
  </nav>
</template>
