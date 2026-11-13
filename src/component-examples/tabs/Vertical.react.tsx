import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Vertical() {
  return (
    <>
      <Tabs name="vertical-tabs" orientation="vertical">
        <TabsItem defaultChecked>
          <TabsLabel>Profile</TabsLabel>
          <TabsPanel>
            <h3>Profile</h3>
            <p>Your name, photo and the bio people see next to your posts.</p>
          </TabsPanel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Security</TabsLabel>
          <TabsPanel>
            <h3>Security</h3>
            <p>
              Your password, passkeys and the devices signed in to your account.
            </p>
          </TabsPanel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Notifications</TabsLabel>
          <TabsPanel>
            <h3>Notifications</h3>
            <p>Which updates reach you by email and which by push.</p>
          </TabsPanel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Connected apps</TabsLabel>
          <TabsPanel>
            <h3>Connected apps</h3>
            <p>The gig calendar and tuner apps that can read your account.</p>
          </TabsPanel>
        </TabsItem>
      </Tabs>

      <Tabs name="vertical-line-tabs" orientation="vertical" variant="line">
        <TabsItem defaultChecked>
          <TabsLabel>Monday</TabsLabel>
          <TabsPanel>Slap workshops and root note drills, from 9:00.</TabsPanel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Tuesday</TabsLabel>
          <TabsPanel>
            Jams in both rehearsal rooms, and pizza night at 19:00.
          </TabsPanel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Wednesday</TabsLabel>
          <TabsPanel>
            Lightning solos until noon, then the big closing jam.
          </TabsPanel>
        </TabsItem>
      </Tabs>
    </>
  )
}
