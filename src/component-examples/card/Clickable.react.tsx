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
              Bassbook Gold
            </a>
          </h3>
        </CardHeader>
        <CardContent>Perks for bassists of every string count.</CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <h3>
            <a className="ui-card-link" href="#clickable">
              Bassbook news
            </a>
          </h3>
        </CardHeader>
        <CardContent>Every totally rad new feature in one place.</CardContent>
        <CardActions>
          <Button>Subscribe</Button>
        </CardActions>
      </Card>
    </>
  )
}
