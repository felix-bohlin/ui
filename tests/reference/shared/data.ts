export type User = {
  bio: string
  handle: string
  initials: string
  joined: string
  location: string
  name: string
  photo?: string
}

export type Reaction = { count: number; label: string; value: string }

export type Post = {
  author: string
  datetime: string
  id: string
  photos: string[]
  reactions: Reaction[]
  text: string
  time: string
}

export type ChatMessage = {
  datetime: string
  from: string
  text: string
  time: string
}

export type ChatLine =
  | ({ kind: "message" } & ChatMessage)
  | { kind: "divider"; label: string }

export type Conversation = { lines: ChatLine[]; unread: number; with: string }

export type Notification = {
  href: string
  id: string
  read: boolean
  text: string
}

export type Photo = { alt: string; by: string; id: string; src: string }

export const ME = "sam"

export const USERS: User[] = [
  {
    bio: "Bass player, coffee snob, and the one who always brings snacks to rehearsal.",
    handle: "holly",
    initials: "HH",
    joined: "March 2024",
    location: "Gothenburg",
    name: "Holly Humbucker",
    photo: "/photos/holly-humbucker.png",
  },
  {
    bio: "Drums on weekends, spreadsheets on weekdays.",
    handle: "lou",
    initials: "LH",
    joined: "January 2025",
    location: "Malmö",
    name: "Lou Headstock",
    photo: "/photos/lou-headstock.png",
  },
  {
    bio: "Writes songs about trains. Has never been on a night train.",
    handle: "percy",
    initials: "PG",
    joined: "June 2023",
    location: "Uppsala",
    name: "Percy Groove",
    photo: "/photos/percy-groove.png",
  },
  {
    bio: "Photographer. Mostly harbors, sometimes cats.",
    handle: "ada",
    initials: "AO",
    joined: "August 2025",
    location: "Lisbon",
    name: "Ada Okafor",
  },
  {
    bio: "Keeps a list of every concert since 2009.",
    handle: "juno",
    initials: "JP",
    joined: "February 2026",
    location: "Oslo",
    name: "Juno Park",
  },
  {
    bio: "Organizes the Thursday jam. Bring your own cable.",
    handle: "sam",
    initials: "SR",
    joined: "May 2022",
    location: "Stockholm",
    name: "Sam Rivera",
  },
]

const reactions = (like: number, laugh: number, wow: number) => [
  { count: like, label: "Like", value: "like" },
  { count: laugh, label: "Laugh", value: "laugh" },
  { count: wow, label: "Wow", value: "wow" },
]

export const POSTS: Post[] = [
  {
    author: "holly",
    datetime: "2026-11-18T19:42",
    id: "p12",
    photos: [],
    reactions: reactions(12, 3, 0),
    text: "New strings on the bass. Nobody in the band has noticed yet, but I know.",
    time: "Nov 18, 19:42",
  },
  {
    author: "ada",
    datetime: "2026-11-18T17:05",
    id: "p11",
    photos: ["harbor", "glacier"],
    reactions: reactions(31, 0, 9),
    text: "Two mornings, two very different blues.",
    time: "Nov 18, 17:05",
  },
  {
    author: "lou",
    datetime: "2026-11-18T12:30",
    id: "p10",
    photos: [],
    reactions: reactions(4, 7, 1),
    text: "Reminder: the rehearsal room moved one floor down. The old one is now a yoga studio and they were very polite about it.",
    time: "Nov 18, 12:30",
  },
  {
    author: "sam",
    datetime: "2026-11-17T21:14",
    id: "p9",
    photos: [],
    reactions: reactions(8, 0, 0),
    text: "Thursday jam is on. Bring your own cable, I mean it this time.",
    time: "Nov 17, 21:14",
  },
  {
    author: "percy",
    datetime: "2026-11-17T16:48",
    id: "p8",
    photos: [],
    reactions: reactions(2, 1, 0),
    text: "Setlist draft: https://example.com/setlists/percy/thursday-jam-final-final-really-final-version-2026-11-17",
    time: "Nov 17, 16:48",
  },
  {
    author: "juno",
    datetime: "2026-11-16T22:01",
    id: "p7",
    photos: ["city"],
    reactions: reactions(19, 2, 4),
    text: "Concert number 312. Still worth it.",
    time: "Nov 16, 22:01",
  },
  {
    author: "holly",
    datetime: "2026-11-16T10:15",
    id: "p6",
    photos: [],
    reactions: reactions(6, 0, 0),
    text: "Does anyone have a spare capo? Asking for the guitarist who borrowed mine.",
    time: "Nov 16, 10:15",
  },
  {
    author: "ada",
    datetime: "2026-11-15T08:40",
    id: "p5",
    photos: ["forest", "meadow", "desert"],
    reactions: reactions(44, 1, 12),
    text: "Weekend trip, three places, zero cats.",
    time: "Nov 15, 08:40",
  },
  {
    author: "lou",
    datetime: "2026-11-14T18:22",
    id: "p4",
    photos: [],
    reactions: reactions(3, 9, 0),
    text: "Counted in a song at the wrong tempo and we played the whole thing that way. It was better.",
    time: "Nov 14, 18:22",
  },
  {
    author: "percy",
    datetime: "2026-11-13T13:03",
    id: "p3",
    photos: [],
    reactions: reactions(5, 0, 1),
    text: "Wrote a song about the 06:12 to Uppsala. It is four minutes long, like the delay.",
    time: "Nov 13, 13:03",
  },
  {
    author: "juno",
    datetime: "2026-11-12T20:55",
    id: "p2",
    photos: [],
    reactions: reactions(7, 0, 0),
    text: "Ticket stubs sorted by year. This is my idea of a quiet evening.",
    time: "Nov 12, 20:55",
  },
  {
    author: "sam",
    datetime: "2026-11-11T09:30",
    id: "p1",
    photos: [],
    reactions: reactions(10, 0, 2),
    text: "Welcome to the new group page. Be nice, post photos.",
    time: "Nov 11, 09:30",
  },
]

const message = (from: string, datetime: string, text: string): ChatLine => ({
  datetime,
  from,
  kind: "message",
  text,
  time: datetime.slice(11),
})

export const CONVERSATIONS: Conversation[] = [
  {
    lines: [
      { kind: "divider", label: "Yesterday" },
      message("holly", "2026-11-18T14:02", "Did you hear the new strings?"),
      message("holly", "2026-11-18T14:03", "Flatwounds. So smooth."),
      message(ME, "2026-11-18T14:18", "Not yet, but I believe you."),
      { kind: "divider", label: "Today" },
      message("holly", "2026-11-19T09:12", "Coming on Thursday?"),
    ],
    unread: 1,
    with: "holly",
  },
  {
    lines: [
      { kind: "divider", label: "Monday" },
      message(ME, "2026-11-17T11:00", "Room moved one floor down, right?"),
      message("lou", "2026-11-17T11:04", "Yes. Follow the smell of incense."),
    ],
    unread: 0,
    with: "lou",
  },
  {
    lines: [
      { kind: "divider", label: "Last week" },
      message("percy", "2026-11-12T19:30", "Can I play the train song again?"),
      message(ME, "2026-11-12T19:31", "Only if it is shorter than the delay."),
    ],
    unread: 0,
    with: "percy",
  },
]

export const NOTIFICATIONS: Notification[] = [
  {
    href: "/chat?with=holly",
    id: "n4",
    read: false,
    text: "Holly Humbucker sent you a message",
  },
  {
    href: "/u/ada",
    id: "n3",
    read: false,
    text: "Ada Okafor posted 2 photos",
  },
  {
    href: "/u/lou",
    id: "n2",
    read: true,
    text: "Lou Headstock liked your post",
  },
  {
    href: "/settings",
    id: "n1",
    read: true,
    text: "Turn on two-factor sign-in",
  },
]

export const PHOTOS: Photo[] = [
  {
    alt: "Boats in a quiet harbor at dawn",
    by: "ada",
    id: "harbor",
    src: "/photos/harbor.svg",
  },
  {
    alt: "Morning fog between pine trees",
    by: "ada",
    id: "forest",
    src: "/photos/forest.svg",
  },
  {
    alt: "Dunes under a low orange sun",
    by: "ada",
    id: "desert",
    src: "/photos/desert.svg",
  },
  {
    alt: "City lights seen from a rooftop",
    by: "juno",
    id: "city",
    src: "/photos/city.svg",
  },
  {
    alt: "A meadow full of wildflowers",
    by: "ada",
    id: "meadow",
    src: "/photos/meadow.svg",
  },
  {
    alt: "Blue ice at the edge of a glacier",
    by: "ada",
    id: "glacier",
    src: "/photos/glacier.svg",
  },
]
