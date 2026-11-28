/** @jsxImportSource @solidjs/web */
import { Breadcrumb, BreadcrumbItem } from "opui-css/solid"

export default function Basics() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbItem href="#" label="Groups" />
      <BreadcrumbItem href="#" label="Low End Society" />
      <BreadcrumbItem current label="Friday jam night" />
    </Breadcrumb>
  )
}
