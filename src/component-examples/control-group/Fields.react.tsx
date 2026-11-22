import {
  Button,
  ControlGroup,
  Field,
  FieldGroup,
  FieldLegend,
  Fieldset,
  SelectButton,
  StepButton,
} from "opui-css/react"

export default function Fields() {
  return (
    <>
      <ControlGroup
        aria-label="Find a bassist"
        color="primary"
        variant="filled"
      >
        <Field
          hideLabel
          htmlFor="control-group-fields-2"
          label="Bassist name or handle"
        >
          <input
            id="control-group-fields-2"
            placeholder="Search bassists"
            type="search"
          />
        </Field>
        <Button>Search</Button>
      </ControlGroup>

      <Fieldset>
        <FieldLegend>Price</FieldLegend>
        <FieldGroup>
          <ControlGroup>
            <Field hideLabel htmlFor="control-group-fields-4" label="Currency">
              <select id="control-group-fields-4" name="currency">
                <SelectButton />
                <option value="eur">EUR</option>
                <option value="sek">SEK</option>
                <option value="usd">USD</option>
              </select>
            </Field>
            <Field hideLabel htmlFor="control-group-fields-3" label="Amount">
              <input
                id="control-group-fields-3"
                inputMode="decimal"
                name="amount"
                placeholder="0.00"
              />
            </Field>
          </ControlGroup>
        </FieldGroup>
      </Fieldset>

      <ControlGroup aria-label="Add to cart" color="primary" variant="filled">
        <Field
          autoFit
          end={
            <StepButton command="--step-up" htmlFor="control-group-fields-1" />
          }
          hideLabel
          htmlFor="control-group-fields-1"
          label="Quantity"
          start={
            <StepButton
              command="--step-down"
              htmlFor="control-group-fields-1"
            />
          }
        >
          <input
            id="control-group-fields-1"
            max="10"
            min="1"
            name="quantity"
            type="number"
            defaultValue="1"
          />
        </Field>
        <Button>Add to cart</Button>
      </ControlGroup>
    </>
  )
}
