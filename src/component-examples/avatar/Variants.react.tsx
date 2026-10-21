import { Avatar } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Avatar
        variant="rounded"
        src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?w=96&h=96&fit=crop&auto=format"
        alt="Jonas Berg"
      />

      <Avatar aria-label="Sam Quist" role="img" variant="squared">
        SQ
      </Avatar>

      <Avatar
        variant="squircle"
        src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?w=96&h=96&fit=crop&auto=format"
        alt="Sara Kim"
      />
    </>
  )
}
