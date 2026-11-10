<script lang="ts">
  import {
    Button,
    Checkbox,
    Divider,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
    Range,
    Select,
    Switch,
    Textarea,
    TextField,
  } from "opui-css/svelte"

  const roleItems = [
    { label: "Designer", value: "design" },
    { label: "Developer", value: "dev" },
    { label: "Manager", value: "manager" },
  ]
</script>

<Form id="form-kitchen-sink-1">
  <Fieldset aria-describedby="form-kitchen-sink-2-description">
    <FieldLegend>User profile</FieldLegend>
    <FieldDescription id="form-kitchen-sink-2-description">
      Please provide your basic contact details.
    </FieldDescription>
    <FieldGroup>
      <TextField
        autocomplete="name"
        label="Full name"
        placeholder="Ada Lovelace"
        required
      />
      <TextField
        autocomplete="email"
        label="Email address"
        placeholder="name@example.com"
        required
        type="email"
      />
      <Select items={roleItems} label="Role" />
    </FieldGroup>
  </Fieldset>
  <Divider />
  <Fieldset aria-describedby="form-kitchen-sink-3-description">
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription id="form-kitchen-sink-3-description">
      Configure how you want to receive updates.
    </FieldDescription>
    <FieldGroup>
      <Switch defaultChecked name="email_notifs">Email notifications</Switch>
      <Switch name="sms_notifs">SMS notifications</Switch>
    </FieldGroup>
  </Fieldset>
  <Divider />
  <Fieldset aria-describedby="form-kitchen-sink-4-description">
    <FieldLegend>Theme preference</FieldLegend>
    <FieldDescription id="form-kitchen-sink-4-description"
      >Select your preferred visual style.</FieldDescription
    >
    <FieldGroup name="theme">
      <Radio defaultChecked value="light">Light theme</Radio>
      <Radio value="dark">Dark theme</Radio>
      <Radio value="system">System default</Radio>
    </FieldGroup>
  </Fieldset>
  <Divider />
  <Fieldset aria-describedby="form-kitchen-sink-5-description">
    <FieldLegend>Experience level</FieldLegend>
    <FieldDescription id="form-kitchen-sink-5-description"
      >How many years of experience do you have?</FieldDescription
    >
    <FieldGroup>
      <Range
        label="Professional experience"
        max="20"
        min="0"
        startText="Drag the slider to match your total tenure."
        step="1"
        value="5"
      />
    </FieldGroup>
  </Fieldset>
  <Divider />
  <Fieldset aria-describedby="form-kitchen-sink-6-description">
    <FieldLegend>Additional info</FieldLegend>
    <FieldDescription id="form-kitchen-sink-6-description"
      >Anything else we should know?</FieldDescription
    >
    <FieldGroup>
      <Textarea
        label="Biography"
        name="biography"
        placeholder="Tell us about yourself..."
        rows={4}
      />
    </FieldGroup>
  </Fieldset>
  <Divider />
  <Fieldset>
    <FieldLegend>Legal</FieldLegend>
    <FieldGroup>
      <Checkbox name="terms" required>
        I agree to the terms and conditions
        {#snippet endText()}You can withdraw your consent at any time.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Divider />
  <FieldGroup>
    <Button>Cancel</Button>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
