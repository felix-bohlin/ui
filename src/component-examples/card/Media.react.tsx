import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "opui-css/react"

export default function Media() {
  return (
    <ul
      role="list"
      className="ui-layout-grid ui-stretch"
      style={{ "--_min-inline-size": "16rem" }}
    >
      <li>
        <Card variant="outlined">
          <img
            alt="Green cliffs and a winding road under a cloudy sky"
            height="450"
            loading="lazy"
            src="https://picsum.photos/id/1018/800/450"
            width="800"
          />
          <CardHeader>
            <p>Norway</p>
            <h3>Lofoten by bike</h3>
            <p>Six days along the coast</p>
          </CardHeader>
          <CardContent>
            Ride from Å to Svolvær with your luggage sent ahead, and sleep in
            fishing cabins on the water.
          </CardContent>
          <CardActions>
            <Button>Save</Button>
            <Button variant="filled">Book</Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardHeader>
            <p>Field notes</p>
            <h3>A week in the mountains</h3>
          </CardHeader>
          <img
            alt="Yellow tents in a snowy mountain camp"
            height="450"
            loading="lazy"
            src="https://picsum.photos/id/1036/800/450"
            style={{ aspectRatio: "2 / 1" }}
            width="800"
          />
          <CardContent>
            Base camp sat at 3,200 meters. The image is cropped to 2:1 with{" "}
            <code>aspect-ratio</code>.
          </CardContent>
        </Card>
      </li>
    </ul>
  )
}
