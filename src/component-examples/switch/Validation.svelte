<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-validation" required>Two-step login</Switch>
  <Switch name="switch-validation" orientation="vertical" required
    >Usage reports</Switch
  >
</div>

<div class="example-row">
  <Switch defaultChecked error name="switch-validation">
    Public profile
    {#snippet endText()}Your organization keeps profiles private. Turn it off.{/snippet}
  </Switch>
  <Switch error name="switch-validation" orientation="vertical">
    Cloud backup
    {#snippet endText()}Sync needs cloud backup. Turn it on to continue.{/snippet}
  </Switch>
</div>
