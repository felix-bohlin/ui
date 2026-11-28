<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="That code has expired. Request a new one."
  for="one-time-code-validation-1"
  label="Verification code"
>
  <input
    aria-describedby="one-time-code-validation-1-end-text"
    aria-invalid="true"
    autocomplete="one-time-code"
    id="one-time-code-validation-1"
    inputmode="numeric"
    maxlength="6"
    name="code"
    pattern={"[0-9]{6}"}
    required
    value="482193"
  />
</OneTimeCode>
