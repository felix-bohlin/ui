<script lang="ts">
  import { Progress } from "opui-css/svelte"

  let value = $state(10)

  $effect(() => {
    const interval = setInterval(() => {
      value = value >= 100 ? 10 : value + 10
    }, 3000)
    return () => clearInterval(interval)
  })
</script>

<Progress
  aria-label="Uploading"
  id="progress-determinate-1"
  max="100"
  {value}
/>
