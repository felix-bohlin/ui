import { Select } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Select label="Country" spread>
        <option value="">-</option>
        <option>Denmark</option>
        <option>Finland</option>
        <option>Iceland</option>
        <option>Norway</option>
        <option>Sweden</option>
      </Select>

      <Select
        endText="This affects UI translations."
        label="Language"
        spread
        startText="Choose your preferred language."
        variant="filled"
      >
        <option value="">-</option>
        <option>Danish</option>
        <option>Finnish</option>
        <option>Icelandic</option>
        <option>Norwegian</option>
        <option>Swedish</option>
      </Select>

      <Select
        label="Forum"
        required
        spread
        startText="Posts your question where the right bassists hang out."
      >
        <option value="">-</option>
        <option>Gear Talk</option>
        <option>Ignored Bassists Anonymous</option>
      </Select>

      <Select
        disabled
        label="Plan"
        spread
        startText="A gift from your band, aww."
      >
        <option>Gold</option>
      </Select>

      <Select
        endText="This card has expired. Pick another one."
        error
        label="Payment method"
        spread
        startText="Bassbook Gold renews on the first of each month."
      >
        <option>Visa ending in 4242</option>
        <option>Mastercard ending in 5100</option>
      </Select>

      <Select
        label="Time zone"
        spread
        start="UTC"
        startText="Used for gig and rehearsal reminders."
      >
        <option>-03:00</option>
        <option>+00:00</option>
        <option>+01:00</option>
        <option>+05:30</option>
        <option>+09:00</option>
      </Select>

      <Select
        endText="Cannot be changed mid-jam."
        label="Jam region"
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
        startText="Less lag means tighter grooves."
        variant="filled"
      >
        <option value="">-</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>North America</option>
      </Select>
    </>
  )
}
