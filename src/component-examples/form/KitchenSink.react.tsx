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
        <FieldLegend>User profile</FieldLegend>
        <FieldDescription>
          Please provide your basic contact details.
        </FieldDescription>
        <FieldGroup>
          <TextField
            autoComplete="name"
            label="Full name"
            placeholder="Ada Lovelace"
            required
          />
          <TextField
            autoComplete="email"
            label="Email address"
            placeholder="name@example.com"
            required
            type="email"
          />
          <Select items={roleItems} label="Role" />
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
            Email notifications
          </Switch>
          <Switch name="sms_notifs">SMS notifications</Switch>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset>
        <FieldLegend>Theme preference</FieldLegend>
        <FieldDescription>Select your preferred visual style.</FieldDescription>
        <FieldGroup name="theme">
          <Radio defaultChecked value="light">
            Light theme
          </Radio>
          <Radio value="dark">Dark theme</Radio>
          <Radio value="system">System default</Radio>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset>
        <FieldLegend>Experience level</FieldLegend>
        <FieldDescription>
          How many years of experience do you have?
        </FieldDescription>
        <FieldGroup>
          <Range
            defaultValue="5"
            label="Professional experience"
            max="20"
            min="0"
            startText="Drag the slider to match your total tenure."
            step="1"
          />
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset>
        <FieldLegend>Additional info</FieldLegend>
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
          <Checkbox
            endText="You can withdraw your consent at any time."
            name="terms"
            required
          >
            I agree to the terms and conditions
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <FieldGroup>
        <Button>Cancel</Button>
        <Button type="submit" variant="filled">
          Send
        </Button>
      </FieldGroup>
    </Form>
  )
}
