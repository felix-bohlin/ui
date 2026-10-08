<script lang="ts">
  import { Stepper } from "opui-css/svelte"
</script>

<Stepper
  class="stepper-star"
  current={2}
  items={[
    { href: "#cart", label: "Cart" },
    { href: "#shipping", label: "Shipping" },
    { href: "#payment", label: "Payment" },
    { href: "#review", label: "Review" },
  ]}
  label="Checkout steps"
/>

<style>
  :global {
    .stepper-star {
      --_check-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6l-6.4 3.5L7 14l-5.3-5 7.2-.9z'/%3E%3C/svg%3E");
    }
  }
</style>
