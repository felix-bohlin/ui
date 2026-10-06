import { createSignal, onSettled } from "solid-js"
import { Progress } from "opui-css/solid"

export default function Example() {
  const [value, setValue] = createSignal(10)

  onSettled(() => {
    const interval = setInterval(() => {
      setValue((value) => (value >= 100 ? 10 : value + 10))
    }, 3000)
    return () => clearInterval(interval)
  })

  return <Progress id="determinate-progress" max="100" value={value()} />
}
