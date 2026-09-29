import { Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card
      variant="outlined"
      header={
        <>
          <p>Blog</p>
          <h3>My ultra-great blog post</h3>
          <p>Please read it.</p>
        </>
      }
    />
  )
}
