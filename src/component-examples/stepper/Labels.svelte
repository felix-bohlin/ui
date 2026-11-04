<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Varukorg" },
    { error: true, href: "#", label: "Leverans" },
    { href: "#", label: "Betalning" },
    { href: "#", label: "Granska" },
  ]
</script>

<Stepper
  aria-label="Kassans steg"
  completedLabel=", klar"
  current={2}
  errorLabel=", fel"
  {items}
  lang="sv"
/>
