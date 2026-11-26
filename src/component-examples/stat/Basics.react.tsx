import { Stat } from "opui-css/react"

export default function Basics() {
  return (
    <Stat
      description={
        <>
          <span className="ui-caption ui-success">+12.4%</span> from last week
        </>
      }
      label="Visitors"
    >
      48 210
    </Stat>
  )
}
