/** @jsxImportSource @solidjs/web */
import { Breadcrumb, BreadcrumbItem } from "opui-css/solid"

export default function CurrentLink() {
  return (
    <Breadcrumb aria-label="Profile breadcrumb">
      <BreadcrumbItem href="#" label="Members" />
      <BreadcrumbItem href="#" label="Nina Okafor" />
      <BreadcrumbItem current href="#" label="Gear" />
    </Breadcrumb>
  )
}
