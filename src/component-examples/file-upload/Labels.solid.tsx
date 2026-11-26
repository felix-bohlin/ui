/** @jsxImportSource @solidjs/web */
import { FileUpload } from "opui-css/solid"

export default function Labels() {
  return (
    <FileUpload
      accept="image/*"
      description="Eller släpp dem här. PNG eller JPG."
      items={[
        {
          label: "kinga-headstock.png",
          preview: "/photos/kinga-headstock.png",
          progress: 0.3,
          state: "uploading",
          value: "kinga",
        },
      ]}
      label="Välj foton"
      lang="sv"
      multiple
      progressLabel="Laddar upp {label}"
      removeLabel="Ta bort {label} från listan"
    />
  )
}
