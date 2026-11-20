/** @jsxImportSource @solidjs/web */
import { createSignal, For } from "solid-js"
import {
  Checkbox,
  NumberField,
  Radio,
  Range,
  Rating,
  Select,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  TextField,
  ToggleButton,
  ToggleGroup,
} from "opui-css/solid"

const colors = [
  { label: "blue", value: "blue" },
  { label: "green", value: "green" },
  { label: "red", value: "red" },
]
const tabs = ["one", "two", "three"]
const views = ["day", "week", "month"]

export default function Opui() {
  const [round, setRound] = createSignal(0)
  const [checkbox, setCheckbox] = createSignal(true)
  const [group, setGroup] = createSignal("week")
  const [radio, setRadio] = createSignal("coffee")
  const [range, setRange] = createSignal(40)
  const [rating, setRating] = createSignal(3)
  const [select, setSelect] = createSignal("green")
  const [tab, setTab] = createSignal("two")
  const [text, setText] = createSignal("Ada")
  const [toggle, setToggle] = createSignal(true)

  return (
    <>
      <form data-case="checkbox-bound">
        <Checkbox
          checked={checkbox()}
          label="Agree"
          onChange={(event) => setCheckbox(event.currentTarget.checked)}
        />
        <output>{String(checkbox())}</output>
      </form>
      <form data-case="checkbox-default">
        <Checkbox defaultChecked label="Agree" />
      </form>
      <form data-case="checkbox-empty">
        <Checkbox label="Agree" />
      </form>
      <form data-case="checkbox-rerender">
        <Checkbox data-round={round()} defaultChecked label="Agree" />
      </form>
      <form data-case="group-bound">
        <ToggleGroup
          aria-label="View"
          name="view"
          onValueChange={setGroup}
          value={group()}
        >
          <For each={views}>
            {(view) => <ToggleButton value={view}>{view}</ToggleButton>}
          </For>
        </ToggleGroup>
        <output>{group()}</output>
      </form>
      <form data-case="group-default">
        <ToggleGroup aria-label="View" name="view">
          <For each={views}>
            {(view) => (
              <ToggleButton defaultChecked={view === "week"} value={view}>
                {view}
              </ToggleButton>
            )}
          </For>
        </ToggleGroup>
      </form>
      <form data-case="group-empty">
        <ToggleGroup aria-label="View" name="view">
          <For each={views}>
            {(view) => <ToggleButton value={view}>{view}</ToggleButton>}
          </For>
        </ToggleGroup>
      </form>
      <form data-case="number-default">
        <NumberField defaultValue={1} label="Quantity" />
      </form>
      <form data-case="radio-bound">
        <For each={["tea", "coffee"]}>
          {(drink) => (
            <Radio
              checked={radio() === drink}
              label={drink}
              name="drink"
              onChange={() => setRadio(drink)}
              value={drink}
            />
          )}
        </For>
        <output>{radio()}</output>
      </form>
      <form data-case="radio-default">
        <Radio label="Tea" name="drink" value="tea" />
        <Radio defaultChecked label="Coffee" name="drink" value="coffee" />
      </form>
      <form data-case="radio-empty">
        <Radio label="Tea" name="drink" value="tea" />
        <Radio label="Coffee" name="drink" value="coffee" />
      </form>
      <form data-case="range-bound">
        <Range
          label="Level"
          onInput={(event) => setRange(Number(event.currentTarget.value))}
          value={range()}
        />
        <output>{range()}</output>
      </form>
      <form data-case="range-default">
        <Range defaultValue="40" label="Level" />
      </form>
      <form data-case="rating-bound">
        <Rating
          label="Score"
          name="score"
          onValueChange={(score) => setRating(Number(score))}
          value={rating()}
        />
        <output>{rating()}</output>
      </form>
      <form data-case="rating-default">
        <Rating defaultValue={3} label="Score" name="score" />
      </form>
      <form data-case="rating-empty">
        <Rating label="Score" name="score" />
      </form>
      <form data-case="select-bound">
        <Select
          items={colors}
          label="Color"
          onChange={(event) => setSelect(event.currentTarget.value)}
          value={select()}
        />
        <output>{select()}</output>
      </form>
      <form data-case="select-default">
        <Select defaultValue="green" items={colors} label="Color" />
      </form>
      <form data-case="tabs-bound">
        <Tabs name="tab" onValueChange={setTab} value={tab()}>
          <For each={tabs}>
            {(item) => (
              <TabsItem value={item}>
                <TabsLabel>{item}</TabsLabel>
                <TabsPanel>{item}</TabsPanel>
              </TabsItem>
            )}
          </For>
        </Tabs>
        <output>{tab()}</output>
      </form>
      <form data-case="tabs-default">
        <Tabs name="tab">
          <For each={tabs}>
            {(item) => (
              <TabsItem defaultChecked={item === "two"} value={item}>
                <TabsLabel>{item}</TabsLabel>
                <TabsPanel>{item}</TabsPanel>
              </TabsItem>
            )}
          </For>
        </Tabs>
      </form>
      <form data-case="text-bound">
        <TextField for="text-bound" label="Name">
          <input
            id="text-bound"
            onInput={(event) => setText(event.currentTarget.value)}
            value={text()}
          />
        </TextField>
        <output>{text()}</output>
      </form>
      <form data-case="text-default">
        <TextField for="text-default" label="Name">
          <input defaultValue="Ada" id="text-default" />
        </TextField>
      </form>
      <form data-case="text-empty">
        <TextField for="text-empty" label="Name">
          <input id="text-empty" />
        </TextField>
      </form>
      <form data-case="text-rerender">
        <TextField for="text-rerender" label="Name">
          <input data-round={round()} defaultValue="Ada" id="text-rerender" />
        </TextField>
      </form>
      <form data-case="toggle-bound">
        <ToggleButton
          checked={toggle()}
          onChange={(event) => setToggle(event.currentTarget.checked)}
        >
          Bold
        </ToggleButton>
        <output>{String(toggle())}</output>
      </form>
      <form data-case="toggle-default">
        <ToggleButton defaultChecked>Bold</ToggleButton>
      </form>
      <form data-case="toggle-empty">
        <ToggleButton>Bold</ToggleButton>
      </form>
      <button data-rerender onClick={() => setRound(round() + 1)} type="button">
        Render again
      </button>
    </>
  )
}
