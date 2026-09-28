<script lang="ts">
  import { Button } from "@opui/svelte"

  function showToast() {
    ;(window as any).showToast?.({
      title: "Triggered from JS!",
      description: "With an optional description",
      severity: "success",
      duration: "3000ms",
    })
  }
</script>

<Button id="js-trigger" onclick={showToast}>Trigger from JS</Button>
