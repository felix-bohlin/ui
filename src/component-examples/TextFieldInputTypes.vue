<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  function setupInputTypesControls() {
    const filledToggle = document.querySelector("#text-field-filled-toggle")
    const smallToggle = document.querySelector("#text-field-small-toggle")
    const fields = document.querySelectorAll(
      "#text-field-input-types-example .input-type-field",
    )

    function updateFields() {
      if (!filledToggle || !smallToggle) return
      fields.forEach((field) => {
        field.classList.toggle("ui-filled", filledToggle.checked)
        field.classList.toggle("ui-small", smallToggle.checked)
      })
    }

    filledToggle?.addEventListener("change", updateFields)
    smallToggle?.addEventListener("change", updateFields)
  }

  setupInputTypesControls()
})
</script>

<template>
  <div id="text-field-input-types-example" class="example-row">
    <div class="example-column">
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Color</span>
        <input type="color" placeholder="Color" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Email</span>
        <input type="email" placeholder="name@email.com" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Password</span>
        <input type="password" placeholder="Password" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Search</span>
        <input type="search" placeholder="Search" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Phone</span>
        <input type="tel" placeholder="(666) 666-1337" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Text</span>
        <input type="text" placeholder="Text" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">URL</span>
        <input type="url" placeholder="https://yoursite.com" />
      </label>
    </div>

    <div class="example-column">
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Date</span>
        <input type="date" placeholder="Date" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Datetime local</span>
        <input type="datetime-local" placeholder="Datetime local" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Month</span>
        <input type="month" placeholder="Month" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Time</span>
        <input type="time" placeholder="Time" />
      </label>
      <label class="ui-text-field input-type-field">
        <span class="ui-label">Week</span>
        <input type="week" placeholder="Week" />
      </label>
    </div>
  </div>
</template>
