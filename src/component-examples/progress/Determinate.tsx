import { onSettled } from "solid-js"
import { Progress } from "opui-css/solid"

export default function Example() {
  onSettled(() => {
    const progress = document.querySelector<HTMLProgressElement>(
      "#determinate-progress",
    )
    if (progress) {
      const interval = setInterval(() => {
        if (progress.value >= 100) {
          progress.value = 10
        } else {
          progress.value += 10
        }
      }, 3000)
      return () => clearInterval(interval)
    }
  })

  return <Progress id="determinate-progress" max="100" value="10" />
}
