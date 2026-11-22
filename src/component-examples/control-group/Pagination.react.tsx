import { Button, ControlGroup } from "opui-css/react"

export default function Pagination() {
  return (
    <nav aria-label="Pagination">
      <ControlGroup size="small" variant="outlined">
        <Button disabled href="#pagination">
          Previous
        </Button>
        <Button aria-current="page" href="#pagination">
          1
        </Button>
        <Button href="#pagination">2</Button>
        <Button href="#pagination">3</Button>
        <Button href="#pagination">4</Button>
        <Button href="#pagination">5</Button>
        <Button href="#pagination">Next</Button>
      </ControlGroup>
    </nav>
  )
}
