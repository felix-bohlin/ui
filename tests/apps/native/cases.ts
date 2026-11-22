import type { Expect, Locator, Page } from "@playwright/test"

export type NativeStep =
  | { click: number }
  | { fill: string }
  | { select: string }

export type NativeCase = {
  after: NativeStep
  before?: NativeStep
  name: string
  rerender?: boolean
}

export const NATIVE_CASES: NativeCase[] = [
  { after: { click: 0 }, before: { click: 0 }, name: "checkbox-bound" },
  { after: { click: 0 }, before: { click: 0 }, name: "checkbox-default" },
  { after: { click: 0 }, before: { click: 0 }, name: "checkbox-empty" },
  { after: { click: 0 }, name: "checkbox-rerender", rerender: true },
  { after: { click: 0 }, before: { click: 2 }, name: "group-bound" },
  { after: { click: 0 }, before: { click: 2 }, name: "group-default" },
  { after: { click: 0 }, before: { click: 2 }, name: "group-empty" },
  { after: { fill: "" }, before: { fill: "7" }, name: "number-default" },
  { after: { click: 1 }, before: { click: 0 }, name: "radio-bound" },
  { after: { click: 1 }, before: { click: 0 }, name: "radio-default" },
  { after: { click: 1 }, before: { click: 0 }, name: "radio-empty" },
  { after: { fill: "10" }, before: { fill: "70" }, name: "range-bound" },
  { after: { fill: "10" }, before: { fill: "70" }, name: "range-default" },
  { after: { click: 2 }, before: { click: 5 }, name: "rating-bound" },
  { after: { click: 2 }, before: { click: 5 }, name: "rating-default" },
  { after: { click: 2 }, before: { click: 5 }, name: "rating-empty" },
  {
    after: { select: "red" },
    before: { select: "blue" },
    name: "select-bound",
  },
  {
    after: { select: "red" },
    before: { select: "blue" },
    name: "select-default",
  },
  { after: { click: 0 }, before: { click: 2 }, name: "tabs-bound" },
  { after: { click: 0 }, before: { click: 2 }, name: "tabs-default" },
  { after: { fill: "Linus" }, before: { fill: "Grace" }, name: "text-bound" },
  {
    after: { fill: "Linus" },
    before: { fill: "Grace" },
    name: "text-default",
  },
  { after: { fill: "Linus" }, before: { fill: "Grace" }, name: "text-empty" },
  { after: { fill: "Linus" }, name: "text-rerender", rerender: true },
  { after: { click: 0 }, before: { click: 0 }, name: "toggle-bound" },
  { after: { click: 0 }, before: { click: 0 }, name: "toggle-default" },
  { after: { click: 0 }, before: { click: 0 }, name: "toggle-empty" },
]

export const SVELTE_GROUP =
  "a component can't use bind:group, so Radio, Rating, TabsItem and ToggleButton write checked from the bound value with the seedChecked attachment (components/svelte.ts), which keeps the first state as defaultChecked to tell a choice made before hydration from the server's"

export const SVELTE_SPREAD =
  "Svelte drops the server's value and checked attributes from an input with only bind: when it hydrates, and keeps them on an input with a spread, as every component's input has"

export type NativeDifference = { name: string; reason: string; where: string }

export const differences = (where: string, reason: string, names: string[]) =>
  names.map((name) => ({ name, reason, where }))

const CONTROLS = "input, select, textarea"

const act = async (form: Locator, step: NativeStep) => {
  const controls = form.locator(CONTROLS)
  if ("click" in step) {
    await controls
      .nth(step.click)
      .evaluate((element) => (element as HTMLInputElement).click())
  } else if ("fill" in step) {
    await controls.first().fill(step.fill)
  } else await controls.first().selectOption(step.select)
}

const nativeStateOf = (form: Locator) =>
  form.evaluate((element, controls) => {
    const output = element.querySelector("output")
    return {
      bound: output?.textContent ?? null,
      controls: [...element.querySelectorAll(controls)].map((control) => {
        if (control instanceof HTMLSelectElement) {
          return {
            current: control.value,
            initial: [...control.options].find(
              (option) => option.defaultSelected,
            )?.value,
          }
        }
        if (
          control instanceof HTMLInputElement &&
          (control.type === "checkbox" || control.type === "radio")
        ) {
          return { current: control.checked, initial: control.defaultChecked }
        }
        const field = control as HTMLInputElement | HTMLTextAreaElement
        return { current: field.value, initial: field.defaultValue }
      }),
    }
  }, CONTROLS)

const settle = (page: Page) =>
  page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)))

const SIDES = ["Native", "Opui"]

export const casesOf = (page: Page) =>
  Promise.all(
    SIDES.map((side) =>
      page
        .locator(`[data-example="native/${side}"] form[data-case]`)
        .evaluateAll((forms) =>
          forms.map((form) => (form as HTMLElement).dataset.case),
        ),
    ),
  )

export const compareNative = async (
  page: Page,
  { after, before, name, rerender }: NativeCase,
  {
    expect,
    hydrated,
    release,
    where,
  }: {
    expect: Expect
    hydrated: () => Promise<void>
    release?: () => unknown
    where: string
  },
) => {
  const forms = SIDES.map((side) =>
    page.locator(`[data-example="native/${side}"] [data-case="${name}"]`),
  )
  const [native, opui] = forms as [Locator, Locator]
  const expectSame = async (moment: string) => {
    await settle(page)
    expect(
      await nativeStateOf(opui),
      `${where}: the opui ${name} differs from the native control ${moment}. A component keeps no state: it hands the value to the native control in the framework's own way and behaves like it, so remove what the component adds`,
    ).toEqual(await nativeStateOf(native))
  }

  if (release) {
    if (before) for (const form of forms) await act(form, before)
    await release()
  }
  await hydrated()
  await expectSame(
    release && before ? "once it hydrates over a change" : "once it renders",
  )
  for (const form of forms) await act(form, after)
  await expectSame("after a change")
  if (rerender) {
    for (const side of SIDES) {
      await page
        .locator(`[data-example="native/${side}"] [data-rerender]`)
        .click()
    }
    await expectSame("after the page renders it again")
  }
  for (const form of forms) {
    await form.evaluate((element) => (element as HTMLFormElement).reset())
  }
  await expectSame("after a form reset")
}
