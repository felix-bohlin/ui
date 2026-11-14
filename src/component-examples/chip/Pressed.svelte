<script lang="ts">
  import { Chip } from "opui-css/svelte"

  let pressed = $state(["open", "paid"])

  function toggle(value: string) {
    pressed = pressed.includes(value)
      ? pressed.filter((item) => item !== value)
      : [...pressed, value]
  }
</script>

<div class="example-row">
  <Chip
    aria-pressed={pressed.includes("open")}
    as="button"
    class="chip-pressed"
    label="Open"
    onclick={() => toggle("open")}
    variant="outlined"
  />
  <Chip
    aria-pressed={pressed.includes("in-review")}
    as="button"
    class="chip-pressed"
    label="In review"
    onclick={() => toggle("in-review")}
    variant="outlined"
  />
  <Chip
    aria-pressed={pressed.includes("closed")}
    as="button"
    class="chip-pressed"
    label="Closed"
    onclick={() => toggle("closed")}
    variant="outlined"
  />
</div>
<div class="example-row">
  <Chip
    aria-pressed={pressed.includes("paid")}
    as="button"
    class="chip-pressed"
    label="Paid"
    onclick={() => toggle("paid")}
  />
  <Chip
    aria-pressed={pressed.includes("unpaid")}
    as="button"
    class="chip-pressed"
    label="Unpaid"
    onclick={() => toggle("unpaid")}
  />
</div>
