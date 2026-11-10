import { Card, CardContent, Skeleton } from "opui-css/react"

export default function CardExample() {
  return (
    <Card aria-busy="true" style={{ inlineSize: "16rem" }}>
      <Skeleton style={{ aspectRatio: "16 / 9" }} />
      <CardContent>
        <Skeleton line />
        <Skeleton line />
        <Skeleton line />
      </CardContent>
    </Card>
  )
}
