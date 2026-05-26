// Using the helper
window.showToast({
  title: "Triggered from JS!",
  description: "With an optional description",
  severity: "success",
  duration: "3000ms",
})

// Or using native CommandEvent
const btn = document.createElement("button")
btn.setAttribute("data-title", "Triggered from JS!")
btn.setAttribute("data-description", "With an optional description")
btn.setAttribute("data-severity", "success")
btn.setAttribute("data-duration", "3000ms")
document.getElementById("toast-manager").dispatchEvent(
  new CommandEvent("command", {
    command: "--show-toast",
    source: btn,
  }),
)
