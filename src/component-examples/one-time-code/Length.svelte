<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode label="PIN" length={4} name="pin" />
<OneTimeCode grouped label="Backup code" length={8} name="backup-code" />
