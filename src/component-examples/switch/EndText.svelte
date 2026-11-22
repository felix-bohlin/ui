<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch endText="A summary every morning." name="switch-end-text">
  Daily digest
</Switch>
<Switch
  endText="Only when someone mentions you."
  name="switch-end-text"
  orientation="vertical"
>
  Mentions
</Switch>
