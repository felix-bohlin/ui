"use client"

import { useState } from "react"
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
} from "opui-css/react"

const colors = ["blue", "green", "red"]
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
        <Field
          autoFit
          end={<StepButton command="--step-up" htmlFor="number-default" />}
          htmlFor="number-default"
          label="Quantity"
          start={<StepButton command="--step-down" htmlFor="number-default" />}
        >
          <input defaultValue="1" id="number-default" type="number" />
        </Field>
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
        <Field htmlFor="range-bound" label="Level">
          <input
            id="range-bound"
            onChange={(event) =>
              set("range", Number(event.currentTarget.value))
            }
            type="range"
            value={state.range}
          />
        </Field>
        <output>{state.range}</output>
      </form>
      <form data-case="range-default">
        <Field htmlFor="range-default" label="Level">
          <input defaultValue="40" id="range-default" type="range" />
        </Field>
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
        <Field htmlFor="select-bound" label="Color">
          <select
            id="select-bound"
            onChange={(event) => set("select", event.currentTarget.value)}
            value={state.select}
          >
            <SelectButton />
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </Field>
        <output>{state.select}</output>
      </form>
      <form data-case="select-default">
        <Field htmlFor="select-default" label="Color">
          <select defaultValue="green" id="select-default">
            <SelectButton />
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </Field>
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
        <Field htmlFor="text-bound" label="Name">
          <input
            id="text-bound"
            onChange={(event) => set("text", event.currentTarget.value)}
            value={state.text}
          />
        </Field>
        <output>{state.text}</output>
      </form>
      <form data-case="text-default">
        <Field htmlFor="text-default" label="Name">
          <input defaultValue="Ada" id="text-default" />
        </Field>
      </form>
      <form data-case="text-empty">
        <Field htmlFor="text-empty" label="Name">
          <input id="text-empty" />
        </Field>
      </form>
      <form data-case="text-rerender">
        <Field htmlFor="text-rerender" label="Name">
          <input data-round={round} defaultValue="Ada" id="text-rerender" />
        </Field>
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
