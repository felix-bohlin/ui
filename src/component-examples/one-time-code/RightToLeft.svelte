<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<div dir="rtl" lang="ar">
  <OneTimeCode
    label="رمز التحقق"
    name="code"
    pattern={"[0-9٠-٩۰-۹]{6}"}
    defaultValue="905113"
  />
</div>
