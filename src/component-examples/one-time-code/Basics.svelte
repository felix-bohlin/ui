<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="The code expires in 10 minutes."
  label="Verification code"
  name="code"
  required
/>
