<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  label="Verification code"
  endText="The code expires in 10 minutes."
  name="code"
  required
/>
