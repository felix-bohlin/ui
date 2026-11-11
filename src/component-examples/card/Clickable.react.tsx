import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "opui-css/react"

export default function Clickable() {
  return (
    <>
      <Card variant="outlined">
        <CardHeader>
          <h3>
            <a className="ui-card-link" href="#clickable">
              Pricing
            </a>
          </h3>
        </CardHeader>
        <CardContent>Plans for teams of every size.</CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <h3>
            <a className="ui-card-link" href="#clickable">
              Changelog
            </a>
          </h3>
        </CardHeader>
        <CardContent>Every release in one place.</CardContent>
        <CardActions>
          <Button>Subscribe</Button>
        </CardActions>
      </Card>
    </>
  )
}
