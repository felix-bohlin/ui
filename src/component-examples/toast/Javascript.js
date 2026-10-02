import { dismiss, toast } from "opui-css/css/js/toast.js"

const saving = toast("Saving…", { persistent: true })

try {
  await save()
  toast("Changes saved", { severity: "success" })
} catch (error) {
  toast("Couldn't save", { description: error.message, severity: "critical" })
} finally {
  dismiss(saving)
}
