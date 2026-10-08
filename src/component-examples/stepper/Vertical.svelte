<script lang="ts">
  import { Stepper } from "opui-css/svelte"
</script>

<Stepper
  current={2}
  items={[
    { label: "Create your workspace" },
    { label: "Invite your team" },
    { label: "Connect a calendar" },
    { label: "Import your projects" },
    { label: "Set up billing" },
  ]}
  label="Onboarding steps"
  orientation="vertical"
/>
