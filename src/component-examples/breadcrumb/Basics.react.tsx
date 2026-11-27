import { Breadcrumb, BreadcrumbItem } from "opui-css/react"

export default function Basics() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbItem href="#" label="Groups" />
      <BreadcrumbItem href="#" label="Low End Society" />
      <BreadcrumbItem current label="Friday jam night" />
    </Breadcrumb>
  )
}
