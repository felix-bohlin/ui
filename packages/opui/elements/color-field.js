const Base = globalThis.HTMLElement ?? class {}

const NUMBER = String.raw`(-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?)`

const OKLCH = new RegExp(
  String.raw`^oklch\(\s*${NUMBER}(%?)\s+${NUMBER}(%?)\s+(?:${NUMBER}(?:deg)?|none)\s*(?:\/\s*${NUMBER}(%?)\s*)?\)$`,
  "i",
)

const SRGB_TO_P3 = [
  [0.8224621209, 0.177537879, 0],
  [0.0331941989, 0.9668058011, 0],
  [0.0170826307, 0.0723974407, 0.9105199286],
]

const GAMUT_EPSILON = 0.0005

const round = (value, digits) => +value.toFixed(digits)

const inUnit = (channels) =>
  channels.every(
    (channel) => channel >= -GAMUT_EPSILON && channel <= 1 + GAMUT_EPSILON,
  )

export const parseOklch = (value) => {
  const match = OKLCH.exec(value.trim())
  if (!match) return null
  const [, l, lPercent, c, cPercent, h, alpha, alphaPercent] = match
  const L = Number(l) / (lPercent ? 100 : 1)
  const C = cPercent ? (Number(c) * 0.4) / 100 : Number(c)
  const hue = h === undefined ? 0 : Number(h)
  return {
    C: Math.max(0, C),
    H: ((hue % 360) + 360) % 360,
    L: Math.min(1, Math.max(0, L)),
    alpha: alpha === undefined ? 1 : Number(alpha) / (alphaPercent ? 100 : 1),
  }
}

export const formatOklch = ({ C, H, L }, alpha = 1) => {
  const hue = round(C, 4) === 0 ? 0 : round(H, 2) % 360
  const color = `${round(L, 4)} ${round(C, 4)} ${hue}`
  return alpha < 1 ? `oklch(${color} / ${round(alpha, 3)})` : `oklch(${color})`
}

export const oklchToLinearSrgb = (L, C, H) => {
  const hRad = H * (Math.PI / 180)
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  // OKLab → linear sRGB (cube stage)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

export const oklchGamut = (L, C, H) => {
  const srgb = oklchToLinearSrgb(L, C, H)
  if (inUnit(srgb)) return "srgb"
  const p3 = SRGB_TO_P3.map((row) =>
    row.reduce((sum, weight, index) => sum + weight * srgb[index], 0),
  )
  return inUnit(p3) ? "p3" : "wide"
}

export const readColor = (text) => {
  if (!text.trim() || /\b(?:attr|env|var)\(|currentcolor/i.test(text)) {
    return null
  }
  const direct = parseOklch(text)
  if (direct) return direct
  if (typeof document === "undefined") return null
  const probe = document.createElement("div")
  probe.hidden = true
  probe.style.color = `oklch(from ${text} l c h / alpha)`
  if (!probe.style.color) return null
  document.body.append(probe)
  const parsed = parseOklch(getComputedStyle(probe).color)
  probe.remove()
  return parsed
}

const CHANNELS = {
  C: {
    spoken: (value) => `${round(value, 3)}`,
    text: (value) => `${round(value, 3)}`,
  },
  H: {
    spoken: (value) => `${round(value, 1)}°`,
    text: (value) => `${round(value, 1)}°`,
  },
  L: {
    spoken: (value) => `${round(value * 100, 1)}%`,
    text: (value) => `${round(value * 100, 1)}%`,
  },
  alpha: {
    spoken: (value) => `${Math.round(value * 100)}%`,
    text: (value) => `${Math.round(value * 100)}%`,
  },
}

const GAMUT_TEXT = {
  p3: "Display P3. Wide-gamut screens show it, others show the nearest sRGB color.",
  srgb: "sRGB. Every screen shows it.",
  wide: "Beyond Display P3. Screens show the nearest color they can.",
}

export const INVALID_TEXT =
  "Not a color. Try oklch(0.6 0.2 250) or any CSS color."

const CONTRAST_LABEL = "{light}:1 on light, {dark}:1 on dark"
const COPIED = 2000

const luminanceOf = ({ C, H, L }) => {
  const [r, g, b] = oklchToLinearSrgb(L, C, H).map((channel) =>
    Math.min(1, Math.max(0, channel)),
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

const valueSetter = globalThis.HTMLInputElement
  ? Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set
  : undefined

export class ColorField extends Base {
  #color = { C: 0.1, H: 250, L: 0.6, alpha: 1 }
  #controller
  #copied
  #observer
  #timeout

  get input() {
    return this.querySelector(".ui-field input:not([type=range])")
  }

  get value() {
    return this.input?.value ?? ""
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("input", (event) => this.#input(event), { signal })
    this.addEventListener("change", (event) => this.#change(event), {
      signal,
    })
    this.addEventListener("focusin", () => this.#sync(), { signal })
    this.addEventListener("command", (event) => this.#command(event), {
      capture: true,
      signal,
    })
    this.querySelector(".ui-floating")?.addEventListener(
      "toggle",
      () => this.#syncEyedropper(),
      { signal },
    )
    this.#syncEyedropper()
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target !== this.input?.form) return
        setTimeout(() => {
          if (event.defaultPrevented) return
          this.#sync()
          this.#emit("input")
        })
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#sync())
    this.#observer.observe(this, {
      attributeFilter: ["disabled", "value"],
      subtree: true,
    })
    this.#sync()
    queueMicrotask(() => {
      const input = this.input
      if (input && !input.hasAttribute("value") && input.value) {
        input.defaultValue = input.value
      }
      this.#sync()
    })
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    this.#uncopy()
  }

  async copy(source) {
    try {
      await navigator.clipboard.writeText(this.value)
    } catch {
      this.input?.select()
      return false
    }
    this.#uncopy()
    const status = this.querySelector('.ui-header > [role="status"]')
    if (status) {
      requestAnimationFrame(() => {
        status.textContent = this.#text("copied-label", "Copied")
      })
    }
    this.#copied = source
    source?.setAttribute("data-copied", "")
    this.#timeout = setTimeout(() => this.#uncopy(), COPIED)
    return true
  }

  async pick() {
    if (!globalThis.EyeDropper) return null
    let result
    try {
      result = await new EyeDropper().open()
    } catch {
      return null
    }
    const color = readColor(result.sRGBHex)
    if (!color) return null
    this.#render(color)
    if (this.#write(this.#format(this.#color))) {
      this.#emit("input")
      this.#emit("change")
    }
    return this.value
  }

  get #alpha() {
    return !!this.querySelector('input[data-channel="alpha"]')
  }

  #sliders() {
    return this.querySelectorAll("input[type=range][data-channel]")
  }

  #emit(type) {
    this.input?.dispatchEvent(new Event(type, { bubbles: true }))
  }

  #write(value) {
    const input = this.input
    if (!input || input.value === value) return false
    if (valueSetter) valueSetter.call(input, value)
    else input.value = value
    return true
  }

  #input(event) {
    const target = event.target
    if (target === this.input) {
      const color = readColor(target.value)
      if (color) this.#render(color)
      return
    }
    const channel = target?.dataset?.channel
    if (!channel || !(channel in CHANNELS)) return
    const color = { ...this.#color, [channel]: Number(target.value) }
    this.#render(color, target)
    if (this.#write(this.#format(color))) this.#emit("input")
  }

  #change(event) {
    const target = event.target
    if (target === this.input) {
      const color = readColor(target.value)
      if (!color) {
        this.#invalid()
        return
      }
      this.#render(color)
      if (this.#write(this.#format(color))) this.#emit("input")
      return
    }
    if (target?.dataset?.channel) this.#emit("change")
  }

  #format(color) {
    return formatOklch(color, this.#alpha ? color.alpha : 1)
  }

  #command(event) {
    if (event.command === "--copy") void this.copy(event.source)
    else if (event.command === "--eyedropper") void this.pick()
  }

  #syncEyedropper() {
    const button = this.querySelector('button[command="--eyedropper"]')
    if (button) button.hidden = !globalThis.EyeDropper
  }

  #uncopy() {
    clearTimeout(this.#timeout)
    this.#copied?.removeAttribute("data-copied")
    this.#copied = undefined
    const status = this.querySelector('.ui-header > [role="status"]')
    if (status) status.textContent = ""
  }

  #preview(color) {
    const value = this.querySelector(".ui-header > .ui-value")
    const sr = this.querySelector(".ui-footer > .ui-sr-only")
    const light = this.querySelector('[data-contrast="light"]')
    const dark = this.querySelector('[data-contrast="dark"]')
    if (!color) {
      this.style.removeProperty("--_preview-text-color")
      for (const node of [value, sr, light, dark]) {
        if (node) node.textContent = ""
      }
      return
    }
    const luminance = luminanceOf(color)
    const onLight = round(contrast(luminance, 1), 1)
    const onDark = round(contrast(luminance, 0), 1)
    this.style.setProperty(
      "--_preview-text-color",
      onLight > onDark ? "oklch(1 0 0)" : "oklch(0 0 0)",
    )
    if (value) value.textContent = this.#format(color)
    if (light) light.textContent = `${onLight}:1`
    if (dark) dark.textContent = `${onDark}:1`
    if (sr) {
      sr.textContent = this.#text("contrast-label", CONTRAST_LABEL)
        .replace("{light}", `${onLight}`)
        .replace("{dark}", `${onDark}`)
    }
  }

  #render(color, skip) {
    const input = this.input
    this.#color = { ...color, alpha: this.#alpha ? color.alpha : 1 }
    this.style.setProperty("--_indicator-bg-color", this.#format(this.#color))
    this.#preview(this.#color)
    input?.setCustomValidity("")
    for (const slider of this.#sliders()) {
      const channel = slider.dataset.channel
      const number = this.#color[channel]
      if (slider !== skip) slider.value = `${number}`
      slider.setAttribute("aria-valuetext", CHANNELS[channel].spoken(number))
      const output = slider.closest(".ui-range")?.querySelector(".ui-value")
      if (output) output.textContent = CHANNELS[channel].text(number)
    }
    const gamut = this.querySelector(".ui-floating > .ui-description")
    if (gamut) {
      const range = oklchGamut(this.#color.L, this.#color.C, this.#color.H)
      gamut.textContent = this.#text(`${range}-text`, GAMUT_TEXT[range])
    }
  }

  #sync() {
    const input = this.input
    if (!input) return
    const trigger = this.querySelector(".ui-field > .ui-start > button")
    if (trigger && trigger.disabled !== input.disabled) {
      trigger.disabled = input.disabled
    }
    const color = readColor(input.value)
    if (color) {
      this.#render(color)
      return
    }
    this.#invalid()
  }

  #invalid() {
    const input = this.input
    if (!input) return
    const empty = !input.value.trim()
    this.style.setProperty("--_indicator-bg-color", "transparent")
    this.#preview(null)
    const text = empty ? "" : this.#text("invalid-text", INVALID_TEXT)
    input.setCustomValidity(text)
    const gamut = this.querySelector(".ui-floating > .ui-description")
    if (gamut) gamut.textContent = text
  }

  #text(attribute, fallback) {
    return this.getAttribute(attribute) ?? fallback
  }
}

if (globalThis.customElements && !customElements.get("opui-color-field")) {
  customElements.define("opui-color-field", ColorField)
}
