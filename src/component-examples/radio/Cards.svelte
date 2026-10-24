<script lang="ts">
  import {
    Radio,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-cards">
      <Radio value="starter" checked card spread>
        Starter
        {#snippet endText()}For one person.{/snippet}
      </Radio>
      <Radio value="team" card spread>
        Team
        {#snippet endText()}Up to ten seats and shared folders.{/snippet}
      </Radio>
      <Radio value="enterprise" disabled card spread>
        Enterprise
        {#snippet endText()}Talk to sales.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
