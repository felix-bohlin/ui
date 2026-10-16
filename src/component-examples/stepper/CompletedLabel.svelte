<script lang="ts">
  import { Stepper } from "opui-css/svelte"
</script>

<Stepper
  current={1}
  dir="rtl"
  items={[{ label: "السلة" }, { label: "الشحن" }, { label: "الدفع" }]}
  label="خطوات الدفع"
  lang="ar"
/>

<style>
  :global {
    .ui-stepper:lang(ar) {
      --_completed-label: "مكتمل: ";
    }
  }
</style>
