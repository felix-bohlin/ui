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

const multiply = (matrix, [a, b, c]) =>
  matrix.map(([x, y, z]) => x * a + y * b + z * c)

const signed = (transfer) => (value) =>
  Math.sign(value) * transfer(Math.abs(value))

const SRGB_TRANSFER = {
  decode: signed((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  ),
  encode: signed((value) =>
    value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055,
  ),
}

const LINEAR = { decode: (value) => value, encode: (value) => value }

const D65_TO_D50 = [
  [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
  [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
  [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371],
]

const D50_TO_D65 = [
  [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
  [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
  [0.012314014864481998, -0.020507649298898964, 1.330365926242124],
]

const REC2020_ALPHA = 1.09929682680944
const REC2020_BETA = 0.018053968510807

const D50 = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585]

const RGB = {
  "a98-rgb": {
    from: [
      [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
      [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
      [0.013444280632031142, -0.11836239223101838, 1.0151749943912054],
    ],
    to: [
      [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
      [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
      [0.02703136138641234, 0.07068885253582723, 0.9913375368376388],
    ],
    transfer: {
      decode: signed((value) => value ** (563 / 256)),
      encode: signed((value) => value ** (256 / 563)),
    },
  },
  "display-p3": {
    from: [
      [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
      [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
      [0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
    ],
    to: [
      [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
      [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
      [0, 0.04511338185890264, 1.043944368900976],
    ],
    transfer: SRGB_TRANSFER,
  },
  "prophoto-rgb": {
    d50: true,
    from: [
      [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
      [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
      [0, 0, 1.2119675456389452],
    ],
    to: [
      [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
      [0.2880748288194013, 0.711835234241873, 0.00008993693872564],
      [0, 0, 0.8251046025104602],
    ],
    transfer: {
      decode: signed((value) => (value < 16 / 512 ? value / 16 : value ** 1.8)),
      encode: signed((value) =>
        value >= 1 / 512 ? value ** (1 / 1.8) : value * 16,
      ),
    },
  },
  rec2020: {
    from: [
      [1.716651187971268, -0.355670783776392, -0.25336628137366],
      [-0.666684351832489, 1.616481236634939, 0.0157685458139111],
      [0.017639857445311, -0.042770613257809, 0.942103121235474],
    ],
    to: [
      [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
      [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
      [0, 0.028072693049087428, 1.060985057710791],
    ],
    transfer: {
      decode: signed((value) =>
        value < REC2020_BETA * 4.5
          ? value / 4.5
          : ((value + REC2020_ALPHA - 1) / REC2020_ALPHA) ** (1 / 0.45),
      ),
      encode: signed((value) =>
        value < REC2020_BETA
          ? value * 4.5
          : REC2020_ALPHA * value ** 0.45 - (REC2020_ALPHA - 1),
      ),
    },
  },
  srgb: {
    from: [
      [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
      [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
      [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ],
    to: [
      [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
      [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
      [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
    ],
    transfer: SRGB_TRANSFER,
  },
}

RGB["srgb-linear"] = { ...RGB.srgb, transfer: LINEAR }

const XYZ_TO_LMS = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
]

const LMS_TO_XYZ = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816],
]

const LMS_TO_OKLAB = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.4285922420485799, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
]

const OKLAB_TO_LMS = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092],
]

const xyzToOklab = (xyz) =>
  multiply(LMS_TO_OKLAB, multiply(XYZ_TO_LMS, xyz).map(Math.cbrt))

const oklabToXyz = (oklab) =>
  multiply(
    LMS_TO_XYZ,
    multiply(OKLAB_TO_LMS, oklab).map((value) => value ** 3),
  )

const toPolar = ([l, a, b]) => {
  const hue = (Math.atan2(b, a) * 180) / Math.PI
  return [l, Math.hypot(a, b), (hue + 360) % 360]
}

const toCartesian = ([l, c, h]) => {
  const radians = (h * Math.PI) / 180
  return [l, c * Math.cos(radians), c * Math.sin(radians)]
}

const LAB_E = 216 / 24389
const LAB_K = 24389 / 27

const xyzToLab = (xyz) => {
  const f = multiply(D65_TO_D50, xyz).map((value, index) => {
    const scaled = value / D50[index]
    return scaled > LAB_E ? Math.cbrt(scaled) : (LAB_K * scaled + 16) / 116
  })
  return [116 * f[1] - 16, 500 * (f[0] - f[1]), 200 * (f[1] - f[2])]
}

const labToXyz = ([l, a, b]) => {
  const fy = (l + 16) / 116
  const fx = a / 500 + fy
  const fz = fy - b / 200
  const xyz = [
    fx ** 3 > LAB_E ? fx ** 3 : (116 * fx - 16) / LAB_K,
    l > LAB_K * LAB_E ? fy ** 3 : l / LAB_K,
    fz ** 3 > LAB_E ? fz ** 3 : (116 * fz - 16) / LAB_K,
  ]
  return multiply(
    D50_TO_D65,
    xyz.map((value, index) => value * D50[index]),
  )
}

const rgbToXyz = (id, rgb) => {
  const space = RGB[id]
  const xyz = multiply(space.to, rgb.map(space.transfer.decode))
  return space.d50 ? multiply(D50_TO_D65, xyz) : xyz
}

const xyzToRgb = (id, xyz) => {
  const space = RGB[id]
  return multiply(space.from, space.d50 ? multiply(D65_TO_D50, xyz) : xyz).map(
    space.transfer.encode,
  )
}

const rgbToHsl = ([r, g, b]) => {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const light = (max + min) / 2
  const delta = max - min
  let hue = 0
  let saturation = 0
  if (delta !== 0) {
    saturation =
      light === 0 || light === 1
        ? 0
        : (max - light) / Math.min(light, 1 - light)
    hue =
      max === r
        ? (g - b) / delta + (g < b ? 6 : 0)
        : max === g
          ? (b - r) / delta + 2
          : (r - g) / delta + 4
    hue *= 60
  }
  if (saturation < 0) {
    hue += 180
    saturation = Math.abs(saturation)
  }
  return [hue % 360, saturation * 100, light * 100]
}

const hslToRgb = ([hue, saturation, light]) => {
  const s = saturation / 100
  const l = light / 100
  const f = (n) => {
    const k = (n + hue / 30) % 12
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  return [f(0), f(8), f(4)]
}

const rgbToHwb = (rgb) => {
  const [hue] = rgbToHsl(rgb)
  return [hue, Math.min(...rgb) * 100, (1 - Math.max(...rgb)) * 100]
}

const hwbToRgb = ([hue, whiteness, blackness]) => {
  const w = whiteness / 100
  const b = blackness / 100
  if (w + b >= 1) {
    const gray = w / (w + b)
    return [gray, gray, gray]
  }
  return hslToRgb([hue, 100, 50]).map((value) => value * (1 - w - b) + w)
}

const channel = (key, label, min, max, step, options = {}) => ({
  key,
  label,
  max,
  min,
  percent: max,
  step,
  ...options,
})

const HUE = channel("h", "hue", 0, 360, 0.1, { hue: true })
const PERCENT = { digits: 1, unit: "%" }

const rgbChannels = (max, step, digits) =>
  ["r", "g", "b"].map((key, index) =>
    channel(key, ["red", "green", "blue"][index], 0, max, step, { digits }),
  )

const xyzChannels = ["x", "y", "z"].map((key) =>
  channel(key, key.toUpperCase(), 0, 1.1, 0.001, { digits: 4, percent: 1 }),
)

const colorFunction = (id) => ({
  channels: id.startsWith("xyz") ? xyzChannels : rgbChannels(1, 0.001, 4),
  css: id,
})

const fromRgb = (id, encode = (rgb) => rgb) => ({
  fromXyz: (xyz) => encode(xyzToRgb(id, xyz)),
  gamut: id,
})

const SPACES = {
  "a98-rgb": {
    ...colorFunction("a98-rgb"),
    ...fromRgb("a98-rgb"),
    toXyz: (rgb) => rgbToXyz("a98-rgb", rgb),
  },
  "display-p3": {
    ...colorFunction("display-p3"),
    ...fromRgb("display-p3"),
    toXyz: (rgb) => rgbToXyz("display-p3", rgb),
  },
  hex: {
    channels: rgbChannels(255, 1, 0),
    ...fromRgb("srgb", (rgb) => rgb.map((value) => value * 255)),
    toXyz: (rgb) =>
      rgbToXyz(
        "srgb",
        rgb.map((value) => value / 255),
      ),
  },
  hsl: {
    channels: [
      HUE,
      channel("s", "saturation", 0, 100, 0.1, PERCENT),
      channel("l", "lightness", 0, 100, 0.1, PERCENT),
    ],
    fn: "hsl",
    ...fromRgb("srgb", rgbToHsl),
    powerless: ([, saturation, light]) =>
      saturation < 0.01 || light < 0.01 || light > 99.99,
    toXyz: (hsl) => rgbToXyz("srgb", hslToRgb(hsl)),
  },
  hwb: {
    channels: [
      HUE,
      channel("w", "whiteness", 0, 100, 0.1, PERCENT),
      channel("b", "blackness", 0, 100, 0.1, PERCENT),
    ],
    fn: "hwb",
    ...fromRgb("srgb", rgbToHwb),
    powerless: ([, whiteness, blackness]) => whiteness + blackness > 99.99,
    toXyz: (hwb) => rgbToXyz("srgb", hwbToRgb(hwb)),
  },
  lab: {
    channels: [
      channel("l", "lightness", 0, 100, 0.1, { clamp: true, digits: 2 }),
      channel("a", "a", -125, 125, 0.1, { digits: 2, percent: 125 }),
      channel("b", "b", -125, 125, 0.1, { digits: 2, percent: 125 }),
    ],
    fn: "lab",
    fromXyz: xyzToLab,
    toXyz: labToXyz,
  },
  lch: {
    channels: [
      channel("l", "lightness", 0, 100, 0.1, { clamp: true, digits: 2 }),
      channel("c", "chroma", 0, 150, 0.1, { digits: 2 }),
      HUE,
    ],
    fn: "lch",
    fromXyz: (xyz) => toPolar(xyzToLab(xyz)),
    powerless: ([, chroma]) => chroma < 0.0015,
    toXyz: (lch) => labToXyz(toCartesian(lch)),
  },
  oklab: {
    channels: [
      channel("l", "lightness", 0, 1, 0.001, { digits: 4 }),
      channel("a", "a", -0.4, 0.4, 0.001, { digits: 4 }),
      channel("b", "b", -0.4, 0.4, 0.001, { digits: 4 }),
    ],
    fn: "oklab",
    fromXyz: xyzToOklab,
    toXyz: oklabToXyz,
  },
  oklch: {
    channels: [
      channel("l", "lightness", 0, 1, 0.001, { digits: 4 }),
      channel("c", "chroma", 0, 0.37, 0.001, { digits: 4, percent: 0.4 }),
      HUE,
    ],
    fn: "oklch",
    fromXyz: (xyz) => toPolar(xyzToOklab(xyz)),
    powerless: ([, chroma]) => chroma < 0.00004,
    toXyz: (lch) => oklabToXyz(toCartesian(lch)),
  },
  "prophoto-rgb": {
    ...colorFunction("prophoto-rgb"),
    ...fromRgb("prophoto-rgb"),
    toXyz: (rgb) => rgbToXyz("prophoto-rgb", rgb),
  },
  rec2020: {
    ...colorFunction("rec2020"),
    ...fromRgb("rec2020"),
    toXyz: (rgb) => rgbToXyz("rec2020", rgb),
  },
  rgb: {
    channels: rgbChannels(255, 1, 0),
    fn: "rgb",
    ...fromRgb("srgb", (rgb) => rgb.map((value) => value * 255)),
    toXyz: (rgb) =>
      rgbToXyz(
        "srgb",
        rgb.map((value) => value / 255),
      ),
  },
  "srgb-linear": {
    ...colorFunction("srgb-linear"),
    ...fromRgb("srgb-linear"),
    toXyz: (rgb) => rgbToXyz("srgb-linear", rgb),
  },
  xyz: { ...colorFunction("xyz"), fromXyz: (xyz) => xyz, toXyz: (xyz) => xyz },
  "xyz-d50": {
    ...colorFunction("xyz-d50"),
    fromXyz: (xyz) => multiply(D65_TO_D50, xyz),
    toXyz: (xyz) => multiply(D50_TO_D65, xyz),
  },
  "xyz-d65": {
    ...colorFunction("xyz-d65"),
    fromXyz: (xyz) => xyz,
    toXyz: (xyz) => xyz,
  },
}

export const COLOR_SPACES = Object.keys(SPACES)

const JND = 0.02
const MAP_EPSILON = 0.0001
const IN_GAMUT_EPSILON = 0.000001

const inRgbGamut = (rgb) =>
  rgb.every(
    (value) => value >= -IN_GAMUT_EPSILON && value <= 1 + IN_GAMUT_EPSILON,
  )

const oklchToXyz = (oklch) => SPACES.oklch.toXyz(oklch)

const clipToGamut = (id, oklch) => {
  const rgb = xyzToRgb(id, oklchToXyz(oklch)).map((value) =>
    Math.min(1, Math.max(0, value)),
  )
  return SPACES.oklch.fromXyz(rgbToXyz(id, rgb))
}

const deltaEOK = (one, two) => {
  const [l1, a1, b1] = toCartesian(one)
  const [l2, a2, b2] = toCartesian(two)
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2)
}

export const gamutMap = (id, oklch) => {
  const [lightness, chroma, hue] = oklch
  if (lightness >= 1) return [1, 0, hue]
  if (lightness <= 0) return [0, 0, hue]
  if (inRgbGamut(xyzToRgb(id, oklchToXyz(oklch)))) return oklch
  let current = oklch
  let clipped = clipToGamut(id, current)
  if (deltaEOK(clipped, current) < JND) return clipped
  let min = 0
  let max = chroma
  let minInGamut = true
  while (max - min > MAP_EPSILON) {
    const middle = (min + max) / 2
    current = [lightness, middle, hue]
    if (minInGamut && inRgbGamut(xyzToRgb(id, oklchToXyz(current)))) {
      min = middle
      continue
    }
    clipped = clipToGamut(id, current)
    const delta = deltaEOK(clipped, current)
    if (delta < JND) {
      if (JND - delta < MAP_EPSILON) break
      minInGamut = false
      min = middle
    } else {
      max = middle
    }
  }
  return clipped
}

const hueIndex = (space) => space.channels.findIndex((entry) => entry.hue)

export const toSpace = (id, oklch, previous) => {
  const space = SPACES[id]
  const mapped = space.gamut ? gamutMap(space.gamut, oklch) : oklch
  const coords = space.fromXyz(oklchToXyz(mapped)).map((value, index) => {
    const { clamp, max, min } = space.channels[index]
    return space.gamut || clamp ? Math.min(max, Math.max(min, value)) : value
  })
  const hue = hueIndex(space)
  if (hue !== -1) {
    if (space.powerless?.(coords)) {
      coords[hue] = id === "oklch" ? oklch[2] : (previous?.[hue] ?? 0)
    }
    coords[hue] = ((coords[hue] % 360) + 360) % 360
  }
  return coords
}

export const fromSpace = (id, coords) => {
  if (id === "oklch") return [...coords]
  const oklch = SPACES.oklch.fromXyz(SPACES[id].toXyz(coords))
  if (oklch[1] < 0.00004) oklch[2] = 0
  return oklch
}

const hexByte = (value) =>
  Math.round(Math.min(255, Math.max(0, value)))
    .toString(16)
    .padStart(2, "0")

export const formatColor = (id, coords, alpha = 1) => {
  const space = SPACES[id]
  const opacity = alpha < 1 ? round(alpha, 3) : undefined
  if (id === "hex") {
    return `#${[...coords, ...(opacity === undefined ? [] : [alpha * 255])]
      .map(hexByte)
      .join("")}`
  }
  const values = coords.map((value, index) => {
    const { digits = 0, hue, unit = "" } = space.channels[index]
    const number = hue
      ? space.powerless?.(coords)
        ? 0
        : round(value, 2) % 360
      : round(value, digits)
    return `${Object.is(number, -0) ? 0 : number}${unit}`
  })
  const body = `${values.join(" ")}${opacity === undefined ? "" : ` / ${opacity}`}`
  return space.css ? `color(${space.css} ${body})` : `${space.fn}(${body})`
}

const FUNCTIONS = {
  hsl: "hsl",
  hsla: "hsl",
  hwb: "hwb",
  lab: "lab",
  lch: "lch",
  oklab: "oklab",
  oklch: "oklch",
  rgb: "rgb",
  rgba: "rgb",
}

const ANGLE = { deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 }

const TOKEN = /^(-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|grad|rad|turn)?$/i

const readNumber = (token, entry) => {
  if (token.toLowerCase() === "none") return 0
  const match = TOKEN.exec(token)
  if (!match) return null
  const number = Number(match[1])
  const unit = match[2]?.toLowerCase()
  if (unit === "%") return (number / 100) * entry.percent
  if (unit) return entry.hue ? number * ANGLE[unit] : null
  return number
}

const readAlpha = (token) => {
  if (token === undefined) return 1
  const value = readNumber(token, { percent: 1 })
  return value === null ? null : Math.min(1, Math.max(0, value))
}

export const parseColor = (text) => {
  const value = text.trim()
  const hex = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.exec(value)
  if (hex) {
    const digits =
      hex[1].length < 6
        ? [...hex[1]].map((digit) => digit + digit)
        : hex[1].match(/../g)
    const bytes = digits.map((pair) => parseInt(pair, 16))
    return {
      alpha: bytes.length === 4 ? round(bytes[3] / 255, 3) : 1,
      coords: bytes.slice(0, 3),
      space: "hex",
    }
  }
  const call = /^([a-z-]+)\(([^()]*)\)$/i.exec(value)
  if (!call) return null
  const name = call[1].toLowerCase()
  let body = call[2].trim()
  let id = FUNCTIONS[name]
  if (name === "color") {
    const [space, ...rest] = body.split(/\s+/)
    id = space.toLowerCase() === "srgb" ? "srgb" : space.toLowerCase()
    if (!(id in SPACES) && id !== "srgb") return null
    if (SPACES[id] && !SPACES[id].css) return null
    body = rest.join(" ")
  }
  if (!id) return null
  const legacy = body.includes(",")
  const parts = legacy
    ? body.split(",").map((part) => part.trim())
    : body.split("/").map((part) => part.trim())
  const tokens = legacy ? parts.slice(0, 3) : parts[0].split(/\s+/)
  const alphaToken = legacy ? parts[3] : parts[1]
  if (tokens.length !== 3 || (!legacy && parts.length > 2)) return null
  const space = id === "srgb" ? SPACES["srgb-linear"] : SPACES[id]
  const coords = tokens.map((token, index) =>
    readNumber(token, space.channels[index]),
  )
  const alpha = readAlpha(alphaToken)
  if (coords.includes(null) || alpha === null) return null
  if (id === "srgb") {
    return { alpha, coords: coords.map((value) => value * 255), space: "rgb" }
  }
  return { alpha, coords, space: id }
}

const PLANE_CHROMA = 0.37
const PLANE_COLUMNS = 96
const PLANE_ROWS = 64
const PLANE_LINE_STEPS = 40
const PLANE_GAMUTS = [
  { dash: [], id: "srgb" },
  { dash: [4, 3], id: "display-p3" },
]

const clampUnit = (value) => Math.min(1, Math.max(0, value))

const [[, LA1, LB1], [, LA2, LB2], [, LA3, LB3]] = OKLAB_TO_LMS

const PLANE_MATRICES = {}

const planeMatrix = (id) =>
  (PLANE_MATRICES[id] ??= RGB[id].from.map((row) =>
    [0, 1, 2].map(
      (column) =>
        row[0] * LMS_TO_XYZ[0][column] +
        row[1] * LMS_TO_XYZ[1][column] +
        row[2] * LMS_TO_XYZ[2][column],
    ),
  ))

const planeLinear = (matrix, lightness, a, b, out) => {
  const l = (lightness + LA1 * a + LB1 * b) ** 3
  const m = (lightness + LA2 * a + LB2 * b) ** 3
  const s = (lightness + LA3 * a + LB3 * b) ** 3
  for (let channel = 0; channel < 3; channel++) {
    const row = matrix[channel]
    out[channel] = row[0] * l + row[1] * m + row[2] * s
  }
  return out
}

const maxChroma = (matrix, lightness, cos, sin) => {
  const linear = [0, 0, 0]
  let min = 0
  let max = PLANE_CHROMA
  for (let step = 0; step < 12; step++) {
    const middle = (min + max) / 2
    planeLinear(matrix, lightness, middle * cos, middle * sin, linear)
    if (inRgbGamut(linear)) min = middle
    else max = middle
  }
  return min
}

const LABELS = {
  blackness: "Blackness",
  blue: "Blue",
  chroma: "Chroma",
  green: "Green",
  hue: "Hue",
  lightness: "Lightness",
  red: "Red",
  saturation: "Saturation",
  whiteness: "Whiteness",
}

const INTERPOLATION = { hex: "srgb", rgb: "srgb" }

const displayOf = (id, entry, value) => {
  if (entry.hue) return `${round(value, 1)}°`
  if (entry.unit) return `${round(value, 1)}${entry.unit}`
  if ((id === "oklab" || id === "oklch") && entry.key === "l") {
    return `${round(value * 100, 1)}%`
  }
  return `${round(value, entry.step < 0.01 ? 3 : entry.step < 1 ? 1 : 0)}`
}

const alphaText = (value) => `${Math.round(value * 100)}%`

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
  #coords = [0.6, 0.1, 250]
  #space = "oklch"
  #controller
  #copied
  #observer
  #open = false
  #pointerOpen = false
  #valid = false
  #plane
  #planeBox
  #planeFrame
  #planeHue
  #timeout

  get input() {
    return this.querySelector(".ui-field input:not([type=range])")
  }

  get value() {
    return this.input?.value ?? ""
  }

  get oklch() {
    return this.#valid ? formatOklch(this.#color, this.#color.alpha) : ""
  }

  set value(value) {
    this.#write(value)
    this.#sync()
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
      (event) => {
        this.#syncEyedropper()
        this.#toggle(event)
      },
      { signal },
    )
    this.addEventListener("focusout", (event) => this.#leave(event), {
      signal,
    })
    this.addEventListener("pointerdown", (event) => this.#press(event), {
      signal,
    })
    this.addEventListener("pointermove", (event) => this.#drag(event), {
      signal,
    })
    for (const type of ["lostpointercapture", "pointerup"]) {
      this.addEventListener(type, (event) => this.#release(event), { signal })
    }
    this.#syncEyedropper()
    this.#configure()
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
    cancelAnimationFrame(this.#planeFrame)
    this.#planeFrame = undefined
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
    const color = this.#read(result.sRGBHex, false)
    if (!color) return null
    this.#render(color)
    if (this.#write(this.#format())) {
      this.#emit("input")
      this.#emit("change")
    }
    return this.value
  }

  get #alpha() {
    return !!this.querySelector('input[data-channel="alpha"]')
  }

  #trigger() {
    return this.querySelector('button[command="toggle-popover"]')
  }

  #sliders() {
    return this.querySelectorAll("input[type=range][data-channel]")
  }

  #channels() {
    return this.querySelectorAll(
      'input[type=range][data-channel]:not([data-channel="alpha"])',
    )
  }

  #select() {
    return this.querySelector(".ui-floating select")
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
      const color = this.#read(target.value, false)
      if (color) this.#render(color)
      return
    }
    const channel = target?.dataset?.channel
    if (!channel) return
    const color = {
      alpha: this.#color.alpha,
      coords: [...this.#coords],
      space: this.#space,
    }
    const index = [...this.#channels()].indexOf(target)
    if (channel === "alpha") color.alpha = Number(target.value)
    else if (index !== -1) color.coords[index] = Number(target.value)
    else return
    this.#render(color, target)
    if (this.#write(this.#format())) this.#emit("input")
  }

  #change(event) {
    const target = event.target
    if (target === this.input) {
      const color = this.#read(target.value, true)
      if (!color) {
        this.#invalid()
        return
      }
      this.#render(color)
      if (this.#write(this.#format())) this.#emit("input")
      return
    }
    if (target === this.#select() && target.value in SPACES) {
      const { C, H, L } = this.#color
      this.#render({
        alpha: this.#color.alpha,
        coords: toSpace(target.value, [L, C, H]),
        space: target.value,
      })
      if (this.#write(this.#format())) {
        this.#emit("input")
        this.#emit("change")
      }
      return
    }
    if (target?.dataset?.channel) this.#emit("change")
  }

  #read(text, switchSpace) {
    const parsed = parseColor(text)
    if (parsed && switchSpace) return parsed
    const color = parsed
      ? { ...this.#oklchOf(parsed), alpha: parsed.alpha }
      : readColor(text)
    if (!color) return null
    const { C, H, L, alpha } = color
    return {
      alpha,
      coords: toSpace(this.#space, [L, C, H], this.#coords),
      space: this.#space,
    }
  }

  #oklchOf({ coords, space }) {
    const [L, C, H] = fromSpace(space, coords)
    return { C, H: C < 0.00004 ? this.#color.H : H, L }
  }

  #leave(event) {
    const picker = this.querySelector(".ui-floating")
    const next = event.relatedTarget
    if (
      picker?.contains(event.target) &&
      next instanceof Node &&
      !picker.contains(next) &&
      next !== this.#trigger() &&
      picker.matches(":popover-open")
    ) {
      picker.hidePopover()
    }
  }

  #toggle(event) {
    this.#open = event.newState === "open"
    if (!this.#open) return
    this.#measure()
    this.#draw()
    this.#sliders()[0]?.focus({ preventScroll: this.#pointerOpen })
    this.#pointerOpen = false
  }

  #panel() {
    return this.querySelector(".ui-floating > .ui-panel")
  }

  #measure() {
    const canvas = this.#panel()?.querySelector("canvas")
    if (!canvas?.clientWidth) {
      this.#plane = undefined
      return
    }
    const ratio = globalThis.devicePixelRatio || 1
    canvas.width = Math.round(canvas.clientWidth * ratio)
    canvas.height = Math.round(canvas.clientHeight * ratio)
    const context = canvas.getContext("2d", { colorSpace: "display-p3" })
    if (!context) return
    const wide = context.getContextAttributes?.().colorSpace === "display-p3"
    const small = this.ownerDocument.createElement("canvas")
    small.width = PLANE_COLUMNS
    small.height = PLANE_ROWS
    const smallContext = small.getContext(
      "2d",
      wide ? { colorSpace: "display-p3" } : undefined,
    )
    this.#plane = {
      context,
      image: smallContext.createImageData(PLANE_COLUMNS, PLANE_ROWS),
      ratio,
      rtl: getComputedStyle(canvas).direction === "rtl",
      small,
      smallContext,
      target: wide ? "display-p3" : "srgb",
    }
    this.#planeHue = undefined
  }

  #press(event) {
    if (this.#trigger()?.contains(event.target)) this.#pointerOpen = true
    const panel = this.#panel()
    if (event.button !== 0 || !panel?.contains(event.target)) return
    event.preventDefault()
    panel.setPointerCapture(event.pointerId)
    this.#pick(event, panel.getBoundingClientRect())
  }

  #drag(event) {
    const panel = this.#panel()
    if (panel?.hasPointerCapture(event.pointerId)) {
      this.#pick(event, this.#planeBox ?? panel.getBoundingClientRect())
    }
  }

  #release(event) {
    const panel = this.#panel()
    if (event.target !== panel) return
    if (panel.hasPointerCapture(event.pointerId)) {
      panel.releasePointerCapture(event.pointerId)
      return
    }
    if (event.type === "lostpointercapture") {
      this.#planeBox = undefined
      this.#emit("change")
    }
  }

  #pick(event, box) {
    this.#planeBox = box
    const x = clampUnit((event.clientX - box.left) / box.width)
    const y = clampUnit((event.clientY - box.top) / box.height)
    const across = this.#plane?.rtl ? 1 - x : x
    const oklch = [1 - y, across * PLANE_CHROMA, this.#color.H]
    this.#render({
      alpha: this.#color.alpha,
      coords: toSpace(this.#space, oklch, this.#coords),
      space: this.#space,
    })
    if (this.#write(this.#format())) this.#emit("input")
  }

  #schedule() {
    if (this.#planeFrame || this.#planeHue === this.#color.H) return
    this.#planeFrame = requestAnimationFrame(() => {
      this.#planeFrame = undefined
      this.#draw()
    })
  }

  #draw() {
    const plane = this.#plane
    const hue = this.#color.H
    if (!plane || this.#planeHue === hue) return
    this.#planeHue = hue
    const { context, image, ratio, rtl, small, smallContext, target } = plane
    const { height, width } = context.canvas
    const matrix = planeMatrix(target)
    const encode = RGB[target].transfer.encode
    const cos = Math.cos((hue * Math.PI) / 180)
    const sin = Math.sin((hue * Math.PI) / 180)
    const linear = [0, 0, 0]
    const data = image.data
    let index = 0
    for (let row = 0; row < PLANE_ROWS; row++) {
      const lightness = 1 - (row + 0.5) / PLANE_ROWS
      for (let column = 0; column < PLANE_COLUMNS; column++) {
        const across = (column + 0.5) / PLANE_COLUMNS
        const chroma = (rtl ? 1 - across : across) * PLANE_CHROMA
        planeLinear(matrix, lightness, chroma * cos, chroma * sin, linear)
        data[index] = Math.round(encode(clampUnit(linear[0])) * 255)
        data[index + 1] = Math.round(encode(clampUnit(linear[1])) * 255)
        data[index + 2] = Math.round(encode(clampUnit(linear[2])) * 255)
        data[index + 3] = 255
        index += 4
      }
    }
    smallContext.putImageData(image, 0, 0)
    context.imageSmoothingEnabled = true
    context.shadowBlur = 0
    context.drawImage(small, 0, 0, width, height)
    context.lineWidth = 1.5 * ratio
    context.shadowBlur = 2 * ratio
    context.shadowColor = "oklch(0 0 0 / 0.6)"
    context.strokeStyle = "oklch(1 0 0 / 0.9)"
    for (const gamut of PLANE_GAMUTS) {
      const gamutMatrix = planeMatrix(gamut.id)
      context.setLineDash(gamut.dash.map((length) => length * ratio))
      context.beginPath()
      for (let step = 0; step <= PLANE_LINE_STEPS; step++) {
        const lightness = 1 - step / PLANE_LINE_STEPS
        const across =
          maxChroma(gamutMatrix, lightness, cos, sin) / PLANE_CHROMA
        const x = (rtl ? 1 - across : across) * width
        const y = (step / PLANE_LINE_STEPS) * height
        if (step === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.stroke()
    }
  }

  #format() {
    return formatColor(this.#space, this.#coords, this.#color.alpha)
  }

  #configure() {
    const space = SPACES[this.#space]
    const select = this.#select()
    if (select && select.value !== this.#space) select.value = this.#space
    this.#channels().forEach((slider, index) => {
      const entry = space.channels[index]
      if (!entry) return
      slider.min = `${entry.min}`
      slider.max = `${entry.max}`
      slider.step = `${entry.step}`
      slider.dataset.channel = entry.key
      const label = slider.closest(".ui-range")?.querySelector(".ui-label")
      if (label) {
        label.textContent =
          entry.label in LABELS
            ? this.#text(`${entry.label}-label`, LABELS[entry.label])
            : entry.label
      }
    })
  }

  #track(index) {
    const space = SPACES[this.#space]
    const entry = space.channels[index]
    const stops = [entry.min, entry.max].map((value) => {
      const coords = [...this.#coords]
      coords[index] = value
      return formatColor(this.#space, coords)
    })
    const method = `${INTERPOLATION[this.#space] ?? this.#space}${entry.hue ? " longer hue" : ""}`
    return `linear-gradient(var(--_to) in ${method}, ${stops.join(", ")})`
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
    if (value) value.textContent = this.#format()
    if (light) light.textContent = `${onLight}:1`
    if (dark) dark.textContent = `${onDark}:1`
    if (sr) {
      sr.textContent = this.#text("contrast-label", CONTRAST_LABEL)
        .replace("{light}", `${onLight}`)
        .replace("{dark}", `${onDark}`)
    }
  }

  #render({ alpha, coords, space }, skip) {
    const input = this.input
    if (space !== this.#space) {
      this.#space = space
      this.#configure()
    }
    this.#coords = coords
    this.#color = {
      ...this.#oklchOf({ coords, space }),
      alpha: this.#alpha ? alpha : 1,
    }
    this.style.setProperty(
      "--_indicator-bg-color",
      formatOklch(this.#color, this.#color.alpha),
    )
    this.#preview(this.#color)
    this.style.setProperty("--_l", `${this.#color.L}`)
    this.style.setProperty("--_c", `${this.#color.C}`)
    this.style.setProperty("--_h", `${this.#color.H}`)
    this.#valid = true
    this.style.setProperty("--_tint-alpha", "1")
    this.style.setProperty(
      "--_plane-x",
      `${clampUnit(this.#color.C / PLANE_CHROMA)}`,
    )
    this.style.setProperty("--_plane-y", `${this.#color.L}`)
    if (this.#open) this.#schedule()
    input?.setCustomValidity("")
    const entries = SPACES[this.#space].channels
    this.#channels().forEach((slider, index) => {
      const entry = entries[index]
      if (!entry) return
      const number = this.#coords[index]
      if (slider !== skip) slider.value = `${number}`
      slider.style.setProperty("--_track", this.#track(index))
      slider.setAttribute(
        "aria-valuetext",
        displayOf(this.#space, entry, number),
      )
      const output = slider.closest(".ui-range")?.querySelector(".ui-value")
      if (output) output.textContent = displayOf(this.#space, entry, number)
    })
    const opacity = this.querySelector('input[data-channel="alpha"]')
    if (opacity) {
      if (opacity !== skip) opacity.value = `${this.#color.alpha}`
      opacity.setAttribute("aria-valuetext", alphaText(this.#color.alpha))
      const output = opacity.closest(".ui-range")?.querySelector(".ui-value")
      if (output) output.textContent = alphaText(this.#color.alpha)
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
    const trigger = this.#trigger()
    if (trigger && trigger.disabled !== input.disabled) {
      trigger.disabled = input.disabled
    }
    const color = this.#read(input.value, true)
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
    this.#valid = false
    this.style.setProperty("--_tint-alpha", "0")
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
