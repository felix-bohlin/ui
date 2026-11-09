<script lang="ts">
  import { Button, ControlGroup } from "opui-css/svelte"
</script>

<ControlGroup variant="outlined">
  <Button aria-label="OK">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button>Maybe</Button>
  <Button aria-label="No">
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
</ControlGroup>

<ControlGroup variant="outlined">
  <Button>
    <svg aria-hidden="true"><!-- --></svg>
    <span class="ui-text">OK</span>
  </Button>
  <Button>
    <svg aria-hidden="true"><!-- --></svg>
    <span class="ui-text">Maybe</span>
  </Button>
  <Button>
    <svg aria-hidden="true"><!-- --></svg>
    <span class="ui-text">No</span>
  </Button>
</ControlGroup>
