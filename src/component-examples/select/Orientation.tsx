import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select
        spread
        label="Country"
        description="Select your country of residence"
      >
        <option value="">Select a country</option>
        <option>Denmark</option>
        <option>Finland</option>
        <option>Iceland</option>
        <option>Norway</option>
        <option>Sweden</option>
      </Select>

      <Select
        spread
        variant="filled"
        label="Language"
        description="Choose your preferred language"
        endText="This affects UI translations"
      >
        <option value="">Select a language</option>
        <option>Danish</option>
        <option>Finnish</option>
        <option>Icelandic</option>
        <option>Norwegian</option>
        <option>Swedish</option>
      </Select>

      <Select
        spread
        required
        label="Required"
        description="You must select an option"
      >
        <option value="">Select an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>

      <Select
        spread
        disabled
        label="Disabled"
        description="This select is disabled"
      >
        <option>Option 1</option>
      </Select>

      <Select
        spread
        error
        label="Invalid Select"
        description="This select has an error"
        endText="Please select a valid option."
      >
        <option>Option 1</option>
      </Select>

      <Select spread label="Currency" description="Used for billing" prefix="¢">
        <option value="">-</option>
        <option>EUR</option>
        <option>EUR</option>
        <option>SEK</option>
      </Select>

      <Select
        spread
        variant="filled"
        label="Region"
        description="Affects data residency and latency"
        prefix={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        }
        endText="Cannot be changed after deploy"
      >
        <option value="">-</option>
        <option>eu-north-1</option>
        <option>us-east-1</option>
        <option>ap-southeast-1</option>
      </Select>
    </>
  )
}
