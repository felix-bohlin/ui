<script lang="ts">
  import { Dialog } from "@opui/svelte"
  import { Radio } from "@opui/svelte"
  import { Button } from "@opui/svelte"
  import { FieldSet as Fieldset } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"

  const behaviors = ["any", "closerequest", "none"] as const

  let closedby = $state<(typeof behaviors)[number]>("any")
</script>

<Button
  commandfor="closing-behaviors-dialog"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>

<Dialog id="closing-behaviors-dialog" {closedby}>
  {#snippet header()}
    <h2 class="ui-h4">How to close</h2>
  {/snippet}
  {#snippet content()}
    <div>
      <Fieldset>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          {#each behaviors as behavior (behavior)}
            <Radio
              checked={behavior === closedby}
              onchange={() => (closedby = behavior)}
              value={behavior}>{behavior}</Radio
            >
          {/each}
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
