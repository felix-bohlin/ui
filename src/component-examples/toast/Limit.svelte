<script lang="ts">
  import { Button, Toaster } from "opui-css/svelte"
</script>

<Button
  command="--toast"
  commandfor="toast-limit-1"
  data-toast="Added to your cart"
  data-toast-severity="success"
  variant="outlined"
>
  Add to cart
</Button>
<Toaster id="toast-limit-1" limit={1} />
