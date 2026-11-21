<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Cart" },
    { href: "#", label: "Shipping" },
    { href: "#", label: "Payment" },
    { href: "#", label: "Review" },
  ]
</script>

<Stepper aria-label="Checkout steps" current={1} {items} size="small" />
