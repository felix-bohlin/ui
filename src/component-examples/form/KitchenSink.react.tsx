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
  { label: "Bassist", value: "bass" },
  { label: "Drummer", value: "drums" },
  { label: "Guitarist", value: "guitar" },
]

export default function KitchenSink() {
  return (
    <Form id="form-kitchen-sink-1">
      <Fieldset aria-describedby="form-kitchen-sink-2-description">
        <FieldLegend>Your Bassbook profile</FieldLegend>
        <FieldDescription id="form-kitchen-sink-2-description">
          Heyyy, tell us who you are so your fans can find you.
        </FieldDescription>
        <FieldGroup>
          <TextField
            autoComplete="name"
            label="Full name"
            placeholder="Holly Humbucker"
            required
          />
          <TextField
            autoComplete="email"
            label="Email address"
            placeholder="rory@lowend.example"
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
          Pick how we tell you about new pokes and gig invites.
        </FieldDescription>
        <FieldGroup>
          <Switch defaultChecked name="email_notifs">
            Email notifications
          </Switch>
          <Switch name="sms_notifs">SMS notifications</Switch>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset aria-describedby="form-kitchen-sink-4-description">
        <FieldLegend>Profile theme</FieldLegend>
        <FieldDescription id="form-kitchen-sink-4-description">
          Pick the look of your awesome profile page.
        </FieldDescription>
        <FieldGroup name="theme">
          <Radio defaultChecked value="light">
            Light theme
          </Radio>
          <Radio value="dark">Dark theme</Radio>
          <Radio value="system">System default</Radio>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset aria-describedby="form-kitchen-sink-5-description">
        <FieldLegend>Bass experience</FieldLegend>
        <FieldDescription id="form-kitchen-sink-5-description">
          How many years have you held down the low end?
        </FieldDescription>
        <FieldGroup>
          <Range
            defaultValue="5"
            label="Years of playing"
            max="20"
            min="0"
            startText="Drag the slider, and yes, the years on guitar count less."
            step="1"
          />
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset aria-describedby="form-kitchen-sink-6-description">
        <FieldLegend>About you</FieldLegend>
        <FieldDescription id="form-kitchen-sink-6-description">
          Favorite strings, dream rig, the band that ignores you?
        </FieldDescription>
        <FieldGroup>
          <Textarea
            label="Biography"
            name="biography"
            placeholder="I play a fretless 5-string and nobody watches me..."
            rows={4}
          />
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset>
        <FieldLegend>Legal</FieldLegend>
        <FieldGroup>
          <Checkbox
            endText="You can withdraw your consent at any time, no hard feelings."
            name="terms"
            required
          >
            I agree to the Bassbook terms and conditions
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
