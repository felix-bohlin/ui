/** @jsxImportSource @solidjs/web */
import { Stat } from "opui-css/solid"

export default function Basics() {
  return (
    <Stat
      description={
        <>
          <span class="ui-caption ui-success">+12.4%</span> from last week
        </>
      }
      label="Visitors"
    >
      48 210
    </Stat>
  )
}
