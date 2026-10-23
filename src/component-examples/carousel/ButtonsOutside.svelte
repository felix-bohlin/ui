<script lang="ts">
  import {
    Button,
    Card,
    CardActions,
    CardHeader,
    Carousel,
  } from "opui-css/svelte"

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
</script>

<Carousel aria-label="Plans" buttons="outside" itemsPerView={2}>
  {#each plans as { action, description, title } (title)}
    <li>
      <Card variant="outlined">
        <CardHeader>
          <h3>{title}</h3>
          <p>{description}</p>
        </CardHeader>
        <CardActions>
          <Button variant="filled">{action}</Button>
        </CardActions>
      </Card>
    </li>
  {/each}
</Carousel>
