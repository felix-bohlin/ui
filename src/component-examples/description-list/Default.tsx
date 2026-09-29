import {
  Description,
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/solid"

export default function Example() {
  return (
    <DescriptionList>
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
  )
}
