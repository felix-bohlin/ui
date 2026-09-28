import { Button } from "opui-css/solid"

export default function Example() {
  const showToast = () => {
    const w = window as Window & {
      showToast?: (options: Record<string, string>) => void
    }
    w.showToast?.({
      title: "Triggered from JS!",
      description: "With an optional description",
      severity: "success",
      duration: "3000ms",
    })
  }

  return (
    <Button id="js-trigger" onClick={showToast}>
      Trigger from JS
    </Button>
  )
}
