import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/react"

export default function Inline() {
  return (
    <DescriptionList bordered inline style={{ maxInlineSize: "18rem" }}>
      <DescriptionListItem>
        <DescriptionListTerm>Subtotal</DescriptionListTerm>
        <DescriptionListDescription>$120.00</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Shipping</DescriptionListTerm>
        <DescriptionListDescription>$8.00</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Total</DescriptionListTerm>
        <DescriptionListDescription>$128.00</DescriptionListDescription>
      </DescriptionListItem>
    </DescriptionList>
  )
}
