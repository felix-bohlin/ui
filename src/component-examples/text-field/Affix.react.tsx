import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
  TextFieldPrefix,
  TextFieldSuffix,
} from "opui-css/react"

export default function Affix() {
  return (
    <>
      <TextField>
        <TextFieldLabel>Amount</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput placeholder="0.00" />
          <TextFieldPrefix>¢</TextFieldPrefix>
          <TextFieldSuffix>EUR</TextFieldSuffix>
        </TextFieldControl>
      </TextField>
      <TextField>
        <TextFieldLabel>Website</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput placeholder="example.com" />
          <TextFieldPrefix>https://</TextFieldPrefix>
        </TextFieldControl>
      </TextField>
      <TextField>
        <TextFieldLabel>Weight</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput type="numeric" placeholder="0" />
          <TextFieldSuffix>kg</TextFieldSuffix>
        </TextFieldControl>
      </TextField>
      <TextField>
        <TextFieldLabel>Search</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput placeholder="Search..." />
          <TextFieldPrefix>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </TextFieldPrefix>
        </TextFieldControl>
      </TextField>
    </>
  )
}
