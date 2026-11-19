import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { USERS, user } from "reference-shared"
import Profile from "./profile"

type Props = { params: Promise<{ handle: string }> }

export const generateStaticParams = () =>
  USERS.map(({ handle }) => ({ handle }))

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const found = user((await params).handle)
  return found ? { title: found.name } : {}
}

export default async function ProfilePage({ params }: Props) {
  const found = user((await params).handle)
  if (!found) notFound()
  return <Profile key={found.handle} profile={found} />
}
