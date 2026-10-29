<script lang="ts">
  import { Button, Toaster, toast } from "opui-css/svelte"
</script>

<Button
  id="toast-script-1-button"
  onclick={() => toast.success("Changes saved")}
  variant="filled">Save changes</Button
>
<Toaster id="toast-script-1" />
