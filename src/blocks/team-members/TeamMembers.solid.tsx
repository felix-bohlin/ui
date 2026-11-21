/** @jsxImportSource @solidjs/web */
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  Menu,
  Progress,
  Select,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  TextField,
} from "opui-css/solid"

export default function TeamMembers() {
  return (
    <>
      <div
        class="team-members ui-layout-container ui-layout-column ui-large"
        style="--_max-inline-size: 58rem"
      >
        <div class="ui-layout-row ui-spread">
          <hgroup class="ui-hgroup">
            <h1 class="ui-h3">Band members</h1>
            <p>Invite bandmates and pick what they get to do.</p>
          </hgroup>
          <div class="ui-layout-column ui-x-small team-seats">
            <p id="team-members-seats">8 of 10 seats in the van</p>
            <Progress aria-labelledby="team-members-seats" max={10} value={8} />
          </div>
        </div>
        <Card
          aria-labelledby="team-members-invite-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="team-members-invite-heading">
              Invite bandmates
            </h2>
            <p>They'll get a totally rad link that works for 7 days.</p>
          </hgroup>
          <CardContent>
            <form class="team-invite" action="#">
              <TextField for="team-members-emails" label="Email addresses">
                <input
                  id="team-members-emails"
                  multiple
                  name="emails"
                  placeholder="drummer@band.example, singer@band.example"
                  required
                  type="email"
                />
              </TextField>
              <Select
                id="team-members-role"
                items={[
                  { label: "Admin", value: "admin" },
                  { label: "Merch", value: "billing" },
                  { label: "Member", selected: true, value: "member" },
                  { label: "Fan", value: "viewer" },
                ]}
                label="Role"
                name="role"
              />
              <Button type="submit" variant="filled">
                <svg
                  data-icon="send"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
                  ></path>
                </svg>
                <span class="ui-text">Send invites</span>
              </Button>
            </form>
          </CardContent>
        </Card>
        <Tabs
          class="team-tabs"
          name="team-members-tabs"
          style="--_panel-gap: var(--ui-space-3)"
        >
          <TabsItem defaultChecked id="team-members-tab-members">
            <TabsLabel>Members (6)</TabsLabel>
            <TabsPanel>
              <Card variant="outlined">
                <List bordered class="team-list" variant="transparent">
                  <ListItem
                    class="team-end"
                    description="holly@lowenders.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="Active"
                          severity="success"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Band leader"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Holly Humbucker"
                          command="toggle-popover"
                          commandfor="team-members-menu-hh"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-hh"
                          items={[
                            { label: "View profile" },
                            { label: "Send a poke" },
                          ]}
                        />
                      </>
                    }
                    label="Holly Humbucker"
                    start={
                      <Avatar aria-label="Holly Humbucker" role="img">
                        HH
                      </Avatar>
                    }
                  />
                  <ListItem
                    class="team-end"
                    description="ines@lowenders.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="Active"
                          severity="success"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Admin"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Ines Hertz"
                          command="toggle-popover"
                          commandfor="team-members-menu-ih"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-ih"
                          items={[
                            { label: "Change role" },
                            { label: "Reset 2FA" },
                            {
                              borderTop: true,
                              color: "critical",
                              label: "Remove from band",
                            },
                          ]}
                        />
                      </>
                    }
                    label="Ines Hertz"
                    start={
                      <Avatar aria-label="Ines Hertz" role="img">
                        IH
                      </Avatar>
                    }
                  />
                  <ListItem
                    class="team-end"
                    description="lou@lowenders.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="Active"
                          severity="success"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Member"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Lou Headstock"
                          command="toggle-popover"
                          commandfor="team-members-menu-lh"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-lh"
                          items={[
                            { label: "Change role" },
                            { label: "Reset 2FA" },
                            {
                              borderTop: true,
                              color: "critical",
                              label: "Remove from band",
                            },
                          ]}
                        />
                      </>
                    }
                    label="Lou Headstock"
                    start={
                      <Avatar aria-label="Lou Headstock" role="img">
                        LH
                      </Avatar>
                    }
                  />
                  <ListItem
                    class="team-end"
                    description="percy@lowenders.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="2FA not set up"
                          severity="warning"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Member"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Percy Groove"
                          command="toggle-popover"
                          commandfor="team-members-menu-pg"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-pg"
                          items={[
                            { label: "Change role" },
                            { label: "Reset 2FA" },
                            {
                              borderTop: true,
                              color: "critical",
                              label: "Remove from band",
                            },
                          ]}
                        />
                      </>
                    }
                    label="Percy Groove"
                    start={
                      <Avatar aria-label="Percy Groove" role="img">
                        PG
                      </Avatar>
                    }
                  />
                  <ListItem
                    class="team-end"
                    description="rory@lowend.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="Active"
                          severity="success"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Merch"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Rory Rootnote"
                          command="toggle-popover"
                          commandfor="team-members-menu-rr"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-rr"
                          items={[
                            { label: "Change role" },
                            { label: "Reset 2FA" },
                            {
                              borderTop: true,
                              color: "critical",
                              label: "Leave the band",
                            },
                          ]}
                        />
                      </>
                    }
                    label="Rory Rootnote (you)"
                    start={
                      <Avatar aria-label="Rory Rootnote" role="img">
                        RR
                      </Avatar>
                    }
                  />
                  <ListItem
                    class="team-end"
                    description="stella@lowenders.example"
                    end={
                      <>
                        <Chip
                          as="span"
                          class="team-status"
                          dot
                          label="On a break"
                          severity="neutral"
                          size="small"
                        />
                        <Chip
                          as="span"
                          label="Member"
                          size="small"
                          variant="outlined"
                        />
                        <Button
                          aria-label="Actions for Stella Nut"
                          command="toggle-popover"
                          commandfor="team-members-menu-sn"
                          round
                          size="small"
                          type="button"
                        >
                          <svg
                            data-icon="more-vertical"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                            ></path>
                          </svg>
                        </Button>
                        <Menu
                          align="end"
                          id="team-members-menu-sn"
                          items={[
                            { label: "Change role" },
                            { label: "Reactivate" },
                            {
                              borderTop: true,
                              color: "critical",
                              label: "Remove from band",
                            },
                          ]}
                        />
                      </>
                    }
                    label="Stella Nut"
                    start={
                      <Avatar aria-label="Stella Nut" role="img">
                        SN
                      </Avatar>
                    }
                  />
                </List>
              </Card>
            </TabsPanel>
          </TabsItem>
          <TabsItem id="team-members-tab-pending">
            <TabsLabel>Pending invites (2)</TabsLabel>
            <TabsPanel>
              <Card variant="outlined">
                <List bordered class="team-list" variant="transparent">
                  <ListItem
                    class="team-pending-actions"
                    description="Member, invited by Holly Humbucker on 6 Oct 2026"
                    end={
                      <>
                        <Button size="small" type="button">
                          Resend
                        </Button>
                        <Button color="critical" size="small" type="button">
                          Revoke
                        </Button>
                      </>
                    }
                    label="tambourine.tam@lowenders.example"
                    start={
                      <svg
                        data-icon="mail"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
                        ></path>
                      </svg>
                    }
                  />
                  <ListItem
                    class="team-pending-actions"
                    description="Admin, expires in 2 days"
                    end={
                      <>
                        <Button size="small" type="button">
                          Resend
                        </Button>
                        <Button color="critical" size="small" type="button">
                          Revoke
                        </Button>
                      </>
                    }
                    label="keytar.kit@lowenders.example"
                    start={
                      <svg
                        data-icon="mail"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
                        ></path>
                      </svg>
                    }
                  />
                </List>
              </Card>
            </TabsPanel>
          </TabsItem>
        </Tabs>
      </div>
      <style>{`
        .team-members {
          container-type: inline-size;

          .team-seats {
            inline-size: min(100%, 14rem);
          }

          .team-invite {
            align-items: end;
            display: grid;
            gap: var(--ui-space-3);
            grid-template-columns: minmax(0, 1fr);

            @container (inline-size >= 40rem) {
              grid-template-columns: minmax(0, 1fr) 10rem auto;
            }
          }

          .team-end > .ui-end {
            gap: var(--ui-space-2);

            @container (inline-size >= 40rem) {
              display: grid;
              grid-template-columns: 9rem 5rem auto;
              justify-items: start;
            }
          }

          .team-list .ui-text p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .team-status {
            display: none;

            @container (inline-size >= 40rem) {
              display: inline-flex;
            }
          }

          .team-pending-actions > .ui-end {
            align-items: end;
            flex-direction: column;
            gap: var(--ui-space-1);

            @container (inline-size >= 40rem) {
              align-items: center;
              flex-direction: row;
            }
          }
        }
      `}</style>
    </>
  )
}
