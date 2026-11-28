<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Varukorg" },
    { href: "#", label: "Leverans", state: "error" as const },
    { href: "#", label: "Betalning" },
    { href: "#", label: "Granska" },
  ]
</script>

<Stepper
  aria-label="Kassans steg"
  completeLabel=", klar"
  current={2}
  errorLabel=", fel"
  {items}
  lang="sv"
/>
