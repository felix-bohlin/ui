<script lang="ts">
  import { ICONS, type IconName } from "reference-shared"

  let { name }: { name: IconName } = $props()
</script>

<svg
  aria-hidden="true"
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"><path d={ICONS[name]} /></svg
>
