<script lang="ts">
  import { Form } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldDescription } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { TextField } from "@opui/svelte"
  import { Select } from "@opui/svelte"
  import { Switch } from "@opui/svelte"
  import { Radio } from "@opui/svelte"
  import { Textarea } from "@opui/svelte"
  import { Checkbox } from "@opui/svelte"
  import { Range } from "@opui/svelte"
  import { Button } from "@opui/svelte"
  import { Divider } from "@opui/svelte"

  const roleItems = [
    { text: "Developer", value: "dev" },
    { text: "Designer", value: "design" },
    { text: "Manager", value: "manager" },
  ]

  let emailNotifs = $state(true)
  let smsNotifs = $state(false)
  let theme = $state("light")
  let experience = $state(5)
</script>

<Form id="kitchen-sink-example-row">
  <FieldSet>
    <FieldLegend>User Profile</FieldLegend>
    <FieldDescription>
      Please provide your basic contact details.
    </FieldDescription>
    <FieldGroup>
      <TextField placeholder="Jane Doe" required spread>
        {#snippet label()}Full Name{/snippet}
      </TextField>
      <TextField type="email" placeholder="jane@example.com" required spread>
        {#snippet label()}Email Address{/snippet}
      </TextField>
      <Select items={roleItems} spread>
        {#snippet label()}Role{/snippet}
      </Select>
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldSet>
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription>
      Configure how you want to receive updates.
    </FieldDescription>
    <FieldGroup name="notifications">
      <Switch bind:checked={emailNotifs} name="email_notifs" spread
        >Email Notifications</Switch
      >
      <Switch bind:checked={smsNotifs} name="sms_notifs" spread
        >SMS Notifications</Switch
      >
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldSet>
    <FieldLegend>Theme Preference</FieldLegend>
    <FieldDescription>Select your preferred visual style.</FieldDescription>
    <FieldGroup direction="row" name="theme">
      <Radio bind:group={theme} value="light">Light Theme</Radio>
      <Radio bind:group={theme} value="dark">Dark Theme</Radio>
      <Radio bind:group={theme} value="system">System Default</Radio>
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldSet>
    <FieldLegend>Experience Level</FieldLegend>
    <FieldDescription
      >How many years of experience do you have?</FieldDescription
    >
    <FieldGroup>
      <Range min="0" max="20" step="1" bind:value={experience} spread>
        Professional Experience
        {#snippet startText()}Drag the slider to match your total tenure.{/snippet}
      </Range>
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldSet>
    <FieldLegend>Additional Info</FieldLegend>
    <FieldDescription>Anything else we should know?</FieldDescription>
    <FieldGroup name="details">
      <Textarea placeholder="Tell us about yourself..." rows={4} spread>
        {#snippet label()}Biography{/snippet}
      </Textarea>
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldSet>
    <FieldLegend>Legal</FieldLegend>
    <FieldGroup name="legal">
      <Checkbox name="terms" required spread>
        I agree to the terms and conditions
        {#snippet endText()}Support this text{/snippet}
      </Checkbox>
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldGroup>
    <Button variant="filled" type="submit">Send</Button>
    <Button>Cancel</Button>
  </FieldGroup>
</Form>
