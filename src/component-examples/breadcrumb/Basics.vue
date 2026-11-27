<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "opui-css/vue"
</script>

<template>
  <Breadcrumb aria-label="Breadcrumb">
    <BreadcrumbItem href="#" label="Groups" />
    <BreadcrumbItem href="#" label="Low End Society" />
    <BreadcrumbItem current label="Friday jam night" />
  </Breadcrumb>
</template>
