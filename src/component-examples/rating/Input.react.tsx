"use client"

import { useState } from "react"
import { Rating } from "opui-css/react"

export default function Input() {
  const [rating, setRating] = useState(3)

  return (
    <Rating
      label="Your rating"
      name="review"
      onChange={(event) =>
        setRating(Number((event.target as HTMLInputElement).value))
      }
      value={rating}
    />
  )
}
