/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function RichOptions() {
  return (
    <>
      <Field for="select-rich-options-1" label="Jam buddy">
        <select id="select-rich-options-1">
          <SelectButton />
          <option value="adam">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-avatar ui-x-small">
                AG
              </span>
            </span>{" "}
            <span class="ui-text">
              <span>Adam Groove</span> <span>5-string wizard</span>
            </span>
          </option>
          <option value="kinga">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-avatar ui-x-small">
                KH
              </span>
            </span>{" "}
            <span class="ui-text">
              <span>Kinga Headstock</span> <span>Slap enthusiast</span>
            </span>
          </option>
          <option value="mohini">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-avatar ui-x-small">
                MH
              </span>
            </span>{" "}
            <span class="ui-text">
              <span>Mohini Hertz</span> <span>Fretless dreamer</span>
            </span>
          </option>
        </select>
      </Field>

      <Field for="select-rich-options-2" label="Song status">
        <select id="select-rich-options-2">
          <SelectButton />
          <option value="todo">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-swatch ui-neutral"></span>
            </span>
            <span class="ui-text">Still learning</span>
          </option>
          <option value="doing">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-swatch ui-info"></span>
            </span>
            <span class="ui-text">Nearly there</span>
          </option>
          <option value="done">
            <span class="ui-start">
              <span aria-hidden="true" class="ui-swatch ui-success"></span>
            </span>
            <span class="ui-text">Nailed it</span>
          </option>
        </select>
      </Field>

      <Field for="select-rich-options-3" label="Visibility">
        <select id="select-rich-options-3">
          <SelectButton />
          <option value="private">
            <span class="ui-start">
              <svg
                data-icon="lock"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                ></path>
              </svg>
            </span>{" "}
            <span class="ui-text">
              <span>Private</span> <span>Only you can see it</span>
            </span>
          </option>
          <option value="team">
            <span class="ui-start">
              <svg
                data-icon="people"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16 17v2H2v-2s0-4 7-4 7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59 5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
                ></path>
              </svg>
            </span>{" "}
            <span class="ui-text">
              <span>Band</span> <span>Everyone in your band</span>
            </span>
          </option>
          <option value="public">
            <span class="ui-start">
              <svg
                data-icon="globe"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                ></path>
              </svg>
            </span>{" "}
            <span class="ui-text">
              <span>Public</span> <span>All of Bassbook</span>
            </span>
          </option>
        </select>
      </Field>
    </>
  )
}
