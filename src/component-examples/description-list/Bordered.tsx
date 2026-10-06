import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/solid"

export default function Example() {
  return (
    <>
      <DescriptionList bordered>
        <DescriptionListItem>
          <DescriptionListTerm>Price</DescriptionListTerm>
          <DescriptionListDescription>6 950 000</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Size</DescriptionListTerm>
          <DescriptionListDescription>64 m²</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Rooms</DescriptionListTerm>
          <DescriptionListDescription>3</DescriptionListDescription>
        </DescriptionListItem>
      </DescriptionList>

      <DescriptionList bordered="dotted">
        <DescriptionListItem>
          <DescriptionListTerm>Price</DescriptionListTerm>
          <DescriptionListDescription>6 950 000</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Size</DescriptionListTerm>
          <DescriptionListDescription>64 m²</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>Rooms</DescriptionListTerm>
          <DescriptionListDescription>3</DescriptionListDescription>
        </DescriptionListItem>
      </DescriptionList>
    </>
  )
}
