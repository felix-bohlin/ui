<script lang="ts">
  import { onMount } from "svelte"
  import { Dialog } from "@opui/svelte"
  import { Radio } from "@opui/svelte"
  import { Button } from "@opui/svelte"
  import { FieldSet as Fieldset } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"

  const name = "closedby-demo"

  onMount(() => {
    const dialog = document.getElementById(
      "closing-behaviors-dialog",
    ) as HTMLDialogElement
    const radios = document.querySelectorAll('input[name="closedby-demo"]')

    radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement
        if (dialog) {
          dialog.setAttribute("closedby", target.value)
        }
      })
    })
  })
</script>

<Button
  commandfor="closing-behaviors-dialog"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>

<Dialog id="closing-behaviors-dialog" closedby="any">
  {#snippet header()}
    <h2 class="ui-h4">How to close</h2>
  {/snippet}
  {#snippet content()}
    <div>
      <Fieldset>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup {name}>
          <Radio {name} value="any" checked>any</Radio>
          <Radio {name} value="closerequest">closerequest</Radio>
          <Radio {name} value="none">none</Radio>
        </FieldGroup>
      </Fieldset>
    </div>
  {/snippet}
  {#snippet actions()}
    <Button commandfor="closing-behaviors-dialog" command="close">
      Close manually
    </Button>
  {/snippet}
</Dialog>
