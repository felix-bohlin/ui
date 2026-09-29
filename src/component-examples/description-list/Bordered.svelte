<script lang="ts">
  import { Description } from "@opui/svelte"
  import { DescriptionList } from "@opui/svelte"
  import { DescriptionListItem } from "@opui/svelte"
  import { DescriptionListTerm } from "@opui/svelte"
</script>

<DescriptionList bordered>
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <Description>6 950 000</Description>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <Description>64 m²</Description>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <Description>3</Description>
  </DescriptionListItem>
</DescriptionList>

<DescriptionList bordered="dotted">
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <Description>6 950 000</Description>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <Description>64 m²</Description>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <Description>3</Description>
  </DescriptionListItem>
</DescriptionList>
