import type { ColumnProps as Props } from "./types.react"

export default function TableColumn({ style, width, ...rest }: Props) {
  const widthStyle = width
    ? width.includes(":")
      ? Object.fromEntries(
          width
            .split(";")
            .filter((declaration) => declaration.includes(":"))
            .map((declaration) => {
              const [name, ...value] = declaration.split(":")
              const property = name.trim()
              return [
                property.startsWith("--")
                  ? property
                  : property.replace(/-([a-z])/g, (_, char) =>
                      char.toUpperCase(),
                    ),
                value.join(":").trim(),
              ]
            }),
        )
      : { width }
    : undefined

  return (
    <col
      style={widthStyle || style ? { ...widthStyle, ...style } : undefined}
      {...rest}
    />
  )
}
