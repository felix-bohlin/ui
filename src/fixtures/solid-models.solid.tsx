/** @jsxImportSource @solidjs/web */
import { render } from "@solidjs/web"
import { Checkbox, Select, TextField } from "opui-css/solid"
import { createSignal } from "solid-js"

const SolidModels = () => {
  const [error, setError] = createSignal(false)
  const [name, setName] = createSignal("Ada")
  const [plan, setPlan] = createSignal("free")

  return (
    <form>
      <TextField error={error()} label="City" value="Lund" />
      <Checkbox checked={false} error={error()}>
        Newsletter
      </Checkbox>
      <Select error={error()} label="Size" value="small">
        <option value="small">Small</option>
        <option value="large">Large</option>
      </Select>
      <Select defaultValue="blue" label="Color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>
      <TextField label="Name" value={name()} />
      <Select label="Plan" value={plan()}>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </Select>
      <button onClick={() => setError(!error())} type="button">
        Toggle error
      </button>
      <button
        onClick={() => {
          setName("Grace")
          setPlan("paid")
        }}
        type="button"
      >
        Set values
      </button>
      <button type="reset">Reset</button>
    </form>
  )
}

const root = document.getElementById("solid-models")
if (root) render(() => <SolidModels />, root)
