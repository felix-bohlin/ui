<script setup lang="ts">
import {
  Button,
  ControlGroup,
  FieldGroup,
  FieldLegend,
  Fieldset,
  NumberField,
  Select,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <ControlGroup aria-label="Find a bassist" color="primary" variant="filled">
    <TextField
      for="control-group-fields-2"
      hideLabel
      label="Bassist name or handle"
    >
      <input
        id="control-group-fields-2"
        placeholder="Search bassists"
        type="search"
      />
    </TextField>
    <Button>Search</Button>
  </ControlGroup>

  <Fieldset>
    <FieldLegend>Price</FieldLegend>
    <FieldGroup>
      <ControlGroup>
        <Select
          hideLabel
          :items="[
            { label: 'EUR', value: 'eur' },
            { label: 'SEK', value: 'sek' },
            { label: 'USD', value: 'usd' },
          ]"
          label="Currency"
          name="currency"
        />
        <TextField for="control-group-fields-3" hideLabel label="Amount">
          <input
            id="control-group-fields-3"
            inputmode="decimal"
            name="amount"
            placeholder="0.00"
          />
        </TextField>
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
</template>
