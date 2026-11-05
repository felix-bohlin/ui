import { notFound } from "next/navigation"
import { examples } from "../../examples"

export const dynamic = "force-dynamic"

export default async function Page({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component } = await params
  const list = examples[component]
  if (!list) notFound()
  return list.map(({ Component, name }) => (
    <div data-example={`${component}/${name}`} key={name}>
      <Component />
    </div>
  ))
}
