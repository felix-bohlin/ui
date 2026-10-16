<script lang="ts">
  import { Stepper } from "opui-css/svelte"
</script>

<Stepper
  current={2}
  items={[
    { href: "#cart", label: "Cart" },
    { href: "#shipping", label: "Shipping" },
    { href: "#payment", label: "Payment" },
    { href: "#review", label: "Review" },
  ]}
  label="Checkout steps"
  size="small"
/>
