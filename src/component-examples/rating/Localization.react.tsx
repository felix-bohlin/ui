"use client"

import { Rating } from "opui-css/react"

const starLabel = (value: number) =>
  value === 1 ? "نجمة واحدة" : value === 2 ? "نجمتان" : `${value} نجوم`

export default function Localization() {
  return (
    <div className="ui-layout-column" dir="rtl" lang="ar">
      <Rating defaultValue={3.5} label="التقييم 3.5 من 5" />
      <Rating
        clearLabel="بدون تقييم"
        defaultValue={4}
        label="قيّم المنتج"
        name="rating-ar"
        starLabel={starLabel}
      />
    </div>
  )
}
