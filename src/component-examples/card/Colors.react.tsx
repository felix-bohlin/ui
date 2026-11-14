import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
} from "opui-css/react"

export default function Colors() {
  return (
    <ul
      role="list"
      className="ui-layout-grid ui-stretch"
      style={{ "--_min-inline-size": "12rem" }}
    >
      <li>
        <Card variant="outlined">
          <CardHeader>
            <h3>Basic</h3>
            <p>For one lonely bassist</p>
          </CardHeader>
          <CardContent>€0 per month</CardContent>
          <CardActions>
            <Button>Choose Basic</Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card color="primary" variant="outlined">
          <CardHeader as="div">
            <hgroup>
              <h3>Gold</h3>
              <p>Up to 20 bandmates</p>
            </hgroup>
            <Chip label="Popular" size="small" />
          </CardHeader>
          <CardContent>€12 per bandmate per month</CardContent>
          <CardActions>
            <Button variant="filled">Choose Gold</Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardHeader>
            <h3>Platinum</h3>
            <p>For big bands and brass sections</p>
          </CardHeader>
          <CardContent>€24 per bandmate per month</CardContent>
          <CardActions>
            <Button>Choose Platinum</Button>
          </CardActions>
        </Card>
      </li>
    </ul>
  )
}
