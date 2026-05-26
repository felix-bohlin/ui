<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
<Range label="Volume" :min="0" :max="100" :value="50" spread data-invalid />
</template>
