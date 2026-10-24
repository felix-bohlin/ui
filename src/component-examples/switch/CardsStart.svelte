<script lang="ts">
  import {
    Switch,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Notifications</FieldLegend>
    <FieldGroup name="switch-cards-start">
      <Switch value="email" checked card>
        Email
        {#snippet endText()}A summary of each day.{/snippet}
      </Switch>
      <Switch value="push" card>
        Push
        {#snippet endText()}Right when something happens.{/snippet}
      </Switch>
      <Switch value="digest" card>
        Weekly digest
        {#snippet endText()}Every Monday morning.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
