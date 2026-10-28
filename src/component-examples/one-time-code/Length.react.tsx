import { OneTimeCode } from "opui-css/react"

export default function Length() {
  return (
    <>
      <OneTimeCode label="PIN" length={4} name="pin" />
      <OneTimeCode label="Backup code" grouped length={8} name="backup-code" />
    </>
  )
}
