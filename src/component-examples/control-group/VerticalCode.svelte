<script lang="ts">
  import { Button, ControlGroup, Textarea } from "opui-css/svelte"
</script>

<ControlGroup aria-label="Text size" orientation="vertical">
  <Button aria-label="Increase">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button aria-label="Decrease">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
</ControlGroup>

<ControlGroup aria-label="Text size" orientation="vertical" variant="outlined">
  <Button aria-label="Increase">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button aria-label="Decrease">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
</ControlGroup>

<ControlGroup aria-label="Text size" orientation="vertical" variant="tonal">
  <Button aria-label="Increase">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button aria-label="Decrease">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
</ControlGroup>

<ControlGroup aria-label="Text size" orientation="vertical" variant="filled">
  <Button aria-label="Increase">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button aria-label="Decrease">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
</ControlGroup>

<ControlGroup aria-label="Move row" orientation="vertical">
  <Button>Up</Button>
  <Button>Down</Button>
</ControlGroup>

<ControlGroup aria-label="Move row" orientation="vertical" variant="outlined">
  <Button>Up</Button>
  <Button>Down</Button>
</ControlGroup>

<ControlGroup aria-label="Move row" orientation="vertical" variant="tonal">
  <Button>Up</Button>
  <Button>Down</Button>
</ControlGroup>

<ControlGroup aria-label="Move row" orientation="vertical" variant="filled">
  <Button>Up</Button>
  <Button>Down</Button>
</ControlGroup>

<ControlGroup
  aria-label="Delivery note"
  orientation="vertical"
  variant="filled"
>
  <Textarea
    hideLabel
    label="Delivery note"
    placeholder="Leave it at the back door"
  />
  <Button>Send note</Button>
</ControlGroup>
