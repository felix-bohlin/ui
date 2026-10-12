import { Card, Carousel } from "opui-css/react"

const places = ["Kyoto", "Lima", "Lisbon"]

export default function GridLayout() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--size-4)",
        gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
      }}
    >
      <div>
        <Carousel label="Destinations" markers>
          {places.map((title) => (
            <li key={title}>
              <Card
                variant="tonal"
                header={
                  <>
                    <p>Destination</p>
                    <h3>{title}</h3>
                  </>
                }
              />
            </li>
          ))}
        </Carousel>
      </div>
      <hgroup>
        <h3>Spring trips</h3>
        <p>Three cities, two weeks, one carry-on.</p>
      </hgroup>
    </div>
  )
}
