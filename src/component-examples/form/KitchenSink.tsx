import { createSignal } from "solid-js"
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
} from "opui-css/solid"

const roleItems = [
  { text: "Developer", value: "dev" },
  { text: "Designer", value: "design" },
  { text: "Manager", value: "manager" },
]

export default function Example() {
  const [emailNotifs, setEmailNotifs] = createSignal(true)
  const [smsNotifs, setSmsNotifs] = createSignal(false)
  const [theme, setTheme] = createSignal("light")
  const [experience, setExperience] = createSignal(5)

  return (
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
          <Select label="Role" items={roleItems} />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>
          Configure how you want to receive updates.
        </FieldDescription>
        <FieldGroup name="notifications">
          <Switch
            checked={emailNotifs()}
            name="email_notifs"
            onChange={(e) => setEmailNotifs(e.currentTarget.checked)}
          >
            Email Notifications
          </Switch>
          <Switch
            checked={smsNotifs()}
            name="sms_notifs"
            onChange={(e) => setSmsNotifs(e.currentTarget.checked)}
          >
            SMS Notifications
          </Switch>
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Theme Preference</FieldLegend>
        <FieldDescription>Select your preferred visual style.</FieldDescription>
        <FieldGroup name="theme">
          <Radio
            checked={theme() === "light"}
            value="light"
            onChange={(e) => setTheme(e.currentTarget.value)}
          >
            Light Theme
          </Radio>
          <Radio
            checked={theme() === "dark"}
            value="dark"
            onChange={(e) => setTheme(e.currentTarget.value)}
          >
            Dark Theme
          </Radio>
          <Radio
            checked={theme() === "system"}
            value="system"
            onChange={(e) => setTheme(e.currentTarget.value)}
          >
            System Default
          </Radio>
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
            value={experience()}
            onInput={(e) => setExperience(Number(e.currentTarget.value))}
            startText="Drag the slider to match your total tenure."
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
            rows={4}
          />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Legal</FieldLegend>
        <FieldGroup name="legal">
          <Checkbox name="terms" required endText="Support this text">
            I agree to the terms and conditions
          </Checkbox>
        </FieldGroup>
      </FieldSet>

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
