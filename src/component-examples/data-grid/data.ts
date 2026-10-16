export const people = [
  {
    city: "London",
    email: "ada@example.com",
    id: "ada",
    joined: 2015,
    name: "Ada Lovelace",
    progress: 82,
    role: "Engineer",
    status: "Active",
    tickets: 42,
  },
  {
    city: "Manchester",
    email: "alan@example.com",
    id: "alan",
    joined: 2018,
    name: "Alan Turing",
    progress: 64,
    role: "Researcher",
    status: "Away",
    tickets: 37,
  },
  {
    city: "New York",
    email: "grace@example.com",
    id: "grace",
    joined: 2012,
    name: "Grace Hopper",
    progress: 95,
    role: "Admiral",
    status: "Active",
    tickets: 58,
  },
  {
    city: "Vienna",
    email: "hedy@example.com",
    id: "hedy",
    joined: 2021,
    name: "Hedy Lamarr",
    progress: 40,
    role: "Inventor",
    status: "Offline",
    tickets: 12,
  },
  {
    city: "Hampton",
    email: "katherine@example.com",
    id: "katherine",
    joined: 2016,
    name: "Katherine Johnson",
    progress: 77,
    role: "Mathematician",
    status: "Away",
    tickets: 51,
  },
  {
    city: "Boston",
    email: "margaret@example.com",
    id: "margaret",
    joined: 2013,
    name: "Margaret Hamilton",
    progress: 88,
    role: "Director",
    status: "Active",
    tickets: 64,
  },
]

export type Person = (typeof people)[number]

export const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "city", label: "Location" },
  { key: "tickets", label: "Tickets", numeric: true },
]

export const initials = (name: unknown) =>
  String(name)
    .split(" ")
    .map((word) => word[0])
    .join("")
