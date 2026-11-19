import {
  Button,
  ControlGroup,
  FieldGroup,
  FieldLegend,
  Fieldset,
  NumberField,
  Select,
  TextField,
} from "opui-css/react"

export default function Fields() {
  return (
    <>
      <ControlGroup
        aria-label="Find a bassist"
        color="primary"
        variant="filled"
      >
        <TextField
          hideLabel
          label="Bassist name or handle"
          placeholder="Search bassists"
          type="search"
        />
        <Button>Search</Button>
      </ControlGroup>

      <Fieldset>
        <FieldLegend>Price</FieldLegend>
        <FieldGroup>
          <ControlGroup>
            <Select
              hideLabel
              items={[
                { label: "EUR", value: "eur" },
                { label: "SEK", value: "sek" },
                { label: "USD", value: "usd" },
              ]}
              label="Currency"
              name="currency"
            />
            <TextField
              hideLabel
              inputMode="decimal"
              label="Amount"
              name="amount"
              placeholder="0.00"
            />
          </ControlGroup>
        </FieldGroup>
      </Fieldset>

      <ControlGroup aria-label="Add to cart" color="primary" variant="filled">
        <NumberField
          defaultValue={1}
          hideLabel
          id="control-group-fields-1"
          label="Quantity"
          max={10}
          min={1}
          name="quantity"
        />
        <Button>Add to cart</Button>
      </ControlGroup>
    </>
  )
}
