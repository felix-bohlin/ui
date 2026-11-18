<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="That code has expired. Request a new one."
  error
  label="Verification code"
  name="code"
  required
  value="482193"
/>
