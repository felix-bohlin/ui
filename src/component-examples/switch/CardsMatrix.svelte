<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Notifications</FieldLegend>
    <FieldGroup name="switch-cards-end" orientation="horizontal">
      <Switch card defaultChecked spread value="email">
        Email
        {#snippet endText()}A summary every morning.{/snippet}
      </Switch>
      <Switch card spread value="push" variant="elevated">
        Push
        {#snippet endText()}On this device only.{/snippet}
      </Switch>
      <Switch card spread value="sms" variant="tonal">
        SMS
        {#snippet endText()}For security alerts only.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Privacy</FieldLegend>
    <FieldGroup name="switch-cards-start" orientation="horizontal">
      <Switch card defaultChecked value="status">
        Online status
        {#snippet endText()}Others see when you're active.{/snippet}
      </Switch>
      <Switch card value="receipts" variant="elevated">
        Read receipts
        {#snippet endText()}Others see when you've read a message.{/snippet}
      </Switch>
      <Switch card value="search" variant="tonal">
        Profile search
        {#snippet endText()}People can find you by email.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
