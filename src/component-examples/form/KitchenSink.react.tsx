import { useState } from "react"
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
} from "opui-css/react"

const roleItems = [
  { text: "Developer", value: "dev" },
  { text: "Designer", value: "design" },
  { text: "Manager", value: "manager" },
]

export default function KitchenSink() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(false)
  const [theme, setTheme] = useState("light")
  const [experience, setExperience] = useState(5)

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
            checked={emailNotifs}
            onChange={(event) => setEmailNotifs(event.currentTarget.checked)}
            name="email_notifs"
          >
            Email Notifications
          </Switch>
          <Switch
            checked={smsNotifs}
            onChange={(event) => setSmsNotifs(event.currentTarget.checked)}
            name="sms_notifs"
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
            checked={theme === "light"}
            onChange={(event) => setTheme(event.currentTarget.value)}
            value="light"
          >
            Light Theme
          </Radio>
          <Radio
            checked={theme === "dark"}
            onChange={(event) => setTheme(event.currentTarget.value)}
            value="dark"
          >
            Dark Theme
          </Radio>
          <Radio
            checked={theme === "system"}
            onChange={(event) => setTheme(event.currentTarget.value)}
            value="system"
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
            value={experience}
            onChange={(event) => setExperience(Number(event.target.value))}
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
