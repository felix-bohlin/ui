import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/react"

export default function Orientation() {
  return (
    <>
      <DescriptionList border="solid" style={{ maxInlineSize: "18rem" }}>
        <DescriptionListItem>
          <DescriptionListTerm>Plan</DescriptionListTerm>
          <DescriptionListDescription>Gold</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Bandmates</DescriptionListTerm>
          <DescriptionListDescription>4</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Renews</DescriptionListTerm>
          <DescriptionListDescription>Mar 1, 2027</DescriptionListDescription>
        </DescriptionListItem>
      </DescriptionList>

      <DescriptionList
        border="solid"
        orientation="horizontal"
        style={{ maxInlineSize: "18rem" }}
      >
        <DescriptionListItem>
          <DescriptionListTerm>Plan</DescriptionListTerm>
          <DescriptionListDescription>Gold</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Bandmates</DescriptionListTerm>
          <DescriptionListDescription>4</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Renews</DescriptionListTerm>
          <DescriptionListDescription>Mar 1, 2027</DescriptionListDescription>
        </DescriptionListItem>
      </DescriptionList>
    </>
  )
}
