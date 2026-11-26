<script lang="ts">
  import { Card, CardContent, CardHeader, Chip } from "opui-css/svelte"
</script>

<Card as="article" variant="outlined">
  <CardHeader as="header">
    <hgroup>
      <p>Engineering</p>
      <h3>How we cut our build time in half</h3>
      <p>Lena Ek, 12 March</p>
    </hgroup>
    <Chip label="5 min read" size="small" />
  </CardHeader>
  <CardContent>
    Caching the dependency install and splitting the test suite took our builds
    from twelve minutes to five.
  </CardContent>
</Card>
