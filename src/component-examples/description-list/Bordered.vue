<script setup lang="ts">
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>

<template>
  <DescriptionList border="solid">
    <DescriptionListItem>
      <DescriptionListTerm>Order number</DescriptionListTerm>
      <DescriptionListDescription>10482</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Placed on</DescriptionListTerm>
      <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDescription>Shipped</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>

  <DescriptionList border="dotted">
    <DescriptionListItem>
      <DescriptionListTerm>Order number</DescriptionListTerm>
      <DescriptionListDescription>10482</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Placed on</DescriptionListTerm>
      <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDescription>Shipped</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>
</template>
