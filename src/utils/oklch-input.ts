import {
  colorToOklch,
  formatOklch,
  oklchGamut,
  parseOklch,
  type Oklch,
} from "./color-utils"

type Color = Oklch & { alpha: number }

type Channel = keyof Color

const MAX_CHROMA = 0.37

const ANCHOR = "--oklch-picker-anchor"

const round = (value: number, digits: number) => +value.toFixed(digits)

const CHANNELS: {
  key: Channel
  label: string
  max: number
  spoken: (value: number) => string
  step: number
  text: (value: number) => string
}[] = [
  {
    key: "L",
    label: "Lightness",
    max: 1,
    spoken: (value) => `${round(value * 100, 1)}%`,
    step: 0.001,
    text: (value) => `${round(value * 100, 1)}%`,
  },
  {
    key: "C",
    label: "Chroma",
    max: MAX_CHROMA,
    spoken: (value) => `${round(value, 3)}`,
    step: 0.001,
    text: (value) => `${round(value, 3)}`,
  },
  {
    key: "H",
    label: "Hue",
    max: 360,
    spoken: (value) => `${round(value, 1)} degrees`,
    step: 0.1,
    text: (value) => `${round(value, 1)}°`,
  },
  {
    key: "alpha",
    label: "Opacity",
    max: 1,
    spoken: (value) => `${Math.round(value * 100)}%`,
    step: 0.01,
    text: (value) => `${Math.round(value * 100)}%`,
  },
]

const GAMUT_TEXT = {
  p3: "Display P3. Wide-gamut screens show it, others show the nearest sRGB color.",
  srgb: "sRGB. Every screen shows it.",
  wide: "Beyond Display P3. Screens show the nearest color they can.",
}

const INVALID_TEXT =
  "Not a color. Try oklch(0.6 0.2 250), #ff3e00 or any CSS color."

const readColor = (text: string): Color | null => {
  if (/\b(?:attr|env|var)\(|currentcolor/i.test(text)) return null
  const direct = parseOklch(text) ?? colorToOklch(text)
  if (direct) return { alpha: 1, ...direct }
  const probe = document.createElement("div")
  probe.hidden = true
  probe.style.color = `oklch(from ${text} l c h / alpha)`
  if (!probe.style.color) return null
  document.body.append(probe)
  const parsed = parseOklch(getComputedStyle(probe).color)
  probe.remove()
  return parsed
}

export class OklchInput extends HTMLElement {
  #value = ""

  #open = () => open(this)

  get button() {
    return this.querySelector<HTMLButtonElement>(".oklch-trigger")!
  }

  get label() {
    return this.button.getAttribute("aria-label") ?? ""
  }

  set label(label: string) {
    this.button.setAttribute("aria-label", label)
    this.button.title = label
  }

  get value() {
    return this.#value
  }

  set value(value: string) {
    this.#value = value
    this.style.setProperty("--oklch-value", value)
  }

  connectedCallback() {
    this.button.addEventListener("click", this.#open)
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.#open)
  }

  commit(value: string, type: "change" | "input") {
    this.value = value
    this.dispatchEvent(new Event(type, { bubbles: true }))
  }
}

let picker: ReturnType<typeof createPicker> | null = null
let target: OklchInput | null = null
let closed: { at: number; input: OklchInput | null } = { at: 0, input: null }

const createPicker = () => {
  const root = document.createElement("div")
  root.className = "oklch-picker"
  root.popover = "auto"
  root.setAttribute("aria-labelledby", "oklch-picker-title")
  root.setAttribute("role", "dialog")
  root.innerHTML = `
    <div class="oklch-picker-head">
      <span aria-hidden="true" class="oklch-picker-preview"></span>
      <p class="oklch-picker-title" id="oklch-picker-title"></p>
    </div>
    ${CHANNELS.map(
      ({ key, label, max, step }) => `
        <div class="oklch-slider" data-channel="${key}">
          <label for="oklch-picker-${key}">${label}</label>
          <output for="oklch-picker-${key}"></output>
          <input id="oklch-picker-${key}" max="${max}" min="0" step="${step}" type="range" />
        </div>`,
    ).join("")}
    <label class="ui-text-field ui-small oklch-picker-value">
      <span class="ui-label">Color value</span>
      <span class="ui-field">
        <input aria-describedby="oklch-picker-gamut" autocomplete="off" spellcheck="false" type="text" />
      </span>
    </label>
    <p class="oklch-picker-gamut" id="oklch-picker-gamut"></p>
  `
  const sliders = new Map(
    CHANNELS.map((channel) => {
      const element = root.querySelector<HTMLElement>(
        `[data-channel="${channel.key}"]`,
      )!
      return [
        channel.key,
        {
          ...channel,
          element,
          input: element.querySelector("input")!,
          output: element.querySelector("output")!,
        },
      ]
    }),
  )
  sliders.get("C")!.input.setAttribute("aria-describedby", "oklch-picker-gamut")
  const field = root.querySelector<HTMLInputElement>(".ui-field input")!
  const gamut = root.querySelector<HTMLElement>(".oklch-picker-gamut")!
  const title = root.querySelector<HTMLElement>(".oklch-picker-title")!
  let color: Color = { C: 0.1, H: 250, L: 0.6, alpha: 1 }

  const render = (skip?: HTMLInputElement) => {
    const value = formatOklch(color, color.alpha)
    root.style.setProperty("--oklch-l", `${color.L}`)
    root.style.setProperty("--oklch-c", `${color.C}`)
    root.style.setProperty("--oklch-h", `${color.H}`)
    root.style.setProperty("--oklch-current", value)
    for (const slider of sliders.values()) {
      const number = color[slider.key]
      if (slider.input !== skip) slider.input.value = `${number}`
      slider.output.textContent = slider.text(number)
      slider.input.setAttribute("aria-valuetext", slider.spoken(number))
    }
    if (document.activeElement !== field) field.value = value
    field.removeAttribute("aria-invalid")
    gamut.textContent = GAMUT_TEXT[oklchGamut(color.L, color.C, color.H)]
  }

  const emit = (type: "change" | "input") => {
    const alpha = target?.dataset.alpha === undefined ? 1 : color.alpha
    target?.commit(formatOklch(color, alpha), type)
  }

  root.addEventListener("input", (event) => {
    const input = event.target
    const slider = [...sliders.values()].find((entry) => entry.input === input)
    if (!slider) return
    color = { ...color, [slider.key]: Number(slider.input.value) }
    render(slider.input)
    emit("input")
  })

  root.addEventListener("change", (event) => {
    if (event.target !== field) {
      emit("change")
      return
    }
    const next = readColor(field.value)
    if (!next) {
      field.setAttribute("aria-invalid", "true")
      gamut.textContent = INVALID_TEXT
      return
    }
    color = {
      ...next,
      C: Math.min(MAX_CHROMA, next.C),
      alpha: target?.dataset.alpha === undefined ? 1 : next.alpha,
    }
    field.value = formatOklch(color, color.alpha)
    render()
    emit("input")
    emit("change")
  })

  root.addEventListener("beforetoggle", (event) => {
    if ((event as ToggleEvent).newState !== "closed") return
    closed = { at: performance.now(), input: target }
    target?.button.setAttribute("aria-expanded", "false")
    if (root.contains(document.activeElement)) target?.button.focus()
  })

  const show = (input: OklchInput) => {
    target?.button.style.removeProperty("anchor-name")
    target = input
    const host = input.closest("dialog") ?? document.body
    if (root.parentElement !== host) host.append(root)
    input.button.style.setProperty("anchor-name", ANCHOR)
    const parsed = readColor(input.value)
    color = parsed
      ? { ...parsed, C: Math.min(MAX_CHROMA, parsed.C) }
      : { C: 0.1, H: 250, L: 0.6, alpha: 1 }
    sliders.get("alpha")!.element.hidden = input.dataset.alpha === undefined
    title.textContent = input.label
    render()
    root.showPopover({ source: input.button })
    input.button.setAttribute("aria-expanded", "true")
    sliders.get("L")!.input.focus()
  }

  return { root, show }
}

const open = (input: OklchInput) => {
  picker ??= createPicker()
  if (picker.root.matches(":popover-open")) {
    picker.root.hidePopover()
    if (target === input) return
  } else if (closed.input === input && performance.now() - closed.at < 300) {
    return
  }
  picker.show(input)
}

if (!customElements.get("oklch-input")) {
  customElements.define("oklch-input", OklchInput)
}
