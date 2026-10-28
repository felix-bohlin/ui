<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  label="Verification code"
  endText="Enter all 6 digits."
  error
  name="code"
  required
  value="4821"
/>
