<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="form-field-group-1-description">
    <FieldLegend>Plan</FieldLegend>
    <FieldDescription id="form-field-group-1-description"
      >You can change your plan at any time.</FieldDescription
    >
    <FieldGroup>
      <Radio name="plan" value="starter">Starter</Radio>
      <Radio name="plan" value="team">Team</Radio>
      <Radio name="plan" value="business">Business</Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset aria-describedby="form-field-group-2-description">
    <FieldLegend>Add-ons</FieldLegend>
    <FieldDescription id="form-field-group-2-description"
      >Billed monthly with your plan.</FieldDescription
    >
    <FieldGroup>
      <Checkbox name="add-ons" value="backups">
        Backups
        {#snippet endText()}Daily snapshots, kept for 30 days.{/snippet}
      </Checkbox>
      <Checkbox name="add-ons" value="encryption">
        Encryption
        {#snippet endText()}Encrypt your files with your own keys.{/snippet}
      </Checkbox>
      <Checkbox name="add-ons" value="single-sign-on">
        Single sign-on
        {#snippet endText()}Sign in with your company account.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
