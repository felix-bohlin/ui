<script lang="ts">
  import { Stepper, StepperItem } from "opui-css/svelte"
</script>

{#snippet check()}
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M18 6 7 17l-5-5"></path><path d="m22 10-7.5 7.5L13 16"
    ></path></svg
  >
{/snippet}

<Stepper aria-label="Checkout steps">
  <StepperItem complete href="#" label="Cart">
    {#snippet iconChecked()}{@render check()}{/snippet}
  </StepperItem>
  <StepperItem complete href="#" label="Shipping">
    {#snippet iconChecked()}{@render check()}{/snippet}
  </StepperItem>
  <StepperItem current label="Payment" />
  <StepperItem label="Review" />
</Stepper>
