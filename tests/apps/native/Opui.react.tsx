"use client"

import { useState } from "react"
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
} from "opui-css/react"

const colors = [
  { label: "blue", value: "blue" },
  { label: "green", value: "green" },
  { label: "red", value: "red" },
]
const tabs = ["one", "two", "three"]
const views = ["day", "week", "month"]

const START = {
  checkbox: true,
  group: "week",
  radio: "coffee",
  range: 40,
  rating: 3,
  select: "green",
  tabs: "two",
  text: "Ada",
  toggle: true,
}

export default function Opui() {
  const [round, setRound] = useState(0)
  const [state, setState] = useState(START)
  const set = <K extends keyof typeof START>(
    key: K,
    value: (typeof START)[K],
  ) => setState((current) => ({ ...current, [key]: value }))

  return (
    <>
      <form data-case="checkbox-bound">
        <Checkbox
          checked={state.checkbox}
          label="Agree"
          onChange={(event) => set("checkbox", event.currentTarget.checked)}
        />
        <output>{String(state.checkbox)}</output>
      </form>
      <form data-case="checkbox-default">
        <Checkbox defaultChecked label="Agree" />
      </form>
      <form data-case="checkbox-empty">
        <Checkbox label="Agree" />
      </form>
      <form data-case="checkbox-rerender">
        <Checkbox data-round={round} defaultChecked label="Agree" />
      </form>
      <form data-case="group-bound">
        <ToggleGroup
          aria-label="View"
          name="view"
          onValueChange={(view) => set("group", view)}
          value={state.group}
        >
          {views.map((view) => (
            <ToggleButton key={view} value={view}>
              {view}
            </ToggleButton>
          ))}
        </ToggleGroup>
        <output>{state.group}</output>
      </form>
      <form data-case="group-default">
        <ToggleGroup aria-label="View" name="view">
          {views.map((view) => (
            <ToggleButton
              defaultChecked={view === "week"}
              key={view}
              value={view}
            >
              {view}
            </ToggleButton>
          ))}
        </ToggleGroup>
      </form>
      <form data-case="group-empty">
        <ToggleGroup aria-label="View" name="view">
          {views.map((view) => (
            <ToggleButton key={view} value={view}>
              {view}
            </ToggleButton>
          ))}
        </ToggleGroup>
      </form>
      <form data-case="number-default">
        <NumberField defaultValue={1} label="Quantity" />
      </form>
      <form data-case="radio-bound">
        {["tea", "coffee"].map((drink) => (
          <Radio
            checked={state.radio === drink}
            key={drink}
            label={drink}
            name="drink"
            onChange={() => set("radio", drink)}
            value={drink}
          />
        ))}
        <output>{state.radio}</output>
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
          onChange={(event) => set("range", Number(event.currentTarget.value))}
          value={state.range}
        />
        <output>{state.range}</output>
      </form>
      <form data-case="range-default">
        <Range defaultValue="40" label="Level" />
      </form>
      <form data-case="rating-bound">
        <Rating
          label="Score"
          name="score"
          onValueChange={(score) => set("rating", Number(score))}
          value={state.rating}
        />
        <output>{state.rating}</output>
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
          onChange={(event) => set("select", event.currentTarget.value)}
          value={state.select}
        />
        <output>{state.select}</output>
      </form>
      <form data-case="select-default">
        <Select defaultValue="green" items={colors} label="Color" />
      </form>
      <form data-case="tabs-bound">
        <Tabs
          name="tab"
          onValueChange={(tab) => set("tabs", tab)}
          value={state.tabs}
        >
          {tabs.map((tab) => (
            <TabsItem key={tab} value={tab}>
              <TabsLabel>{tab}</TabsLabel>
              <TabsPanel>{tab}</TabsPanel>
            </TabsItem>
          ))}
        </Tabs>
        <output>{state.tabs}</output>
      </form>
      <form data-case="tabs-default">
        <Tabs name="tab">
          {tabs.map((tab) => (
            <TabsItem defaultChecked={tab === "two"} key={tab} value={tab}>
              <TabsLabel>{tab}</TabsLabel>
              <TabsPanel>{tab}</TabsPanel>
            </TabsItem>
          ))}
        </Tabs>
      </form>
      <form data-case="text-bound">
        <TextField
          label="Name"
          onChange={(event) => set("text", event.currentTarget.value)}
          value={state.text}
        />
        <output>{state.text}</output>
      </form>
      <form data-case="text-default">
        <TextField defaultValue="Ada" label="Name" />
      </form>
      <form data-case="text-empty">
        <TextField label="Name" />
      </form>
      <form data-case="text-rerender">
        <TextField data-round={round} defaultValue="Ada" label="Name" />
      </form>
      <form data-case="toggle-bound">
        <ToggleButton
          checked={state.toggle}
          onChange={(event) => set("toggle", event.currentTarget.checked)}
        >
          Bold
        </ToggleButton>
        <output>{String(state.toggle)}</output>
      </form>
      <form data-case="toggle-default">
        <ToggleButton defaultChecked>Bold</ToggleButton>
      </form>
      <form data-case="toggle-empty">
        <ToggleButton>Bold</ToggleButton>
      </form>
      <button
        data-rerender
        onClick={() => setRound((current) => current + 1)}
        type="button"
      >
        Render again
      </button>
    </>
  )
}
