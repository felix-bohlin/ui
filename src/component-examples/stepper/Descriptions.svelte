<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { description: "Name and email", label: "Account" },
    { description: "Free or Pro", label: "Plan" },
    { description: "Card or invoice", label: "Payment" },
    { description: "Start building", label: "Done" },
  ]
</script>

<Stepper aria-label="Sign-up steps" current={1} {items} />
