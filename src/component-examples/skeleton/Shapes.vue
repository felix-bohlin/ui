<script setup lang="ts">
import { Skeleton } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-row">
    <Skeleton shape="circle" style="inline-size: 4rem" />
    <Skeleton style="block-size: 4rem; inline-size: 6rem" />
    <Skeleton shape="squared" style="block-size: 4rem; inline-size: 6rem" />
  </div>
</template>
