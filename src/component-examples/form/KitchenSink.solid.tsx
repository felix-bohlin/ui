/** @jsxImportSource @solidjs/web */
import {
  Button,
  Checkbox,
  Divider,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
  SelectButton,
  Switch,
} from "opui-css/solid"

export default function KitchenSink() {
  return (
    <Form id="form-kitchen-sink-1">
      <Fieldset aria-describedby="form-kitchen-sink-2-description">
        <FieldLegend>Your Bassbook profile</FieldLegend>
        <FieldDescription id="form-kitchen-sink-2-description">
          Heyyy, tell us who you are so your fans can find you.
        </FieldDescription>
        <FieldGroup>
          <Field for="form-kitchen-sink-7" label="Full name">
            <input
              autocomplete="name"
              id="form-kitchen-sink-7"
              placeholder="Holly Humbucker"
              required
            />
          </Field>
          <Field for="form-kitchen-sink-8" label="Email address">
            <input
              autocomplete="email"
              id="form-kitchen-sink-8"
              placeholder="rory@bassmail.example"
              required
              type="email"
            />
          </Field>
          <Field for="form-kitchen-sink-10" label="Role">
            <select id="form-kitchen-sink-10">
              <SelectButton />
              <option value="bass">Bassist</option>
              <option value="drums">Drummer</option>
              <option value="guitar">Guitarist</option>
            </select>
          </Field>
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
          How many years have you held down the groove?
        </FieldDescription>
        <FieldGroup>
          <Field
            for="form-kitchen-sink-11"
            label="Years of playing"
            startText="Drag the slider, and yes, the years on guitar count less."
          >
            <input
              aria-describedby="form-kitchen-sink-11-start-text"
              id="form-kitchen-sink-11"
              max="20"
              min="0"
              step="1"
              type="range"
              defaultValue="5"
            />
          </Field>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <Fieldset aria-describedby="form-kitchen-sink-6-description">
        <FieldLegend>About you</FieldLegend>
        <FieldDescription id="form-kitchen-sink-6-description">
          Favorite strings, dream rig, the band that ignores you?
        </FieldDescription>
        <FieldGroup>
          <Field for="form-kitchen-sink-9" label="Biography">
            <textarea
              id="form-kitchen-sink-9"
              name="biography"
              placeholder="I play a fretless 5-string and nobody watches me..."
              rows="4"
            ></textarea>
          </Field>
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
