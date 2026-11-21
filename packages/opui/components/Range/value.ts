type Bound = number | string | false | null

type Bounds = {
  max?: Bound
  min?: Bound
  step?: Bound
}

const numberOr = (value: Bound | undefined, fallback: number) =>
  value === false || value == null ? fallback : Number(value)

const decimalsOf = (value: number) => {
  const [digits, exponent = "0"] = String(value).split("e")
  return Math.max(0, (digits.split(".")[1]?.length ?? 0) - Number(exponent))
}

export const valueDecimals = ({ min, step }: Bounds) =>
  step === "any"
    ? undefined
    : Math.max(decimalsOf(numberOr(min, 0)), decimalsOf(numberOr(step, 1)))

export const middleValue = ({ max, min, step }: Bounds) => {
  const minValue = numberOr(min, 0)
  const maxValue = Math.max(minValue, numberOr(max, 100))
  const stepValue = step === "any" ? 0 : numberOr(step, 1)
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
  { lang, min, step }: Bounds & { lang?: string | false | null },
) => {
  const digits = valueDecimals({ min, step })
  return numberFormat(lang || "en", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: false,
  }).format(Number(value))
}
