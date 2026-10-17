<script lang="ts">
  import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
  } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardHeader>
    <h3><a class="ui-card-link" href="#clickable">Pricing</a></h3>
  </CardHeader>
  <CardContent>Plans for any team. Click anywhere on the card.</CardContent>
</Card>

<Card variant="outlined">
  <CardHeader>
    <h3><a class="ui-card-link" href="#clickable">Changelog</a></h3>
  </CardHeader>
  <CardContent>Every release in one place.</CardContent>
  <CardActions>
    <Button>Subscribe</Button>
  </CardActions>
</Card>
