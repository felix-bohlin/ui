/** @jsxImportSource @solidjs/web */
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Card,
  CardActions,
  CardContent,
  Chip,
  Form,
  Meter,
  Progress,
} from "opui-css/solid"

export default function TriviaQuiz() {
  return (
    <>
      <div
        class="trivia-quiz ui-layout-container ui-layout-column"
        style="--_gap: var(--ui-space-6); --_max-inline-size: 48rem"
      >
        <div class="ui-layout-row ui-spread">
          <hgroup class="ui-hgroup">
            <p class="ui-overline">Bass Trivia, round 2</p>
            <h1 class="ui-h4">Know your strings</h1>
          </hgroup>
          <div class="ui-layout-row ui-gap-small">
            <Chip as="span" label="Score 6" size="small" />
            <Chip
              as="span"
              label="Streak 4"
              severity="warning"
              size="small"
              start={
                <svg
                  data-icon="bolt"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13.6 2.2a1 1 0 0 1 .4 1.1L12.3 10H19a1 1 0 0 1 .78 1.63l-8 10a1 1 0 0 1-1.75-.88L11.7 14H5a1 1 0 0 1-.78-1.63l8-10a1 1 0 0 1 1.38-.17"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
        <div class="ui-layout-column ui-gap-x-small">
          <span
            class="ui-layout-row ui-spread ui-caption"
            id="trivia-quiz-progress"
          >
            <span>Question 7 of 10</span>
            <span>70%</span>
          </span>
          <Progress aria-labelledby="trivia-quiz-progress" max={10} value={7} />
        </div>
        <Card class="tq-card" variant="outlined">
          <CardContent>
            <div class="ui-layout-column ui-gap-x-small">
              <span
                class="ui-layout-row ui-spread ui-caption"
                id="trivia-quiz-time"
              >
                <span>Time left</span>
                <span>12 seconds</span>
              </span>
              <Meter
                aria-labelledby="trivia-quiz-time"
                high={15}
                low={6}
                max={20}
                optimum={20}
                value={12}
              />
            </div>
            <Form action="#" id="trivia-quiz-form">
              <fieldset class="tq-options">
                <legend class="tq-question">
                  Which string is the lowest on a five-string bass?
                </legend>
                <label>
                  <input name="trivia-quiz-answer" type="radio" value="e" />
                  <span aria-hidden="true" class="tq-letter">
                    A
                  </span>
                  <span>Low E</span>
                </label>
                <label>
                  <input
                    defaultChecked
                    name="trivia-quiz-answer"
                    type="radio"
                    value="b"
                  />
                  <span aria-hidden="true" class="tq-letter">
                    B
                  </span>
                  <span>Low B</span>
                </label>
                <label>
                  <input name="trivia-quiz-answer" type="radio" value="a" />
                  <span aria-hidden="true" class="tq-letter">
                    C
                  </span>
                  <span>Low A</span>
                </label>
                <label>
                  <input name="trivia-quiz-answer" type="radio" value="d" />
                  <span aria-hidden="true" class="tq-letter">
                    D
                  </span>
                  <span>Drop D</span>
                </label>
              </fieldset>
            </Form>
            <Callout severity="success">
              <CalloutIcon />
              <CalloutContent>
                <h2>Correct, plus 10 points</h2>
                <p>
                  The low B sits a fourth below the E. Your neighbours have
                  noticed.
                </p>
              </CalloutContent>
            </Callout>
          </CardContent>
          <CardActions>
            <Button type="button" variant="transparent">
              Skip
            </Button>
            <Button type="button" variant="filled">
              <span class="ui-text">Next question</span>
              <svg
                data-icon="arrow-right"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.29-4.3H4a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4"
                ></path>
              </svg>
            </Button>
          </CardActions>
        </Card>
      </div>
      <style>{`
        .trivia-quiz {
          container-type: inline-size;

          .tq-card .ui-content {
            display: grid;
            gap: var(--ui-space-6);
          }

          .tq-question {
            color: var(--ui-text-strong);
            font-size: var(--ui-font-size-700);
            font-weight: var(--ui-font-weight-bold);
            line-height: var(--ui-line-height-tight);
            margin-block-end: var(--ui-space-6);
            padding: 0;
            text-wrap: balance;
          }

          .tq-options {
            border: 0;
            display: grid;
            gap: var(--ui-space-4);
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
            margin: 0;
            padding: 0;

            label {
              align-items: center;
              border: var(--ui-border-width) solid var(--ui-border-color);
              border-radius: var(--ui-radius);
              cursor: pointer;
              display: flex;
              gap: var(--ui-space-4);
              padding: var(--ui-space-5);
              position: relative;
              transition: border-color var(--ui-duration-fast) var(--ui-ease);

              &:hover {
                border-color: var(--ui-primary);
              }

              &:has(:checked) {
                background-color: oklch(from var(--ui-success) l c h / 12%);
                border-color: var(--ui-success);
                color: var(--ui-text-strong);
              }

              &:has(:focus-visible) {
                outline: var(--ui-focus-ring-width) solid var(--ui-focus-ring-color);
                outline-offset: var(--ui-focus-ring-offset);
              }
            }

            input {
              appearance: none;
              margin: 0;
              opacity: 0;
              position: absolute;
            }
          }

          .tq-letter {
            align-items: center;
            background-color: var(--ui-surface-tonal);
            block-size: 2rem;
            border-radius: var(--ui-radius-small);
            display: grid;
            flex: none;
            font-weight: var(--ui-font-weight-bold);
            inline-size: 2rem;
            justify-content: center;
          }

          .tq-options label:has(:checked) .tq-letter {
            background-color: var(--ui-success);
            color: var(--ui-on-fill);
          }
        }
      `}</style>
    </>
  )
}
