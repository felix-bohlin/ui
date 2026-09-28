import { toast } from "opui-css/toast"

const response = await fetch("/api/profile", { body, method: "POST" })

if (response.ok) {
  toast("Profile saved", { severity: "success" })
} else {
  toast("Could not save profile", {
    description: "Please try again in a moment.",
    severity: "critical",
  })
}
