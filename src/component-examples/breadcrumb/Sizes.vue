<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "opui-css/vue"
</script>

<template>
  <Breadcrumb aria-label="Photo breadcrumb" size="medium">
    <BreadcrumbItem href="#" label="My stuff" />
    <BreadcrumbItem href="#" label="Photo albums" />
    <BreadcrumbItem current label="Gig pics" />
  </Breadcrumb>
  <Breadcrumb aria-label="Set list breadcrumb" size="small">
    <BreadcrumbItem href="#" label="My stuff" />
    <BreadcrumbItem href="#" label="Set lists" />
    <BreadcrumbItem current label="Summer tour" />
  </Breadcrumb>
</template>
