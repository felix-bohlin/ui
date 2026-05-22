<script lang="ts">
  import { Switch } from "@opui/svelte"
</script>

<div class="example-row spacious">
  <Switch required>Default</Switch>
  <Switch required stack>Stack</Switch>
</div>

<div class="example-row spacious">
  <Switch critical endText="Supporting text">Default</Switch>
  <Switch critical stack endText="Supporting text">Stack</Switch>
</div>
