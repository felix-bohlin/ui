import { Rating } from "opui-css/react"

const starLabel = {
  few: "{count} نجوم",
  one: "نجمة واحدة",
  other: "{count} نجمة",
  two: "نجمتان",
}

export default function Localization() {
  return (
    <div className="ui-layout-column" dir="rtl" lang="ar">
      <Rating defaultValue={3.5} label="التقييم 3.5 من 5" />
      <Rating
        clearLabel="بدون تقييم"
        defaultValue={4}
        label="قيّم المنتج"
        lang="ar"
        name="rating-ar"
        starLabel={starLabel}
      />
    </div>
  )
}
