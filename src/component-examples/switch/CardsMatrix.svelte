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
    <FieldGroup orientation="horizontal">
      <Switch card defaultChecked name="switch-cards-end" spread value="email">
        Email
        {#snippet endText()}A summary every morning.{/snippet}
      </Switch>
      <Switch
        card
        name="switch-cards-end"
        spread
        value="push"
        variant="elevated"
      >
        Push
        {#snippet endText()}On this device only.{/snippet}
      </Switch>
      <Switch card name="switch-cards-end" spread value="sms" variant="tonal">
        SMS
        {#snippet endText()}For security alerts only.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Privacy</FieldLegend>
    <FieldGroup orientation="horizontal">
      <Switch card defaultChecked name="switch-cards-start" value="status">
        Online status
        {#snippet endText()}Others see when you're active.{/snippet}
      </Switch>
      <Switch
        card
        name="switch-cards-start"
        value="receipts"
        variant="elevated"
      >
        Read receipts
        {#snippet endText()}Others see when you've read a message.{/snippet}
      </Switch>
      <Switch card name="switch-cards-start" value="search" variant="tonal">
        Profile search
        {#snippet endText()}People can find you by email.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
