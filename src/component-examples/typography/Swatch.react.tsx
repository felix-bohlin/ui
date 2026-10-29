export default function Swatch() {
  return (
    <ul className="ui-layout-row">
      <li className="ui-layout-row ui-x-small">
        <span className="ui-swatch ui-success"></span> Online
      </li>
      <li className="ui-layout-row ui-x-small">
        <span className="ui-swatch ui-warning"></span> Degraded
      </li>
      <li className="ui-layout-row ui-x-small">
        <span className="ui-swatch ui-critical"></span> Down
      </li>
      <li className="ui-layout-row ui-x-small">
        <span
          className="ui-swatch"
          style={{ "--_swatch-bg-color": "var(--ui-color-7)" }}
        ></span>{" "}
        Maintenance
      </li>
    </ul>
  )
}
