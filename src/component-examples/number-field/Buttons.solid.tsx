/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Buttons() {
  return (
    <div lang="sv">
      <NumberField
        decreaseIcon={
          <svg
            data-icon="chevron-down"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
            ></path>
          </svg>
        }
        decreaseLabel="Minska"
        for="number-field-buttons-1"
        increaseIcon={
          <svg
            data-icon="chevron-up"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4.293 15.707a1 1 0 0 0 1.414 0L12 9.414l6.293 6.293a1 1 0 1 0 1.414-1.414l-7-7a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 0 1.414"
            ></path>
          </svg>
        }
        increaseLabel="Öka"
        label="Antal"
      >
        <input
          id="number-field-buttons-1"
          max="10"
          min="1"
          type="number"
          defaultValue="1"
        />
      </NumberField>
    </div>
  )
}
