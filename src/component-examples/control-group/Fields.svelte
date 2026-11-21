<script lang="ts">
  import {
    Button,
    ControlGroup,
    Field,
    FieldGroup,
    FieldLegend,
    Fieldset,
    NumberField,
    SelectButton,
  } from "opui-css/svelte"
</script>

<ControlGroup aria-label="Find a bassist" color="primary" variant="filled">
  <Field for="control-group-fields-2" hideLabel label="Bassist name or handle">
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
      <Field for="control-group-fields-4" hideLabel label="Currency">
        <select id="control-group-fields-4" name="currency">
          <SelectButton />
          <option value="eur">EUR</option>
          <option value="sek">SEK</option>
          <option value="usd">USD</option>
        </select>
      </Field>
      <Field for="control-group-fields-3" hideLabel label="Amount">
        <input
          id="control-group-fields-3"
          inputmode="decimal"
          name="amount"
          placeholder="0.00"
        />
      </Field>
    </ControlGroup>
  </FieldGroup>
</Fieldset>

<ControlGroup aria-label="Add to cart" color="primary" variant="filled">
  <NumberField for="control-group-fields-1" hideLabel label="Quantity">
    <input
      id="control-group-fields-1"
      max="10"
      min="1"
      name="quantity"
      type="number"
      value="1"
    />
  </NumberField>
  <Button>Add to cart</Button>
</ControlGroup>
