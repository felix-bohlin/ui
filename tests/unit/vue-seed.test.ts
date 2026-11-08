import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import {
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
} from "vue"
import { vSeed } from "../../packages/opui/components/vue"

type Listener = (event: { defaultPrevented: boolean }) => void

const formOf = () => {
  const listeners = new Set<Listener>()
  const form = {
    addEventListener: (_: string, listener: Listener) =>
      listeners.add(listener),
    elements: [] as Control[],
    removeEventListener: (_: string, listener: Listener) =>
      listeners.delete(listener),
    reset: (cancel = false) => {
      const event = { defaultPrevented: cancel }
      for (const listener of listeners) listener(event)
      if (event.defaultPrevented) return
      for (const element of form.elements) element.restore()
    },
  }
  return form
}

type Form = ReturnType<typeof formOf>

const attributed = () => {
  const attributes = new Map<string, string>()
  return {
    attributes,
    getAttribute: (name: string) => attributes.get(name) ?? null,
    hasAttribute: (name: string) => attributes.has(name),
    setAttribute: (name: string, value: string) => {
      attributes.set(name, value)
    },
  }
}

const inputOf = (
  type: string,
  options: { form?: Form; name?: string; server?: string } = {},
) => {
  const base = attributed()
  if (options.server !== undefined) base.attributes.set("value", options.server)
  base.attributes.set("type", type)
  const input = {
    ...base,
    checked: false,
    form: options.form ?? null,
    localName: "input",
    name: options.name ?? "",
    parentNode: null as object | null,
    restore: () => {
      input.checked = input.defaultChecked
      input.value = input.defaultValue
    },
    type,
    value: options.server ?? "",
    get defaultChecked() {
      return base.attributes.has("checked")
    },
    set defaultChecked(checked: boolean) {
      if (checked) base.attributes.set("checked", "")
      else base.attributes.delete("checked")
    },
    get defaultValue() {
      return base.attributes.get("value") ?? ""
    },
    set defaultValue(value: string) {
      base.attributes.set("value", value)
    },
  }
  options.form?.elements.push(input)
  return input
}

const selectOf = (values: string[], form: Form) => {
  const options = values.map((value) => {
    const base = attributed()
    return {
      ...base,
      selected: false,
      value,
      get defaultSelected() {
        return base.attributes.has("selected")
      },
      set defaultSelected(selected: boolean) {
        if (selected) base.attributes.set("selected", "")
        else base.attributes.delete("selected")
      },
    }
  })
  const select = {
    ...attributed(),
    form,
    localName: "select",
    multiple: false,
    options,
    parentNode: null as object | null,
    restore: () => {
      const initial = options.findIndex((option) => option.defaultSelected)
      for (const [index, option] of options.entries()) {
        option.selected = index === Math.max(initial, 0)
      }
    },
    type: "select-one",
    get selectedIndex() {
      return options.findIndex((option) => option.selected)
    },
    get selectedOptions() {
      return options.filter((option) => option.selected)
    },
  }
  form.elements.push(select)
  return select
}

type Control = { restore: () => void }

const vnodeOf = (
  dir: unknown,
  value: unknown,
  assigned: unknown[],
  props: Record<string, unknown> = {},
  modifiers: Record<string, boolean> = {},
) => ({
  dirs: [{ dir, modifiers, value }],
  props: {
    ...props,
    "onUpdate:modelValue": (next: unknown) => assigned.push(next),
  },
})

const hook = (
  name:
    | "beforeMount"
    | "beforeUnmount"
    | "beforeUpdate"
    | "created"
    | "mounted",
  field: object,
  vnode: object,
) => (vSeed[name] as (...args: unknown[]) => void)(field, {}, vnode)

const mount = async (field: object, vnode: object, render: () => void) => {
  hook("created", field, vnode)
  hook("beforeMount", field, vnode)
  hook("mounted", field, vnode)
  render()
  await Promise.resolve()
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal("document", {
    createElement: () => {
      const probe = attributed()
      return {
        ...probe,
        get value() {
          return probe.attributes.get("value") ?? ""
        },
      }
    },
  })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

const reset = (form: Form, cancel = false) => {
  form.reset(cancel)
  vi.runAllTimers()
}

describe("vSeed on a client render", () => {
  test("a number field keeps a number after a reset", async () => {
    const form = formOf()
    const field = inputOf("number", { form })
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelDynamic, 3, assigned), () => {
      field.value = "3"
    })
    expect(field.defaultValue).toBe("3")
    field.value = "7"
    hook("beforeUpdate", field, vnodeOf(vModelDynamic, 7, assigned))
    reset(form)
    expect(assigned).toEqual([3])
  })

  test("a checkbox follows a reset to the state it was rendered with", async () => {
    const form = formOf()
    const field = inputOf("checkbox", { form })
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelCheckbox, true, assigned), () => {
      field.checked = true
    })
    expect(field.defaultChecked).toBe(true)
    field.checked = false
    hook("beforeUpdate", field, vnodeOf(vModelCheckbox, false, assigned))
    reset(form)
    expect(assigned).toEqual([true])
  })

  test("checkboxes bound to one array follow a reset by their value", async () => {
    const form = formOf()
    const assigned: unknown[] = []
    const boxes = ["ham", "cheese"].map((value) => ({
      field: inputOf("checkbox", { form }),
      value,
    }))
    const render = (model: unknown) => {
      for (const { field, value } of boxes) {
        hook(
          "beforeUpdate",
          field,
          vnodeOf(vModelCheckbox, model, assigned, { value }),
        )
      }
    }
    for (const { field, value } of boxes) {
      await mount(
        field,
        vnodeOf(vModelCheckbox, ["ham"], assigned, { value }),
        () => {
          field.checked = value === "ham"
        },
      )
    }
    for (const { field, value } of boxes) field.checked = value === "cheese"
    render(["cheese"])
    form.reset()
    while (vi.getTimerCount() > 0) {
      vi.advanceTimersToNextTimer()
      render(assigned.at(-1))
    }
    expect(assigned).toEqual([["cheese", "ham"], ["ham"]])
  })

  test("a radio group follows a reset once, and to no value when none was checked", async () => {
    for (const [initial, expected] of [
      ["small", ["small"]],
      [undefined, [undefined]],
    ] as const) {
      const form = formOf()
      const assigned: unknown[] = []
      const radios = ["small", "large"].map((value) => ({
        field: inputOf("radio", { form, name: "size" }),
        value,
      }))
      for (const { field, value } of radios) {
        await mount(
          field,
          vnodeOf(vModelRadio, initial, assigned, { value }),
          () => {
            field.checked = value === initial
          },
        )
      }
      for (const { field, value } of radios) {
        field.checked = value === "large"
        hook(
          "beforeUpdate",
          field,
          vnodeOf(vModelRadio, "large", assigned, { value }),
        )
      }
      reset(form)
      expect(assigned).toEqual(expected)
    }
  })

  test("a select follows a reset to the option it was rendered with", async () => {
    const form = formOf()
    const field = selectOf(["a", "b", "c"], form)
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelSelect, "b", assigned), () => {
      field.options[1]!.selected = true
    })
    expect(field.options.map((option) => option.defaultSelected)).toEqual([
      false,
      true,
      false,
    ])
    field.options[1]!.selected = false
    field.options[2]!.selected = true
    hook("beforeUpdate", field, vnodeOf(vModelSelect, "c", assigned))
    reset(form)
    expect(assigned).toEqual(["b"])
  })

  test("a cancelled reset and an unmounted field leave the model alone", async () => {
    const form = formOf()
    const field = inputOf("text", { form })
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelText, "a", assigned), () => {
      field.value = "a"
    })
    field.value = "b"
    hook("beforeUpdate", field, vnodeOf(vModelText, "b", assigned))
    reset(form, true)
    expect(assigned).toEqual([])
    hook("beforeUnmount", field, vnodeOf(vModelText, "b", assigned))
    reset(form)
    expect(assigned).toEqual([])
  })
})

describe("vSeed while hydrating", () => {
  test("a field edited before hydration seeds the model and keeps the server's default", async () => {
    const form = formOf()
    const field = inputOf("text", { form, server: "server" })
    field.parentNode = {}
    field.value = "typed"
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelText, "server", assigned), () => {})
    expect(assigned).toEqual(["typed"])
    expect(field.defaultValue).toBe("server")
    hook("beforeUpdate", field, vnodeOf(vModelText, "typed", assigned))
    reset(form)
    expect(assigned).toEqual(["typed", "server"])
  })

  test("boxes bound to one array and ticked before hydration all join it", async () => {
    const assigned: unknown[] = []
    const model = ["ham"]
    const boxes = ["cheese", "olives"].map((value) => {
      const field = inputOf("checkbox")
      field.parentNode = {}
      field.checked = true
      return { field, value }
    })
    for (const { field, value } of boxes) {
      hook(
        "created",
        field,
        vnodeOf(vModelCheckbox, model, assigned, { value }),
      )
    }
    expect(assigned.at(-1)).toEqual(["ham", "cheese", "olives"])
  })

  test("a box unticked before hydration leaves an array without its value", async () => {
    const field = inputOf("checkbox")
    field.defaultChecked = true
    field.parentNode = {}
    const assigned: unknown[] = []
    hook(
      "created",
      field,
      vnodeOf(vModelCheckbox, ["ham", "cheese"], assigned, { value: "cheese" }),
    )
    expect(assigned).toEqual([["ham"]])
  })

  test("a box unchecked before hydration seeds the model", async () => {
    const field = inputOf("checkbox")
    field.defaultChecked = true
    field.parentNode = {}
    const assigned: unknown[] = []
    await mount(field, vnodeOf(vModelCheckbox, true, assigned), () => {})
    expect(assigned).toEqual([false])
  })
})
