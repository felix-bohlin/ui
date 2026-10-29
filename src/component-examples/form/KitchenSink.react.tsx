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
} from "opui-css/react"

const roleItems = [
  { label: "Designer", value: "design" },
  { label: "Developer", value: "dev" },
  { label: "Manager", value: "manager" },
]

export default function KitchenSink() {
  return (
    <Form id="form-kitchen-sink-1">
      <Fieldset>
        <FieldLegend>User Profile</FieldLegend>
        <FieldDescription>
          Please provide your basic contact details.
        </FieldDescription>
        <FieldGroup>
          <TextField
            autoComplete="name"
            label="Full Name"
            placeholder="Jane Doe"
            required
          />
          <TextField
            autoComplete="email"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
          />
          <Select label="Role" items={roleItems} />
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>
          Configure how you want to receive updates.
        </FieldDescription>
        <FieldGroup>
          <Switch defaultChecked name="email_notifs">
            Email Notifications
          </Switch>
          <Switch name="sms_notifs">SMS Notifications</Switch>
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset>
        <FieldLegend>Theme Preference</FieldLegend>
        <FieldDescription>Select your preferred visual style.</FieldDescription>
        <FieldGroup name="theme">
          <Radio value="light" defaultChecked>
            Light Theme
          </Radio>
          <Radio value="dark">Dark Theme</Radio>
          <Radio value="system">System Default</Radio>
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset>
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
            defaultValue="5"
            startText="Drag the slider to match your total tenure."
          />
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset>
        <FieldLegend>Additional Info</FieldLegend>
        <FieldDescription>Anything else we should know?</FieldDescription>
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
          <Checkbox name="terms" required endText="Support this text">
            I agree to the terms and conditions
          </Checkbox>
        </FieldGroup>
      </Fieldset>

      <Divider />

      <FieldGroup>
        <Button variant="filled" type="submit">
          Send
        </Button>
        <Button>Cancel</Button>
      </FieldGroup>
    </Form>
  )
}
