<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<Button size="x-small">X-small</Button>
<Button size="small">Small</Button>
<Button>Medium</Button>
<Button size="large">Large</Button>

<Button size="x-small" variant="filled">X-small</Button>
<Button size="small" variant="filled">Small</Button>
<Button variant="filled">Medium</Button>
<Button size="large" variant="filled">Large</Button>

<Button size="x-small" variant="outlined">
  <span class="ui-text">X-small</span>
  <svg aria-hidden="true"><!-- --></svg>
</Button>
<Button size="small" variant="outlined">
  <span class="ui-text">Small</span>
  <svg aria-hidden="true"><!-- --></svg>
</Button>
<Button variant="outlined">
  <span class="ui-text">Medium</span>
  <svg aria-hidden="true"><!-- --></svg>
</Button>
<Button size="large" variant="outlined">
  <span class="ui-text">Large</span>
  <svg aria-hidden="true"><!-- --></svg>
</Button>
