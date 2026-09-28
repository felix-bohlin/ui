<script lang="ts">
  import { Switch } from "@opui/svelte"
</script>

<div class="example-row spacious">
  <Switch required>Default</Switch>
  <Switch required stack>Stack</Switch>
</div>

<div class="example-row spacious">
  <Switch error endText="Supporting text">Default</Switch>
  <Switch error stack endText="Supporting text">Stack</Switch>
</div>
