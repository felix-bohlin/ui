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
  <Form id="kitchen-sink-example-row">
    <FieldSet>
      <FieldLegend>User Profile</FieldLegend>
      <FieldDescription>
        Please provide your basic contact details.
      </FieldDescription>
      <FieldGroup>
        <TextField placeholder="Jane Doe" required spread>
          <template #label>Full Name</template>
        </TextField>
        <TextField
          type="email"
          placeholder="jane@example.com"
          required
          spread
        >
          <template #label>Email Address</template>
        </TextField>
        <Select :items="roleItems" spread>
          <template #label>Role</template>
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
        <Switch v-model="emailNotifs" name="email_notifs" spread
          >Email Notifications</Switch
        >
        <Switch v-model="smsNotifs" name="sms_notifs" spread
          >SMS Notifications</Switch
        >
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Theme Preference</FieldLegend>
      <FieldDescription>Select your preferred visual style.</FieldDescription>
      <FieldGroup direction="row" name="theme">
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
        <Range min="0" max="20" step="1" v-model="experience" spread>
          Professional Experience
          <template #start-text
            >Drag the slider to match your total tenure.</template
          >
        </Range>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Additional Info</FieldLegend>
      <FieldDescription>Anything else we should know?</FieldDescription>
      <FieldGroup name="details">
        <Textarea
          placeholder="Tell us about yourself..."
          :rows="4"
          spread
        >
          <template #label>Biography</template>
        </Textarea>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldSet>
      <FieldLegend>Legal</FieldLegend>
      <FieldGroup name="legal">
        <Checkbox name="terms" required spread>
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
