const checkIcon = (className: string) => (
  <svg
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-1 15-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10z"
    ></path>
  </svg>
)

export default function Icon() {
  return (
    <>
      <p className="ui-layout-row ui-small">
        {checkIcon("ui-icon")} All checks passed
      </p>
      <p className="ui-layout-row ui-small">
        {checkIcon("ui-icon ui-small")} Small
      </p>
      <p className="ui-layout-row ui-small">
        {checkIcon("ui-icon ui-large")} Large
      </p>
    </>
  )
}
