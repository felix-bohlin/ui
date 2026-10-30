import { Select } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Select
        label="Country"
        spread
        startText="Select your country of residence"
      >
        <option value="">Select a country</option>
        <option>Denmark</option>
        <option>Finland</option>
        <option>Iceland</option>
        <option>Norway</option>
        <option>Sweden</option>
      </Select>

      <Select
        endText="This affects UI translations"
        label="Language"
        spread
        startText="Choose your preferred language"
        variant="filled"
      >
        <option value="">Select a language</option>
        <option>Danish</option>
        <option>Finnish</option>
        <option>Icelandic</option>
        <option>Norwegian</option>
        <option>Swedish</option>
      </Select>

      <Select
        label="Required"
        required
        spread
        startText="You must select an option"
      >
        <option value="">Select an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>

      <Select
        disabled
        label="Disabled"
        spread
        startText="This select is disabled"
      >
        <option>Option 1</option>
      </Select>

      <Select
        endText="Please select a valid option."
        error
        label="Invalid Select"
        spread
        startText="This select has an error"
      >
        <option>Option 1</option>
      </Select>

      <Select
        label="Time zone"
        spread
        start="UTC"
        startText="Used for reminders and due dates"
      >
        <option>-03:00</option>
        <option>+00:00</option>
        <option>+01:00</option>
        <option>+05:30</option>
        <option>+09:00</option>
      </Select>

      <Select
        endText="Cannot be changed after deploy"
        label="Region"
        spread
        start={
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        }
        startText="Affects data residency and latency"
        variant="filled"
      >
        <option value="">-</option>
        <option>ap-southeast-1</option>
        <option>eu-north-1</option>
        <option>us-east-1</option>
      </Select>
    </>
  )
}
