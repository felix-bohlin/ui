<script setup lang="ts">
import { Stat } from "opui-css/vue"
</script>

<template>
  <ul
    class="ui-layout-grid ui-divided ui-large"
    role="list"
    style="--_min-inline-size: 9rem"
  >
    <li><Stat label="Visitors">48,210</Stat></li>
    <li><Stat label="Page views">162,904</Stat></li>
    <li><Stat label="Bounce rate">41.2%</Stat></li>
    <li><Stat label="Session length">3m 12s</Stat></li>
    <li><Stat label="Sign-ups">1,284</Stat></li>
  </ul>
</template>
