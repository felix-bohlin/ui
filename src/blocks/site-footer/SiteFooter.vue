<script setup lang="ts">
import {
  Button,
  ControlGroup,
  Divider,
  Field,
  Form,
  SelectButton,
} from "opui-css/vue"
</script>

<template>
  <footer class="site-footer">
    <div
      class="ui-layout-container ui-layout-column"
      style="--_gap: var(--ui-space-8); --_max-inline-size: 72rem"
    >
      <div
        class="ui-layout-columns"
        style="--_columns: 2fr 3fr; --_gap: var(--ui-space-8)"
      >
        <div class="ui-layout-column" style="--_gap: var(--ui-space-4)">
          <a
            class="sf-brand ui-layout-row ui-gap-small"
            href="#site-footer-home"
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
          <p>The social network for the people who hold the band together.</p>
          <Form action="#" id="site-footer-newsletter">
            <ControlGroup>
              <Field for="site-footer-email" label="Monthly news, no spam">
                <input
                  autocomplete="email"
                  id="site-footer-email"
                  name="email"
                  placeholder="you@lowend.example"
                  required
                  type="email"
                />
              </Field>
              <Button type="submit" variant="filled">Subscribe</Button>
            </ControlGroup>
          </Form>
        </div>
        <nav
          aria-label="More from Bassbook"
          class="sf-links ui-layout-grid"
          style="--_min-inline-size: 9rem"
        >
          <section aria-labelledby="site-footer-product">
            <h2 class="ui-h6" id="site-footer-product">Product</h2>
            <ul class="ui-layout-column ui-gap-small">
              <li><a href="#site-footer-features">Features</a></li>
              <li><a href="#site-footer-pricing">Pricing</a></li>
              <li><a href="#site-footer-apps">Mobile apps</a></li>
              <li><a href="#site-footer-status">Status</a></li>
            </ul>
          </section>
          <section aria-labelledby="site-footer-community">
            <h2 class="ui-h6" id="site-footer-community">Community</h2>
            <ul class="ui-layout-column ui-gap-small">
              <li><a href="#site-footer-forum">Forum</a></li>
              <li><a href="#site-footer-jams">Open jams</a></li>
              <li><a href="#site-footer-lessons">Lessons</a></li>
              <li><a href="#site-footer-magazine">Magazine</a></li>
            </ul>
          </section>
          <section aria-labelledby="site-footer-company">
            <h2 class="ui-h6" id="site-footer-company">Company</h2>
            <ul class="ui-layout-column ui-gap-small">
              <li><a href="#site-footer-about">About us</a></li>
              <li><a href="#site-footer-careers">Careers</a></li>
              <li><a href="#site-footer-press">Press</a></li>
              <li><a href="#site-footer-contact">Contact</a></li>
            </ul>
          </section>
        </nav>
      </div>
      <Divider />
      <div class="sf-legal ui-layout-row ui-spread">
        <p>
          &copy; 2026 Bassbook. Made in Gothenburg, mostly after soundcheck.
        </p>
        <ul class="ui-layout-row">
          <li><a class="ui-link" href="#site-footer-privacy">Privacy</a></li>
          <li><a class="ui-link" href="#site-footer-terms">Terms</a></li>
          <li><a class="ui-link" href="#site-footer-cookies">Cookies</a></li>
        </ul>
        <Field for="site-footer-language" size="small">
          <select
            aria-label="Language"
            id="site-footer-language"
            name="language"
          >
            <SelectButton />
            <option value="de">Deutsch</option>
            <option selected value="en">English</option>
            <option value="sv">Svenska</option>
          </select>
        </Field>
      </div>
    </div>
  </footer>
</template>

<style>
.site-footer {
  background-color: var(--ui-surface-tonal);
  container-type: inline-size;
  padding-block: var(--ui-space-8) var(--ui-space-6);

  .sf-brand {
    align-items: center;
    color: inherit;
    font-size: var(--ui-font-size-large);
    font-weight: var(--ui-font-weight-bold);
    text-decoration: none;
  }

  .sf-links {
    h2 {
      margin-block-end: var(--ui-space-3);
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
</style>
