<script setup>
import { useId } from "vue"

const idCheckbox = useId()
const idRadio1 = useId()
const idRadio2 = useId()
const idSwitch = useId()
</script>

<template>
  <li>
    <div class="text">
      <p>Headline</p>
    </div>
  </li>

  <li>
    <div class="text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>

  <li>
    <div class="text">
      <p>Trailing supporting text</p>
    </div>
    <div class="end">100+</div>
  </li>

  <li>
    <div class="text">
      <p>Trailing keyboard command</p>
    </div>
    <div class="end">
      <kbd>CTRL+Shift+X</kbd>
    </div>
  </li>

  <li class="border-top">
    <div class="start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
        />
      </svg>
    </div>
    <div class="text">
      <p>Headline with start icon</p>
    </div>
  </li>

  <li>
    <div class="start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
        />
      </svg>
    </div>
    <div class="text">
      <p>Headline with start icon</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>

  <li class="inset">
    <div class="text">
      <p>Inset class</p>
      <p>Makes the text line up nicely</p>
    </div>
  </li>

  <li class="border-top">
    <button>
      <div class="text">
        <p>Button list item</p>
      </div>
    </button>
  </li>

  <li>
    <a href="#">
      <div class="text">
        <p>Link list item</p>
      </div>
    </a>
  </li>

  <li class="border-top">
    <div class="start">
      <div class="avatar">OP</div>
    </div>

    <div class="text">
      <p>Headline</p>
    </div>
  </li>

  <li>
    <div class="start">
      <div class="avatar">
        <img
          src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>

    <div class="text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>

  <li class="border-top">
    <button>
      <div class="start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 28 28"
        >
          <path
            fill="currentColor"
            d="M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25V15h6a.75.75 0 0 1 .743.648l.007.102a2.75 2.75 0 1 0 5.5 0a.75.75 0 0 1 .648-.743L17.5 15h6V6.25a1.75 1.75 0 0 0-1.75-1.75"
          />
        </svg>
      </div>
      <div class="text">
        <p>Button with start icon</p>
      </div>
    </button>
  </li>

  <li>
    <a href="#">
      <div class="start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m13.94 5l5.061 5.06L9.063 20a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.921l1.394-5.116a2.25 2.25 0 0 1 .58-.999zm-7.414 6l-1.5 1.5H2.75a.75.75 0 0 1 0-1.5zm14.352-8.174l.153.144l.145.153a3.58 3.58 0 0 1-.145 4.908l-.97.969L15 3.94l.97-.97a3.58 3.58 0 0 1 4.908-.144M10.526 7l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5zm4-4l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5z"
          />
        </svg>
      </div>
      <div class="text">
        <p>Link with start icon</p>
      </div>
    </a>
  </li>

  <li class="border-top">
    <button>
      <div class="text">
        <p>End icon</p>
      </div>
      <div class="end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M11.116 26.634a1.25 1.25 0 0 1 0-1.768L19.982 16l-8.866-8.866a1.25 1.25 0 0 1 1.768-1.768l9.75 9.75a1.25 1.25 0 0 1 0 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0"
          />
        </svg>
      </div>
    </button>
  </li>

  <li>
    <div class="text">
      <p>End icon button</p>
    </div>
    <div class="end">
      <button class="icon-button">
        <span class="sr-only">More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 9a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5M13.5 25a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
          />
        </svg>
      </button>
    </div>
  </li>

  <li class="border-top">
    <label class="checkbox" :for="idCheckbox">
      <div class="text">
        <p>Checkbox</p>
      </div>
      <div class="end">
        <input :id="idCheckbox" type="checkbox" />
      </div>
    </label>
  </li>

  <li class="border-top">
    <label class="radio" :for="idRadio1">
      <div class="text">
        <p>Radio 1</p>
      </div>
      <div class="end">
        <input :id="idRadio1" :name="`radio-group-${idRadio1}`" type="radio" />
      </div>
    </label>
  </li>

  <li>
    <label class="radio" :for="idRadio2">
      <div class="text">
        <p>Radio 2</p>
      </div>
      <div class="end">
        <input :id="idRadio2" :name="`radio-group-${idRadio1}`" type="radio" />
      </div>
    </label>
  </li>

  <li class="border-top">
    <label :for="idSwitch" for="switch-checked" class="switch">
      <div class="text">
        <p>Switch 1</p>
      </div>
      <div class="end">
        <input :id="idSwitch" role="switch" type="checkbox" />
      </div>
    </label>
  </li>
</template>
