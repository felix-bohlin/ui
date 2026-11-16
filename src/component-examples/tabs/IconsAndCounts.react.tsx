import { Chip, Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function IconsAndCounts() {
  return (
    <Tabs name="tabs-icons-and-counts-1" variant="line">
      <TabsItem defaultChecked>
        <TabsLabel>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 12h-4a3 3 0 0 1-6 0H5V5h14z"
            ></path>
          </svg>
          Inbox
          <Chip as="span" label="12" size="x-small" />
        </TabsLabel>
        <TabsPanel>12 unread messages from fellow bassists.</TabsPanel>
      </TabsItem>
      <TabsItem>
        <TabsLabel>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m2 21 21-9L2 3v7l15 2-15 2z"></path>
          </svg>
          Sent
        </TabsLabel>
        <TabsPanel>Replies you sent this week.</TabsPanel>
      </TabsItem>
      <TabsItem>
        <TabsLabel>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
            ></path>
          </svg>
          Drafts
          <Chip as="span" label="3" size="x-small" />
        </TabsLabel>
        <TabsPanel>Three replies you haven't sent yet.</TabsPanel>
      </TabsItem>
    </Tabs>
  )
}
