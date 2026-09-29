<script lang="ts">
  import { Progress } from "@opui/svelte"

  let value = $state(10)

  $effect(() => {
    const interval = setInterval(() => {
      value = value >= 100 ? 10 : value + 10
    }, 3000)
    return () => clearInterval(interval)
  })
</script>

<Progress id="determinate-progress" max="100" {value} />
