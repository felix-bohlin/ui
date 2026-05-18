<template>
<div class="example-column">
  <label class="text-field input-type-field">
    <span class="label">Color</span>
    <input type="color" placeholder="Color" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Email</span>
    <input type="email" placeholder="name@email.com" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Password</span>
    <input type="password" placeholder="Password" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Search</span>
    <input type="search" placeholder="Search" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Phone</span>
    <input type="tel" placeholder="(666) 666-1337" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Text</span>
    <input type="text" placeholder="Text" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">URL</span>
    <input type="url" placeholder="https://yoursite.com" />
  </label>
</div>

<div class="example-column">
  <label class="text-field input-type-field">
    <span class="label">Date</span>
    <input type="date" placeholder="Date" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Datetime local</span>
    <input type="datetime-local" placeholder="Datetime local" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Month</span>
    <input type="month" placeholder="Month" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Time</span>
    <input type="time" placeholder="Time" />
  </label>
  <label class="text-field input-type-field">
    <span class="label">Week</span>
    <input type="week" placeholder="Week" />
  </label>
</div>

<script>
  function setupInputTypesControls() {
    const filledToggle = document.querySelector(
      "#text-field-filled-toggle",
    ) as HTMLInputElement
    const smallToggle = document.querySelector(
      "#text-field-small-toggle",
    ) as HTMLInputElement
    const fields = document.querySelectorAll(".input-type-field")

    function updateFields() {
      if (!filledToggle || !smallToggle) return
      fields.forEach((field) => {
        field.classList.toggle("filled", filledToggle.checked)
        field.classList.toggle("small", smallToggle.checked)
      })
    }

    filledToggle?.addEventListener("change", updateFields)
    smallToggle?.addEventListener("change", updateFields)
  }

  setupInputTypesControls()
  document.addEventListener("astro:after-swap", setupInputTypesControls)
</script>
</template>
