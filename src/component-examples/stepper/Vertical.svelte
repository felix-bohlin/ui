<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { label: "Create your workspace" },
    { label: "Invite your team" },
    { label: "Connect a calendar" },
    { label: "Import your projects" },
    { label: "Set up billing" },
  ]
</script>

<Stepper
  aria-label="Onboarding steps"
  current={2}
  {items}
  orientation="vertical"
/>
