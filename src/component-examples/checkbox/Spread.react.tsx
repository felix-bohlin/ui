import { Checkbox } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Checkbox
        endText="I have read and agree to the privacy policy."
        name="checkbox-spread"
        spread
      >
        Accept Terms & Conditions
      </Checkbox>

      <Checkbox
        endText="You must accept this to continue."
        name="checkbox-spread"
        required
        spread
      >
        Required
      </Checkbox>

      <Checkbox
        disabled
        endText="This checkbox is disabled."
        name="checkbox-spread"
        spread
      >
        Disabled
      </Checkbox>

      <Checkbox
        endText="Check this box to continue."
        error
        name="checkbox-spread"
        spread
      >
        Invalid Checkbox
      </Checkbox>
    </>
  )
}
