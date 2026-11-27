/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/solid"

const topics = ["updates", "events", "offers"]

export default function FieldGroupBinding() {
  const [selected, setSelected] = createSignal(["updates"])
  const summary = () =>
    topics.filter((topic) => selected().includes(topic)).join(", ") || "none"

  function reset() {
    setSelected(["updates"])
  }

  function toggle(event: Event & { currentTarget: HTMLInputElement }) {
    const { checked, value } = event.currentTarget
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup>
          <Checkbox
            checked={selected().includes("updates")}
            name="checkbox-binding"
            onChange={toggle}
            value="updates"
          >
            Bassbook news
          </Checkbox>
          <Checkbox
            checked={selected().includes("events")}
            name="checkbox-binding"
            onChange={toggle}
            value="events"
          >
            Events
          </Checkbox>
          <Checkbox
            checked={selected().includes("offers")}
            name="checkbox-binding"
            onChange={toggle}
            value="offers"
          >
            Gear deals
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <p class="checkbox-binding-text">Selected: {summary()}</p>
      <Button class="checkbox-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
