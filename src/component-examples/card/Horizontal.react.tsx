import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "opui-css/react"

export default function Horizontal() {
  return (
    <Card orientation="horizontal" variant="outlined">
      <img
        alt="A deep blue fjord between steep mountains"
        height="450"
        loading="lazy"
        src="https://picsum.photos/id/1015/800/450"
        width="800"
      />
      <CardHeader>
        <p>Norway</p>
        <h3>Fjord cruise from Bergen</h3>
        <p>Three nights, from 6 June</p>
      </CardHeader>
      <CardContent>
        Sail the Sognefjord with stops in Flåm and Balestrand. Cabins have a
        window on the water.
      </CardContent>
      <CardActions>
        <Button variant="filled">Book</Button>
      </CardActions>
    </Card>
  )
}
