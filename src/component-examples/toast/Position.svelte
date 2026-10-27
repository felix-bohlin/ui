<script lang="ts">
  import { Button, Toaster } from "opui-css/svelte"
</script>

<Button
  command="--toast"
  commandfor="toast-position-1"
  data-toast="Top start"
  variant="outlined">Top start</Button
>
<Toaster align="start" id="toast-position-1" side="block-start" />
<Button
  command="--toast"
  commandfor="toast-position-2"
  data-toast="Top center"
  variant="outlined">Top center</Button
>
<Toaster align="center" id="toast-position-2" side="block-start" />
<Button
  command="--toast"
  commandfor="toast-position-3"
  data-toast="Bottom start"
  variant="outlined">Bottom start</Button
>
<Toaster align="start" id="toast-position-3" />
