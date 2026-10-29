"use client"

import { useEffect, useState } from "react"
import { Progress } from "opui-css/react"

export default function Determinate() {
  const [value, setValue] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => (value >= 100 ? 10 : value + 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Progress
      aria-label="Uploading"
      id="progress-determinate-1"
      max="100"
      value={value}
    />
  )
}
