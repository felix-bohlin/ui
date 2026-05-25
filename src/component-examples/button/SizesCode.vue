<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
<Button size="small">Small</Button>
<Button>Default</Button>
<Button size="large">Large</Button>

<Button variant="filled" size="small">Small</Button>
<Button variant="filled">Default</Button>
<Button variant="filled" size="large">Large</Button>

<Button size="small" variant="outlined">
  Small
  <svg> <!-- --> </svg>
</Button>
<Button variant="outlined">
  Default
  <svg> <!-- --> </svg>
</Button>
<Button variant="outlined" size="large">
  Large
  <svg> <!-- --> </svg>
</Button>
</template>
