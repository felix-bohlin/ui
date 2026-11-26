import {
  Button,
  ControlGroup,
  Divider,
  Field,
  Form,
  SelectButton,
} from "opui-css/react"

export default function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div
          className="ui-layout-container ui-layout-column"
          style={{
            "--_gap": "var(--ui-space-12)",
            "--_max-inline-size": "72rem",
          }}
        >
          <div
            className="ui-layout-columns"
            style={{ "--_columns": "2fr 3fr", "--_gap": "var(--ui-space-12)" }}
          >
            <div
              className="ui-layout-column"
              style={{ "--_gap": "var(--ui-space-5)" }}
            >
              <a
                className="sf-brand ui-layout-row ui-gap-small"
                href="#site-footer-home"
              >
                <svg
                  data-icon="box"
                  aria-hidden="true"
                  className="ui-icon ui-large"
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
              <p>
                The social network for the people who hold the band together.
              </p>
              <Form action="#" id="site-footer-newsletter">
                <ControlGroup>
                  <Field
                    htmlFor="site-footer-email"
                    label="Monthly news, no spam"
                  >
                    <input
                      autoComplete="email"
                      id="site-footer-email"
                      name="email"
                      placeholder="you@bassmail.example"
                      required
                      type="email"
                    />
                  </Field>
                  <Button type="submit" variant="filled">
                    Subscribe
                  </Button>
                </ControlGroup>
              </Form>
            </div>
            <nav
              aria-label="More from Bassbook"
              className="sf-links ui-layout-grid"
              style={{ "--_min-inline-size": "9rem" }}
            >
              <section aria-labelledby="site-footer-product">
                <h2 className="ui-h6" id="site-footer-product">
                  Product
                </h2>
                <ul className="ui-layout-column ui-gap-small">
                  <li>
                    <a href="#site-footer-features">Features</a>
                  </li>
                  <li>
                    <a href="#site-footer-pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="#site-footer-apps">Mobile apps</a>
                  </li>
                  <li>
                    <a href="#site-footer-status">Status</a>
                  </li>
                </ul>
              </section>
              <section aria-labelledby="site-footer-community">
                <h2 className="ui-h6" id="site-footer-community">
                  Community
                </h2>
                <ul className="ui-layout-column ui-gap-small">
                  <li>
                    <a href="#site-footer-forum">Forum</a>
                  </li>
                  <li>
                    <a href="#site-footer-jams">Open jams</a>
                  </li>
                  <li>
                    <a href="#site-footer-lessons">Lessons</a>
                  </li>
                  <li>
                    <a href="#site-footer-magazine">Magazine</a>
                  </li>
                </ul>
              </section>
              <section aria-labelledby="site-footer-company">
                <h2 className="ui-h6" id="site-footer-company">
                  Company
                </h2>
                <ul className="ui-layout-column ui-gap-small">
                  <li>
                    <a href="#site-footer-about">About us</a>
                  </li>
                  <li>
                    <a href="#site-footer-careers">Careers</a>
                  </li>
                  <li>
                    <a href="#site-footer-press">Press</a>
                  </li>
                  <li>
                    <a href="#site-footer-contact">Contact</a>
                  </li>
                </ul>
              </section>
            </nav>
          </div>
          <Divider />
          <div className="sf-legal ui-layout-row ui-spread">
            <p>
              &copy; 2026 Bassbook. Made in Gothenburg, mostly after soundcheck.
            </p>
            <ul className="ui-layout-row">
              <li>
                <a className="ui-link" href="#site-footer-privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a className="ui-link" href="#site-footer-terms">
                  Terms
                </a>
              </li>
              <li>
                <a className="ui-link" href="#site-footer-cookies">
                  Cookies
                </a>
              </li>
            </ul>
            <Field htmlFor="site-footer-language" size="small">
              <select
                aria-label="Language"
                id="site-footer-language"
                name="language"
                defaultValue="en"
              >
                <SelectButton />
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="sv">Svenska</option>
              </select>
            </Field>
          </div>
        </div>
      </footer>
      <style>{`
        .site-footer {
          background-color: var(--ui-surface-tonal);
          container-type: inline-size;
          padding-block: var(--ui-space-12) var(--ui-space-7);

          .sf-brand {
            align-items: center;
            color: inherit;
            font-size: var(--ui-font-size-large);
            font-weight: var(--ui-font-weight-bold);
            text-decoration: none;
          }

          .sf-links {
            h2 {
              margin-block-end: var(--ui-space-4);
            }

            a {
              color: var(--ui-text-subtle);
              text-decoration: none;

              &:hover {
                color: var(--ui-text-strong);
                text-decoration: underline;
              }
            }
          }

          .sf-legal {
            align-items: center;
            color: var(--ui-text-subtle);
            font-size: var(--ui-font-size-small);
          }
        }
      `}</style>
    </>
  )
}
