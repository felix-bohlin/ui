import { Checkbox } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Checkbox
        endText="Wrapped in recycled paper for €3."
        name="checkbox-spread"
        spread
        value="gift-wrap"
      >
        Gift wrap
      </Checkbox>

      <Checkbox
        endText="Required to place the order."
        name="checkbox-spread"
        required
        spread
        value="terms"
      >
        I accept the terms of sale
      </Checkbox>

      <Checkbox
        disabled
        endText="Not available for your address."
        name="checkbox-spread"
        spread
        value="express"
      >
        Express delivery
      </Checkbox>

      <Checkbox
        endText="Confirm your age to buy this item."
        error
        name="checkbox-spread"
        spread
        value="age"
      >
        I'm 18 or older
      </Checkbox>
    </>
  )
}
