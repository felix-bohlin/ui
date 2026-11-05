/** @jsxImportSource @solidjs/web */
import { createSignal, onSettled } from "solid-js"
import { Progress } from "opui-css/solid"

export default function Determinate() {
  const [value, setValue] = createSignal(10)

  onSettled(() => {
    const interval = setInterval(() => {
      setValue((value) => (value >= 100 ? 10 : value + 10))
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <Progress
      aria-label="Uploading"
      id="progress-determinate-1"
      max="100"
      value={value()}
    />
  )
}
