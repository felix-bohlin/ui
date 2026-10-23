<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<Button size="x-small">X-small</Button>
<Button size="small">Small</Button>
<Button>Medium</Button>
<Button size="large">Large</Button>

<Button variant="filled" size="x-small">X-small</Button>
<Button variant="filled" size="small">Small</Button>
<Button variant="filled">Medium</Button>
<Button variant="filled" size="large">Large</Button>

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
<Button variant="outlined" size="large">
  <span class="ui-text">Large</span>
  <svg aria-hidden="true"><!-- --></svg>
</Button>
