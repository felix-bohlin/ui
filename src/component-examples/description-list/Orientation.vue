<script setup lang="ts">
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>

<template>
  <DescriptionList border="solid" style="max-inline-size: 18rem">
    <DescriptionListItem>
      <DescriptionListTerm>Plan</DescriptionListTerm>
      <DescriptionListDescription>Team</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Seats</DescriptionListTerm>
      <DescriptionListDescription>12</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Renews</DescriptionListTerm>
      <DescriptionListDescription>Mar 1, 2027</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>

  <DescriptionList
    border="solid"
    orientation="horizontal"
    style="max-inline-size: 18rem"
  >
    <DescriptionListItem>
      <DescriptionListTerm>Plan</DescriptionListTerm>
      <DescriptionListDescription>Team</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Seats</DescriptionListTerm>
      <DescriptionListDescription>12</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Renews</DescriptionListTerm>
      <DescriptionListDescription>Mar 1, 2027</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>
</template>
