<script lang="ts">
  import { Callout, CalloutContent, CalloutTitle } from "opui-css/svelte"
</script>

<Callout>
  <CalloutContent>
    <CalloutTitle>Note</CalloutTitle>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <CalloutTitle>Another Callout</CalloutTitle>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="#">Card</a> since they look very similar? For one,
      the Callout is a more focused component with different properties.
    </p>
  </CalloutContent>
</Callout>
