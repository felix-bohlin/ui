<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { description: "Name and email", label: "Account" },
    { description: "Basic or Gold", label: "Plan" },
    { description: "Card or gig money", label: "Payment" },
    { description: "Start jamming", label: "Done" },
  ]
</script>

<Stepper aria-label="Sign-up steps" current={1} {items} />
