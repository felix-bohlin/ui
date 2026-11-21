<script lang="ts">
  import { Button, Toaster, toast } from "opui-css/svelte"

  const archive = () =>
    toast("Conversation archived", {
      action: {
        label: "Undo",
        onClick: () => toast("Conversation restored"),
      },
    })
</script>

<Button id="toast-action-1-button" onclick={archive} variant="filled"
  >Archive</Button
>
<Toaster id="toast-action-1" />
