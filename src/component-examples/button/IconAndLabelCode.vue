<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button>
    <span>Text</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined">
    <span>Outlined</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="tonal">
    <span>Tonal</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="filled">
    <span>Filled</span>
    <svg><!-- --></svg>
  </Button>

  <Button>
    <svg><!-- --></svg>
    <span>Text</span>
  </Button>
  <Button variant="outlined">
    <svg><!-- --></svg>
    <span>Outlined</span>
  </Button>
  <Button variant="tonal">
    <svg><!-- --></svg>
    <span>Tonal</span>
  </Button>
  <Button variant="filled">
    <svg><!-- --></svg>
    <span>Filled</span>
  </Button>
</template>
