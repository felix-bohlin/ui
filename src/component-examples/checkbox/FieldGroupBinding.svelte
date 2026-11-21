<script lang="ts">
  import {
    Button,
    Checkbox,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"

  const topics = ["updates", "events", "offers"]

  let selected = $state(["updates"])
  const summary = $derived(
    topics.filter((topic) => selected.includes(topic)).join(", ") || "none",
  )

  function reset() {
    selected = ["updates"]
  }
</script>

<Fieldset>
  <FieldLegend>Newsletter topics</FieldLegend>
  <FieldGroup name="checkbox-binding">
    <Checkbox bind:group={selected} value="updates">Bassbook news</Checkbox>
    <Checkbox bind:group={selected} value="events">Events</Checkbox>
    <Checkbox bind:group={selected} value="offers">Gear deals</Checkbox>
  </FieldGroup>
</Fieldset>
<p class="checkbox-binding-text">Selected: {summary}</p>
<Button class="checkbox-binding-reset" onclick={reset}>Reset</Button>
