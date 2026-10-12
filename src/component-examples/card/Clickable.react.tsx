import { Button, Card } from "opui-css/react"

export default function Clickable() {
  return (
    <>
      <Card
        variant="outlined"
        header={
          <h3>
            <a className="ui-card-link" href="#clickable">
              Pricing
            </a>
          </h3>
        }
        content="Plans for any team. Click anywhere on the card."
      />

      <Card
        variant="outlined"
        header={
          <h3>
            <a className="ui-card-link" href="#clickable">
              Changelog
            </a>
          </h3>
        }
        content="Every release in one place."
        actions={<Button>Subscribe</Button>}
      />
    </>
  )
}
