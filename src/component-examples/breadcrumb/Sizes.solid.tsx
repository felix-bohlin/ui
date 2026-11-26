/** @jsxImportSource @solidjs/web */
import { Breadcrumb, BreadcrumbItem } from "opui-css/solid"

export default function Sizes() {
  return (
    <>
      <Breadcrumb aria-label="Breadcrumb" size="medium">
        <BreadcrumbItem href="#" label="My stuff" />
        <BreadcrumbItem href="#" label="Photo albums" />
        <BreadcrumbItem current label="Gig pics" />
      </Breadcrumb>
      <Breadcrumb aria-label="Breadcrumb" size="small">
        <BreadcrumbItem href="#" label="My stuff" />
        <BreadcrumbItem href="#" label="Photo albums" />
        <BreadcrumbItem current label="Gig pics" />
      </Breadcrumb>
    </>
  )
}
