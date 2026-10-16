import { Stepper } from "opui-css/react"

export default function CompletedLabel() {
  return (
    <>
      <Stepper
        current={1}
        dir="rtl"
        items={[{ label: "السلة" }, { label: "الشحن" }, { label: "الدفع" }]}
        label="خطوات الدفع"
        lang="ar"
      />
      <style>{`
        .ui-stepper:lang(ar) {
          --_completed-label: "مكتمل: ";
        }
      `}</style>
    </>
  )
}
