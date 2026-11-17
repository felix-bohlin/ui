type Bounds = {
  max?: number | string | null
  min?: number | string | null
  step?: number | string | null
}

const decimalsOf = (value: number) => {
  const [digits, exponent = "0"] = String(value).split("e")
  return Math.max(0, (digits.split(".")[1]?.length ?? 0) - Number(exponent))
}

export const valueDecimals = ({ min, step }: Bounds) =>
  step === "any"
    ? undefined
    : Math.max(decimalsOf(Number(min ?? 0)), decimalsOf(Number(step ?? 1)))

export const middleValue = ({ max, min, step }: Bounds) => {
  const minValue = Number(min ?? 0)
  const maxValue = Math.max(minValue, Number(max ?? 100))
  const stepValue = step === "any" ? 0 : Number(step ?? 1)
  const middle = minValue + (maxValue - minValue) / 2
  if (!stepValue) return middle
  const stepped =
    minValue + Math.round((middle - minValue) / stepValue) * stepValue
  const value = stepped > maxValue ? stepped - stepValue : stepped
  return Number(value.toFixed(valueDecimals({ min, step })))
}

const numberFormat = (lang: string, options: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat(lang, options)
  } catch {
    return new Intl.NumberFormat("en", options)
  }
}

export const formatValue = (
  value: unknown,
  { lang, min, step }: Bounds & { lang?: string | null },
) => {
  const digits = valueDecimals({ min, step })
  return numberFormat(lang || "en", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: false,
  }).format(Number(value))
}
