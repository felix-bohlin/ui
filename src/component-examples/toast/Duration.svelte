<script lang="ts">
  import { Button, Toaster } from "opui-css/svelte"
</script>

<Button
  command="--toast"
  commandfor="toast-duration-1"
  data-toast="Export started. You'll get an email when the file is ready."
  variant="filled">Export report</Button
>
<Toaster duration={10000} id="toast-duration-1" />
