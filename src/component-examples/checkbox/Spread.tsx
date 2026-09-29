import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox
        name="checkbox-spread"
        spread
        endText="I have read and agree to the privacy policy."
      >
        Accept Terms &amp; Conditions
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        required
        endText="You must accept this to continue."
      >
        Required
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        disabled
        endText="This checkbox is disabled."
      >
        Disabled
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        error
        endText="There is an error with this checkbox."
      >
        Invalid Checkbox
      </Checkbox>
    </>
  )
}
