<script setup lang="ts">
import {
  Button,
  ControlGroup,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Select,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <ControlGroup aria-label="Find an order" color="primary" variant="filled">
    <TextField
      hideLabel
      label="Order number or customer name"
      placeholder="Search orders"
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
          :items="[
            { label: 'EUR', value: 'eur' },
            { label: 'SEK', value: 'sek' },
            { label: 'USD', value: 'usd' },
          ]"
          label="Currency"
          name="currency"
        />
        <TextField
          hideLabel
          inputmode="decimal"
          label="Amount"
          name="amount"
          placeholder="0.00"
        />
      </ControlGroup>
    </FieldGroup>
  </Fieldset>
</template>
