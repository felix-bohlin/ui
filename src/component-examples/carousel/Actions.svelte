<script lang="ts">
  import { Button, Card, Carousel } from "opui-css/svelte"

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

<Carousel buttons="outside" label="Plans" perView={2}>
  {#each plans as { action, description, title } (title)}
    <li>
      <Card variant="outlined">
        {#snippet header()}
          <h3>{title}</h3>
          <p>{description}</p>
        {/snippet}
        {#snippet actions()}
          <Button variant="filled">{action}</Button>
        {/snippet}
      </Card>
    </li>
  {/each}
</Carousel>
