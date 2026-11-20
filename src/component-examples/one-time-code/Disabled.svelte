<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode for="one-time-code-disabled-1" label="Verification code">
  <input
    autocomplete="one-time-code"
    disabled
    id="one-time-code-disabled-1"
    inputmode="numeric"
    maxlength="6"
    name="code"
    pattern={"[0-9]{6}"}
    value="905"
  />
</OneTimeCode>
