<script setup lang="ts">
import {
  Avatar,
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Card,
  CardContent,
  FieldGroup,
  Form,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <div
    class="forgot-password ui-layout-container"
    style="--_max-inline-size: 56rem"
  >
    <div
      class="ui-layout-grid ui-large forgot-password-grid"
      style="--_max-columns: 2; --_min-inline-size: 19rem"
    >
      <Card
        aria-labelledby="forgot-password-heading"
        as="section"
        density="spacious"
        variant="outlined"
      >
        <CardContent>
          <Avatar class="forgot-password-icon" shape="squircle">
            <svg
              data-icon="key"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"
              ></path>
            </svg>
          </Avatar>
          <hgroup>
            <h1 class="ui-h4" id="forgot-password-heading">
              Whoops, forgot your password?
            </h1>
            <p>
              Happens to the best of us! Type your email and we'll send a link.
            </p>
          </hgroup>
          <Form action="#">
            <FieldGroup>
              <TextField
                endText="The link works for 30 minutes, so be quick!"
                for="forgot-password-email"
                label="Email"
              >
                <input
                  aria-describedby="forgot-password-email-end-text"
                  autocomplete="email"
                  id="forgot-password-email"
                  name="email"
                  placeholder="rory@lowend.example"
                  required
                  type="email"
                />
              </TextField>
              <Button
                class="forgot-password-submit"
                type="submit"
                variant="filled"
              >
                Send reset link
              </Button>
            </FieldGroup>
          </Form>
          <p class="forgot-password-footer">
            <a
              class="ui-link forgot-password-back"
              href="#forgot-password-sign-in"
              ><svg
                data-icon="arrow-left"
                aria-hidden="true"
                class="ui-icon ui-small"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
                ></path></svg
              >Back to sign in</a
            >
          </p>
        </CardContent>
      </Card>
      <Card
        aria-labelledby="forgot-password-sent-heading"
        as="section"
        density="spacious"
        variant="outlined"
      >
        <CardContent>
          <Avatar class="forgot-password-icon" shape="squircle">
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
          </Avatar>
          <hgroup>
            <h2 class="ui-h4" id="forgot-password-sent-heading">
              Check your inbox!
            </h2>
            <p>We sent a reset link to <strong>rory@lowend.example</strong>.</p>
          </hgroup>
          <Callout severity="info">
            <CalloutIcon />
            <CalloutContent>
              Can't find it? Peek in your spam folder, or wait a minute before
              asking for a new one.
            </CalloutContent>
          </Callout>
          <Button
            class="forgot-password-submit"
            href="#forgot-password-open-mail"
            variant="filled"
            >Open email app</Button
          >
          <p class="forgot-password-footer">
            Still nothing? Bummer.
            <Button size="small" type="button">Resend link</Button>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style>
.forgot-password {
  .forgot-password-grid {
    align-items: start;
  }

  hgroup {
    text-align: center;
  }

  .ui-content {
    display: grid;
    gap: var(--ui-space-4);
  }

  .forgot-password-icon {
    justify-self: center;
  }

  .forgot-password-submit {
    inline-size: 100%;
  }

  .forgot-password-footer {
    text-align: center;
  }

  .forgot-password-back {
    align-items: center;
    display: inline-flex;
    gap: var(--ui-space-1);
  }
}
</style>
