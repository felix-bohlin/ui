<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from "opui-css/svelte"
</script>

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
