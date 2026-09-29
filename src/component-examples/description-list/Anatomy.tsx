import {
  Description,
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/solid"

export default function Example() {
  return (
    <DescriptionList bordered="dotted" class="anatomy">
      <DescriptionListItem>
        <DescriptionListTerm>Price</DescriptionListTerm>
        <Description>6 950 000</Description>
      </DescriptionListItem>
    </DescriptionList>
  )
}
