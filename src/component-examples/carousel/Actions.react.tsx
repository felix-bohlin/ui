import { Button, Card, Carousel } from "opui-css/react"

const plans = [
  {
    action: "Choose Basic",
    description: "For personal projects.",
    title: "Basic",
  },
  {
    action: "Contact sales",
    description: "For large organisations.",
    title: "Enterprise",
  },
  { action: "Choose Pro", description: "For growing teams.", title: "Pro" },
  { action: "Choose Team", description: "For small teams.", title: "Team" },
]

export default function Actions() {
  return (
    <Carousel buttons="outside" label="Plans" perView={2}>
      {plans.map(({ action, description, title }) => (
        <li key={title}>
          <Card
            variant="outlined"
            header={
              <>
                <h3>{title}</h3>
                <p>{description}</p>
              </>
            }
            actions={<Button variant="filled">{action}</Button>}
          />
        </li>
      ))}
    </Carousel>
  )
}
