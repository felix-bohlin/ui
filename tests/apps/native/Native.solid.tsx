/** @jsxImportSource @solidjs/web */
import { createSignal, For } from "solid-js"

const colors = ["blue", "green", "red"]
const stars = [0, 1, 2, 3, 4, 5]
const tabs = ["one", "two", "three"]
const views = ["day", "week", "month"]

export default function Native() {
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
        <input
          aria-label="Agree"
          checked={checkbox()}
          onChange={(event) => setCheckbox(event.currentTarget.checked)}
          type="checkbox"
        />
        <output>{String(checkbox())}</output>
      </form>
      <form data-case="checkbox-default">
        <input aria-label="Agree" defaultChecked type="checkbox" />
      </form>
      <form data-case="checkbox-empty">
        <input aria-label="Agree" type="checkbox" />
      </form>
      <form data-case="group-bound">
        <For each={views}>
          {(view) => (
            <input
              aria-label={view}
              checked={group() === view}
              name="view"
              onChange={() => setGroup(view)}
              type="radio"
              value={view}
            />
          )}
        </For>
        <output>{group()}</output>
      </form>
      <form data-case="group-default">
        <For each={views}>
          {(view) => (
            <input
              aria-label={view}
              defaultChecked={view === "week"}
              name="view"
              type="radio"
              value={view}
            />
          )}
        </For>
      </form>
      <form data-case="group-empty">
        <For each={views}>
          {(view) => (
            <input aria-label={view} name="view" type="radio" value={view} />
          )}
        </For>
      </form>
      <form data-case="radio-bound">
        <For each={["tea", "coffee"]}>
          {(drink) => (
            <input
              aria-label={drink}
              checked={radio() === drink}
              name="drink"
              onChange={() => setRadio(drink)}
              type="radio"
              value={drink}
            />
          )}
        </For>
        <output>{radio()}</output>
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
          onInput={(event) => setRange(Number(event.currentTarget.value))}
          type="range"
          value={range()}
        />
        <output>{range()}</output>
      </form>
      <form data-case="range-default">
        <input aria-label="Level" defaultValue="40" type="range" />
      </form>
      <form data-case="rating-bound">
        <For each={stars}>
          {(star) => (
            <input
              aria-label={`${star} stars`}
              checked={rating() === star}
              name="score"
              onChange={() => setRating(star)}
              type="radio"
              value={star}
            />
          )}
        </For>
        <output>{rating()}</output>
      </form>
      <form data-case="rating-default">
        <For each={stars}>
          {(star) => (
            <input
              aria-label={`${star} stars`}
              defaultChecked={star === 3}
              name="score"
              type="radio"
              value={star}
            />
          )}
        </For>
      </form>
      <form data-case="rating-empty">
        <For each={stars}>
          {(star) => (
            <input
              aria-label={`${star} stars`}
              name="score"
              type="radio"
              value={star}
            />
          )}
        </For>
      </form>
      <form data-case="select-bound">
        <select
          aria-label="Color"
          onChange={(event) => setSelect(event.currentTarget.value)}
          value={select()}
        >
          <For each={colors}>
            {(color) => <option value={color}>{color}</option>}
          </For>
        </select>
        <output>{select()}</output>
      </form>
      <form data-case="select-default">
        <select aria-label="Color">
          <For each={colors}>
            {(color) => (
              <option selected={color === "green"} value={color}>
                {color}
              </option>
            )}
          </For>
        </select>
      </form>
      <form data-case="tabs-bound">
        <For each={tabs}>
          {(item) => (
            <input
              aria-label={item}
              checked={tab() === item}
              name="tab"
              onChange={() => setTab(item)}
              type="radio"
              value={item}
            />
          )}
        </For>
        <output>{tab()}</output>
      </form>
      <form data-case="tabs-default">
        <For each={tabs}>
          {(item) => (
            <input
              aria-label={item}
              defaultChecked={item === "two"}
              name="tab"
              type="radio"
              value={item}
            />
          )}
        </For>
      </form>
      <form data-case="text-bound">
        <input
          aria-label="Name"
          onInput={(event) => setText(event.currentTarget.value)}
          value={text()}
        />
        <output>{text()}</output>
      </form>
      <form data-case="text-default">
        <input aria-label="Name" defaultValue="Ada" />
      </form>
      <form data-case="text-empty">
        <input aria-label="Name" />
      </form>
      <form data-case="toggle-bound">
        <input
          aria-label="Bold"
          checked={toggle()}
          onChange={(event) => setToggle(event.currentTarget.checked)}
          type="checkbox"
        />
        <output>{String(toggle())}</output>
      </form>
      <form data-case="toggle-default">
        <input aria-label="Bold" defaultChecked type="checkbox" />
      </form>
      <form data-case="toggle-empty">
        <input aria-label="Bold" type="checkbox" />
      </form>
    </>
  )
}
