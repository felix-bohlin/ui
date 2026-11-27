/** @jsxImportSource @solidjs/web */
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/solid"

export default function Vertical() {
  return (
    <DescriptionList
      class="ui-layout-grid"
      orientation="vertical"
      style="--_min-inline-size: 9rem"
    >
      <DescriptionListItem>
        <DescriptionListTerm>Date</DescriptionListTerm>
        <DescriptionListDescription>
          Saturday 12 June
        </DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Doors</DescriptionListTerm>
        <DescriptionListDescription>17:00</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Venue</DescriptionListTerm>
        <DescriptionListDescription>Harbour Stage</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Entrance</DescriptionListTerm>
        <DescriptionListDescription>Gate B</DescriptionListDescription>
      </DescriptionListItem>
    </DescriptionList>
  )
}
