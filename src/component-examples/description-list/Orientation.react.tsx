import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/react"

export default function Orientation() {
  return (
    <>
      <DescriptionList bordered style={{ maxInlineSize: "18rem" }}>
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
        bordered
        orientation="horizontal"
        style={{ maxInlineSize: "18rem" }}
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
    </>
  )
}
