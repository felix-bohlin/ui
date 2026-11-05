export const resetValue = (input: HTMLInputElement) => {
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = input.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.valueAsNumber
}

const numberOr = (
  value: number | string | false | null | undefined,
  fallback: number,
) => (value === false || value == null ? fallback : Number(value))

export const defaultValue = ({
  max,
  min,
  step,
}: {
  max?: number | string | false | null
  min?: number | string | false | null
  step?: number | string | false | null
}) => {
  const minValue = numberOr(min, 0)
  const maxValue = Math.max(minValue, numberOr(max, 100))
  const stepValue = step === "any" ? 0 : numberOr(step, 1)
  const middle = minValue + (maxValue - minValue) / 2
  if (!stepValue) return middle
  const stepped =
    minValue + Math.round((middle - minValue) / stepValue) * stepValue
  return stepped > maxValue ? stepped - stepValue : stepped
}
