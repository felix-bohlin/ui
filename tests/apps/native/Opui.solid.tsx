/** @jsxImportSource @solidjs/web */
import { createSignal, For } from "solid-js"
import {
  Checkbox,
  Field,
  Radio,
  Rating,
  SelectButton,
  StepButton,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/solid"

const colors = ["blue", "green", "red"]
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
        <Field
          autoFit
          end={<StepButton command="--step-up" for="number-default" />}
          for="number-default"
          label="Quantity"
          start={<StepButton command="--step-down" for="number-default" />}
        >
          <input defaultValue="1" id="number-default" type="number" />
        </Field>
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
        <Field for="range-bound" label="Level">
          <input
            id="range-bound"
            onInput={(event) => setRange(Number(event.currentTarget.value))}
            type="range"
            value={range()}
          />
        </Field>
        <output>{range()}</output>
      </form>
      <form data-case="range-default">
        <Field for="range-default" label="Level">
          <input defaultValue="40" id="range-default" type="range" />
        </Field>
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
        <Field for="select-bound" label="Color">
          <select
            id="select-bound"
            onChange={(event) => setSelect(event.currentTarget.value)}
            value={select()}
          >
            <SelectButton />
            <For each={colors}>
              {(color) => <option value={color}>{color}</option>}
            </For>
          </select>
        </Field>
        <output>{select()}</output>
      </form>
      <form data-case="select-default">
        <Field for="select-default" label="Color">
          <select id="select-default">
            <SelectButton />
            <For each={colors}>
              {(color) => (
                <option selected={color === "green"} value={color}>
                  {color}
                </option>
              )}
            </For>
          </select>
        </Field>
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
        <Field for="text-bound" label="Name">
          <input
            id="text-bound"
            onInput={(event) => setText(event.currentTarget.value)}
            value={text()}
          />
        </Field>
        <output>{text()}</output>
      </form>
      <form data-case="text-default">
        <Field for="text-default" label="Name">
          <input defaultValue="Ada" id="text-default" />
        </Field>
      </form>
      <form data-case="text-empty">
        <Field for="text-empty" label="Name">
          <input id="text-empty" />
        </Field>
      </form>
      <form data-case="text-rerender">
        <Field for="text-rerender" label="Name">
          <input data-round={round()} defaultValue="Ada" id="text-rerender" />
        </Field>
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
