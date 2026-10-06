import { onMounted } from "vue"
import { Progress } from "opui-css/solid"

onMounted(() => {
  const progress = document.querySelector<HTMLProgressElement>(
    "#determinate-progress",
  )
  if (progress) {
    setInterval(() => {
      if (progress.value >= 100) {
        progress.value = 10
      } else {
        progress.value += 10
      }
    }, 3000)
  }
})

export default function Example() {
  return <Progress id="determinate-progress" max="100" value="10" />
}
