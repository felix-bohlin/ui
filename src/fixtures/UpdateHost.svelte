<script lang="ts">
  import { untrack, type Component } from "svelte"

  let {
    component: Rendered,
    initial,
    register,
  }: {
    component: Component<Record<string, unknown>>
    initial: Record<string, unknown>
    register: (set: (next: Record<string, unknown>) => void) => void
  } = $props()

  let current = $state(untrack(() => initial))

  untrack(() =>
    register((next) => {
      current = next
    }),
  )
</script>

<Rendered {...current} />
