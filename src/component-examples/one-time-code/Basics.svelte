<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="The code expires in 10 minutes."
  for="one-time-code-basics-1"
  label="Verification code"
>
  <input
    aria-describedby="one-time-code-basics-1-end-text"
    autocomplete="one-time-code"
    id="one-time-code-basics-1"
    inputmode="numeric"
    maxlength="6"
    name="code"
    pattern={"[0-9]{6}"}
    required
  />
</OneTimeCode>
