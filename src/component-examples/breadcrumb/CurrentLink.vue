<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "opui-css/vue"
</script>

<template>
  <Breadcrumb aria-label="Breadcrumb">
    <BreadcrumbItem href="#" label="Members" />
    <BreadcrumbItem href="#" label="Nina Okafor" />
    <BreadcrumbItem current href="#" label="Gear" />
  </Breadcrumb>
</template>
