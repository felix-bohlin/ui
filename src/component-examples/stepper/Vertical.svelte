<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { label: "Create your profile" },
    { label: "Invite your band" },
    { label: "Connect a gig calendar" },
    { label: "Add your basses" },
    { label: "Try Bassbook Gold" },
  ]
</script>

<Stepper
  aria-label="Onboarding steps"
  current={2}
  {items}
  orientation="vertical"
/>
