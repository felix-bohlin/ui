"use client"

import { useState } from "react"

const colors = ["blue", "green", "red"]
const stars = [0, 1, 2, 3, 4, 5]
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

export default function Native() {
  const [round, setRound] = useState(0)
  const [state, setState] = useState(START)
  const set = <K extends keyof typeof START>(
    key: K,
    value: (typeof START)[K],
  ) => setState((current) => ({ ...current, [key]: value }))

  return (
    <>
      <form data-case="checkbox-bound">
        <input
          aria-label="Agree"
          checked={state.checkbox}
          onChange={(event) => set("checkbox", event.currentTarget.checked)}
          type="checkbox"
        />
        <output>{String(state.checkbox)}</output>
      </form>
      <form data-case="checkbox-default">
        <input aria-label="Agree" defaultChecked type="checkbox" />
      </form>
      <form data-case="checkbox-empty">
        <input aria-label="Agree" type="checkbox" />
      </form>
      <form data-case="checkbox-rerender">
        <input
          aria-label="Agree"
          data-round={round}
          defaultChecked
          type="checkbox"
        />
      </form>
      <form data-case="group-bound">
        {views.map((view) => (
          <input
            aria-label={view}
            checked={state.group === view}
            key={view}
            name="view"
            onChange={() => set("group", view)}
            type="radio"
            value={view}
          />
        ))}
        <output>{state.group}</output>
      </form>
      <form data-case="group-default">
        {views.map((view) => (
          <input
            aria-label={view}
            defaultChecked={view === "week"}
            key={view}
            name="view"
            type="radio"
            value={view}
          />
        ))}
      </form>
      <form data-case="group-empty">
        {views.map((view) => (
          <input
            aria-label={view}
            key={view}
            name="view"
            type="radio"
            value={view}
          />
        ))}
      </form>
      <form data-case="number-default">
        <input aria-label="Quantity" defaultValue="1" type="number" />
      </form>
      <form data-case="radio-bound">
        {["tea", "coffee"].map((drink) => (
          <input
            aria-label={drink}
            checked={state.radio === drink}
            key={drink}
            name="drink"
            onChange={() => set("radio", drink)}
            type="radio"
            value={drink}
          />
        ))}
        <output>{state.radio}</output>
      </form>
      <form data-case="radio-default">
        <input aria-label="Tea" name="drink" type="radio" value="tea" />
        <input
          aria-label="Coffee"
          defaultChecked
          name="drink"
          type="radio"
          value="coffee"
        />
      </form>
      <form data-case="radio-empty">
        <input aria-label="Tea" name="drink" type="radio" value="tea" />
        <input aria-label="Coffee" name="drink" type="radio" value="coffee" />
      </form>
      <form data-case="range-bound">
        <input
          aria-label="Level"
          onChange={(event) => set("range", Number(event.currentTarget.value))}
          type="range"
          value={state.range}
        />
        <output>{state.range}</output>
      </form>
      <form data-case="range-default">
        <input aria-label="Level" defaultValue="40" type="range" />
      </form>
      <form data-case="rating-bound">
        {stars.map((star) => (
          <input
            aria-label={`${star} stars`}
            checked={state.rating === star}
            key={star}
            name="score"
            onChange={() => set("rating", star)}
            type="radio"
            value={star}
          />
        ))}
        <output>{state.rating}</output>
      </form>
      <form data-case="rating-default">
        {stars.map((star) => (
          <input
            aria-label={`${star} stars`}
            defaultChecked={star === 3}
            key={star}
            name="score"
            type="radio"
            value={star}
          />
        ))}
      </form>
      <form data-case="rating-empty">
        {stars.map((star) => (
          <input
            aria-label={`${star} stars`}
            key={star}
            name="score"
            type="radio"
            value={star}
          />
        ))}
      </form>
      <form data-case="select-bound">
        <select
          aria-label="Color"
          onChange={(event) => set("select", event.currentTarget.value)}
          value={state.select}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <output>{state.select}</output>
      </form>
      <form data-case="select-default">
        <select aria-label="Color" defaultValue="green">
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </form>
      <form data-case="tabs-bound">
        {tabs.map((tab) => (
          <input
            aria-label={tab}
            checked={state.tabs === tab}
            key={tab}
            name="tab"
            onChange={() => set("tabs", tab)}
            type="radio"
            value={tab}
          />
        ))}
        <output>{state.tabs}</output>
      </form>
      <form data-case="tabs-default">
        {tabs.map((tab) => (
          <input
            aria-label={tab}
            defaultChecked={tab === "two"}
            key={tab}
            name="tab"
            type="radio"
            value={tab}
          />
        ))}
      </form>
      <form data-case="text-bound">
        <input
          aria-label="Name"
          onChange={(event) => set("text", event.currentTarget.value)}
          value={state.text}
        />
        <output>{state.text}</output>
      </form>
      <form data-case="text-default">
        <input aria-label="Name" defaultValue="Ada" />
      </form>
      <form data-case="text-empty">
        <input aria-label="Name" />
      </form>
      <form data-case="text-rerender">
        <input aria-label="Name" data-round={round} defaultValue="Ada" />
      </form>
      <form data-case="toggle-bound">
        <input
          aria-label="Bold"
          checked={state.toggle}
          onChange={(event) => set("toggle", event.currentTarget.checked)}
          type="checkbox"
        />
        <output>{String(state.toggle)}</output>
      </form>
      <form data-case="toggle-default">
        <input aria-label="Bold" defaultChecked type="checkbox" />
      </form>
      <form data-case="toggle-empty">
        <input aria-label="Bold" type="checkbox" />
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
