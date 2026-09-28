import { toast } from "opui-css/toast"

toast.promise(fetch("/api/profile", { body, method: "POST" }), {
  error: "Could not save profile",
  loading: "Saving profile…",
  success: "Profile saved",
})

const saving = toast("Saving profile…", { severity: "loading" })
saving.update({ severity: "success", title: "Profile saved" })
