<script setup lang="ts">
import {
  Button,
  Checkbox,
  Divider,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
  Range,
  Select,
  Switch,
  TextField,
  Textarea,
} from "opui-css/vue"
import { ref } from "vue"

const roleItems = [
  { text: "Developer", value: "dev" },
  { text: "Designer", value: "design" },
  { text: "Manager", value: "manager" },
]

const emailNotifs = ref(true)
const smsNotifs = ref(false)
const theme = ref("light")
const experience = ref(5)
</script>

<template>
  <Form id="kitchen-sink-example">
    <FieldSet>
      <FieldLegend>User Profile</FieldLegend>
      <FieldDescription>
        Please provide your basic contact details.
      </FieldDescription>
      <FieldGroup>
        <TextField label="Full Name" placeholder="Jane Doe" required />
        <TextField
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          required
        />
        <Select label="Role" :items="roleItems" />
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>
        Configure how you want to receive updates.
      </FieldDescription>
      <FieldGroup name="notifications">
        <Switch v-model="emailNotifs" name="email_notifs"
          >Email Notifications</Switch
        >
        <Switch v-model="smsNotifs" name="sms_notifs">SMS Notifications</Switch>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Theme Preference</FieldLegend>
      <FieldDescription>Select your preferred visual style.</FieldDescription>
      <FieldGroup name="theme">
        <Radio v-model="theme" value="light">Light Theme</Radio>
        <Radio v-model="theme" value="dark">Dark Theme</Radio>
        <Radio v-model="theme" value="system">System Default</Radio>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Experience Level</FieldLegend>
      <FieldDescription>
        How many years of experience do you have?
      </FieldDescription>
      <FieldGroup>
        <Range
          label="Professional Experience"
          min="0"
          max="20"
          step="1"
          v-model="experience"
          start-text="Drag the slider to match your total tenure."
        />
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Additional Info</FieldLegend>
      <FieldDescription>Anything else we should know?</FieldDescription>
      <FieldGroup name="details">
        <Textarea
          label="Biography"
          placeholder="Tell us about yourself..."
          :rows="4"
        />
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Legal</FieldLegend>
      <FieldGroup name="legal">
        <Checkbox name="terms" required>
          I agree to the terms and conditions
          <template #end-text>Support this text</template>
        </Checkbox>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldGroup>
      <Button variant="filled" type="submit">Send</Button>
      <Button>Cancel</Button>
    </FieldGroup>
  </Form>
</template>
