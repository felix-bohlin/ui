<script lang="ts">
  import { ButtonGroup } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<ButtonGroup variant="filled">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>

<ButtonGroup variant="filled" color="primary">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>
