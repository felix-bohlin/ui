/** @jsxImportSource @solidjs/web */
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  List,
  ListItem,
  Menu,
} from "opui-css/solid"

export default function SiteHeader() {
  return (
    <>
      <div class="site-header">
        <header class="sh-bar">
          <a
            class="sh-brand ui-layout-row ui-gap-small"
            href="#site-header-home"
          >
            <svg
              data-icon="box"
              aria-hidden="true"
              class="ui-icon ui-large"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2 3 7v10l9 5 9-5V7zm0 2.3 6.6 3.7L12 11.7 5.4 8zM5 9.7l6 3.4v6.6l-6-3.4zm8 10v-6.6l6-3.4v6.6z"
              ></path>
            </svg>
            Bassbook
          </a>
          <nav aria-label="Site" class="sh-nav">
            <ul class="ui-layout-row ui-gap-x-small">
              <li>
                <Button
                  aria-current="page"
                  href="#site-header-features"
                  variant="transparent"
                >
                  Features
                </Button>
              </li>
              <li>
                <Button href="#site-header-bands" variant="transparent">
                  Bands
                </Button>
              </li>
              <li>
                <Button href="#site-header-gigs" variant="transparent">
                  Gigs
                </Button>
              </li>
              <li>
                <Button
                  command="toggle-popover"
                  commandfor="site-header-community"
                  type="button"
                  variant="transparent"
                >
                  <span class="ui-text">Community</span>
                  <svg
                    data-icon="chevron-down"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  id="site-header-community"
                  items={[
                    { href: "#site-header-forum", label: "Forum" },
                    { href: "#site-header-jams", label: "Open jams" },
                    { href: "#site-header-lessons", label: "Lessons" },
                    { href: "#site-header-magazine", label: "Magazine" },
                  ]}
                />
              </li>
              <li>
                <Button href="#site-header-pricing" variant="transparent">
                  Pricing
                </Button>
              </li>
            </ul>
          </nav>
          <div class="sh-actions ui-layout-row ui-gap-small">
            <Button
              class="sh-sign-in"
              href="#site-header-sign-in"
              variant="outlined"
            >
              Sign in
            </Button>
            <Button href="#site-header-join" variant="filled">
              Join free
            </Button>
            <Button
              aria-label="Open navigation"
              class="sh-menu-button"
              command="show-modal"
              commandfor="site-header-drawer"
              round
              type="button"
            >
              <svg
                data-icon="menu"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                ></path>
              </svg>
            </Button>
          </div>
        </header>
        <Drawer id="site-header-drawer" scrollLock side="inline-end">
          <DrawerHeader closeButton closeLabel="Close navigation">
            <DrawerTitle>Bassbook</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <nav aria-label="Site menu">
              <List variant="transparent">
                <ListItem
                  aria-current="page"
                  href="#site-header-features"
                  label="Features"
                />
                <ListItem href="#site-header-bands" label="Bands" />
                <ListItem href="#site-header-gigs" label="Gigs" />
                <ListItem href="#site-header-forum" label="Forum" />
                <ListItem href="#site-header-jams" label="Open jams" />
                <ListItem href="#site-header-lessons" label="Lessons" />
                <ListItem href="#site-header-magazine" label="Magazine" />
                <ListItem href="#site-header-pricing" label="Pricing" />
                <ListItem href="#site-header-sign-in" label="Sign in" />
              </List>
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
      <style>{`
        .site-header {
          container-type: inline-size;

          .sh-bar {
            align-items: center;
            border-block-end: var(--ui-border-width) solid var(--ui-border-color);
            display: flex;
            gap: var(--ui-space-5);
            padding: var(--ui-space-4) var(--ui-space-5);
          }

          .sh-brand {
            align-items: center;
            color: inherit;
            font-size: var(--ui-font-size-large);
            font-weight: var(--ui-font-weight-bold);
            text-decoration: none;
          }

          .sh-nav {
            display: none;
            margin-inline-end: auto;

            @container (inline-size >= 52rem) {
              display: block;
            }
          }

          .sh-actions {
            margin-inline-start: auto;
          }

          .sh-sign-in {
            display: none;

            @container (inline-size >= 36rem) {
              display: inline-flex;
            }
          }

          .sh-menu-button {
            @container (inline-size >= 52rem) {
              display: none;
            }
          }

          @container (inline-size >= 52rem) {
            .sh-actions {
              margin-inline-start: 0;
            }
          }
        }
      `}</style>
    </>
  )
}
