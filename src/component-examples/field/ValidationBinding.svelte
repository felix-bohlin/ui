<script lang="ts">
  import { Field } from "opui-css/svelte"

  let username = $state("holly")
  let invalid = $derived(/[^a-z0-9]/i.test(username))
</script>

<Field
  endText={invalid
    ? "Use only letters and numbers."
    : "Letters and numbers, shown on your profile."}
  for="field-validation-binding-1"
  label="Username"
>
  <input
    aria-describedby="field-validation-binding-1-end-text"
    aria-invalid={invalid ? "true" : undefined}
    id="field-validation-binding-1"
    name="field-validation-binding"
    bind:value={username}
    defaultValue="holly"
  />
</Field>
