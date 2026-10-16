import { cx } from "../cx"
import type { Props } from "./types.react"

export default function BarChart({
  caption,
  className,
  focusable,
  format = String,
  label,
  max,
  min,
  rows,
  series,
  size,
  style,
  children,
  ...rest
}: Props) {
  const values = rows?.flatMap((row) => row.values) ?? []
  const chartMax =
    max ?? (values.length > 0 ? Math.max(0, ...values) : undefined)
  const chartMin = min ?? Math.min(0, ...values)
  const tabIndex = (focusable ?? (series?.length ?? 0) > 1) ? 0 : undefined
  const vars = {
    ...(chartMax !== undefined ? { "--max": chartMax } : {}),
    ...(chartMin !== 0 ? { "--min": chartMin } : {}),
  }

  return (
    <table
      className={cx(["ui-bar-chart", size && `ui-${size}`, className])}
      style={
        chartMax !== undefined || chartMin !== 0 ? { ...vars, ...style } : style
      }
      {...rest}
    >
      {caption && <caption>{caption}</caption>}
      {series && series.length > 0 && (
        <thead>
          <tr>
            {label ? <th scope="col">{label}</th> : <td />}
            {series.map((name, index) => (
              <th key={index} scope="col">
                {name}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {rows && rows.length > 0 && (
        <tbody>
          {rows.map((row, index) => (
            <tr className={cx([row.color && `ui-${row.color}`])} key={index}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  style={{ "--value": value }}
                  tabIndex={tabIndex}
                >
                  {format(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
      {children}
    </table>
  )
}
