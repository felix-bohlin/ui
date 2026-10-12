export default function InputTypes() {
  return (
    <>
      <div className="example-column">
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Color</span>
          <span className="ui-field">
            <input type="color" placeholder="Color" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Email</span>
          <span className="ui-field">
            <input type="email" placeholder="name@email.com" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Password</span>
          <span className="ui-field">
            <input type="password" placeholder="Password" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Search</span>
          <span className="ui-field">
            <input type="search" placeholder="Search" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Phone</span>
          <span className="ui-field">
            <input type="tel" placeholder="(666) 666-1337" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Text</span>
          <span className="ui-field">
            <input type="text" placeholder="Text" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">URL</span>
          <span className="ui-field">
            <input type="url" placeholder="https://yoursite.com" />
          </span>
        </label>
      </div>

      <div className="example-column">
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Date</span>
          <span className="ui-field">
            <input type="date" placeholder="Date" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Datetime local</span>
          <span className="ui-field">
            <input type="datetime-local" placeholder="Datetime local" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Month</span>
          <span className="ui-field">
            <input type="month" placeholder="Month" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Time</span>
          <span className="ui-field">
            <input type="time" placeholder="Time" />
          </span>
        </label>
        <label className="ui-text-field input-type-field">
          <span className="ui-label">Week</span>
          <span className="ui-field">
            <input type="week" placeholder="Week" />
          </span>
        </label>
      </div>
    </>
  )
}
