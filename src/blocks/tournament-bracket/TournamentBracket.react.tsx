import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Chip,
} from "opui-css/react"

export default function TournamentBracket() {
  return (
    <>
      <div
        className="tournament-bracket ui-layout-container ui-layout-column"
        style={{ "--_gap": "var(--ui-space-7)", "--_max-inline-size": "72rem" }}
      >
        <div className="ui-layout-row ui-spread">
          <hgroup className="ui-hgroup">
            <p className="ui-overline">Bassbook Live, spring 2027</p>
            <h1 className="tb-title">Battle of the bands</h1>
          </hgroup>
          <Chip as="span" dot label="Final on Saturday" severity="info" />
        </div>
        <div
          aria-label="Bracket"
          className="tb-scroll"
          role="region"
          tabIndex={0}
        >
          <div className="tb-bracket">
            <section
              aria-labelledby="tournament-bracket-quarterfinals"
              className="tb-round"
            >
              <h2 className="ui-overline" id="tournament-bracket-quarterfinals">
                Quarterfinals
              </h2>
              <ol className="tb-list">
                <li className="tb-pair">
                  <ol className="tb-list">
                    <li className="tb-match">
                      <span className="tb-team tb-winner">
                        <strong>The Flatwounds</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">87</span>
                      </span>
                      <span className="tb-team">
                        <span>Low B Loyal</span>
                        <span className="ui-tabular-nums">64</span>
                      </span>
                    </li>
                    <li className="tb-match">
                      <span className="tb-team tb-winner">
                        <strong>Sub Club</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">91</span>
                      </span>
                      <span className="tb-team">
                        <span>Thumb Thing</span>
                        <span className="ui-tabular-nums">88</span>
                      </span>
                    </li>
                  </ol>
                </li>
                <li className="tb-pair">
                  <ol className="tb-list">
                    <li className="tb-match">
                      <span className="tb-team tb-winner">
                        <strong>Drop D Dynasty</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">78</span>
                      </span>
                      <span className="tb-team">
                        <span>The Mutes</span>
                        <span className="ui-tabular-nums">70</span>
                      </span>
                    </li>
                    <li className="tb-match">
                      <span className="tb-team tb-winner">
                        <strong>Fretless Five</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">83</span>
                      </span>
                      <span className="tb-team">
                        <span>Slap Happy</span>
                        <span className="ui-tabular-nums">81</span>
                      </span>
                    </li>
                  </ol>
                </li>
              </ol>
            </section>
            <section
              aria-labelledby="tournament-bracket-semifinals"
              className="tb-round"
            >
              <h2 className="ui-overline" id="tournament-bracket-semifinals">
                Semifinals
              </h2>
              <ol className="tb-list">
                <li className="tb-pair">
                  <ol className="tb-list">
                    <li className="tb-match">
                      <span className="tb-team tb-winner">
                        <strong>The Flatwounds</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">90</span>
                      </span>
                      <span className="tb-team">
                        <span>Sub Club</span>
                        <span className="ui-tabular-nums">86</span>
                      </span>
                    </li>
                    <li className="tb-match">
                      <span className="tb-team">
                        <span>Drop D Dynasty</span>
                        <span className="ui-tabular-nums">84</span>
                      </span>
                      <span className="tb-team tb-winner">
                        <strong>Fretless Five</strong>
                        <span className="ui-sr-only">, winner,</span>
                        <span className="ui-tabular-nums">89</span>
                      </span>
                    </li>
                  </ol>
                </li>
              </ol>
            </section>
            <section
              aria-labelledby="tournament-bracket-final"
              className="tb-round"
            >
              <h2 className="ui-overline" id="tournament-bracket-final">
                Final
              </h2>
              <ol className="tb-list">
                <li className="tb-match tb-upcoming">
                  <span className="tb-team">
                    <span>The Flatwounds</span>
                    <span>Sat 20:00</span>
                  </span>
                  <span className="tb-team">
                    <span>Fretless Five</span>
                    <span>Harbour Stage</span>
                  </span>
                </li>
              </ol>
            </section>
            <section
              aria-labelledby="tournament-bracket-champion"
              className="tb-round"
            >
              <h2 className="ui-overline" id="tournament-bracket-champion">
                Champion
              </h2>
              <div className="tb-champion">
                <span aria-hidden="true" className="tb-trophy">
                  <svg
                    data-icon="star"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    ></path>
                  </svg>
                </span>
                <strong>To be decided</strong>
                <span className="ui-caption">
                  by the crowd, and a very loud clap meter
                </span>
              </div>
            </section>
          </div>
        </div>
        <Callout severity="info">
          <CalloutIcon />
          <CalloutContent>
            <h2>Vote for the final</h2>
            <p>
              Half of the score comes from the crowd. Voting opens when the
              first band plugs in and closes after the last encore.
            </p>
            <p>
              <Button
                href="#tournament-bracket-vote"
                size="small"
                variant="filled"
              >
                Get a voting pass
              </Button>
            </p>
          </CalloutContent>
        </Callout>
      </div>
      <style>{`
        .tournament-bracket {
          container-type: inline-size;

          .tb-title {
            color: var(--ui-text-strong);
            font-size: clamp(var(--ui-font-size-700), 6cqi, var(--ui-font-size-800));
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            text-transform: uppercase;
          }

          .tb-scroll {
            overflow-x: auto;
            padding-block-end: var(--ui-space-4);
          }

          .tb-bracket {
            --_gap: var(--ui-space-12);
            --_line: var(--ui-border-width-large) solid var(--ui-border-color);

            display: grid;
            gap: var(--_gap);
            grid-template-columns: repeat(4, minmax(12.5rem, 1fr));
            min-inline-size: 62rem;
          }

          .tb-round {
            display: grid;
            gap: var(--ui-space-4);
            grid-template-rows: auto 1fr;
          }

          .tb-list {
            display: flex;
            flex-direction: column;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          .tb-pair {
            display: flex;
            flex: 1;
            position: relative;

            & > .tb-list {
              flex: 1;
            }

            &::after {
              border: var(--_line);
              border-end-end-radius: var(--ui-radius-small);
              border-inline-start: 0;
              border-start-end-radius: var(--ui-radius-small);
              content: "";
              inline-size: calc(var(--_gap) / 2);
              inset-block: 25%;
              inset-inline-end: calc(var(--_gap) / -2);
              position: absolute;
            }
          }

          .tb-match {
            display: grid;
            flex: 1;
            padding-block: var(--ui-space-2);
            place-content: center stretch;
            position: relative;
          }

          .tb-round + .tb-round .tb-match::before {
            border-block-start: var(--_line);
            content: "";
            inline-size: calc(var(--_gap) / 2);
            inset-block-start: 50%;
            inset-inline-start: calc(var(--_gap) / -2);
            position: absolute;
          }

          .tb-team {
            background-color: var(--ui-surface);
            border: var(--ui-border-width) solid var(--ui-border-color);
            display: flex;
            font-size: var(--ui-font-size-small);
            gap: var(--ui-space-4);
            justify-content: space-between;
            padding: var(--ui-space-2) var(--ui-space-4);
            white-space: nowrap;

            &:first-child {
              border-start-end-radius: var(--ui-radius);
              border-start-start-radius: var(--ui-radius);
            }

            &:last-child {
              border-block-start: 0;
              border-end-end-radius: var(--ui-radius);
              border-end-start-radius: var(--ui-radius);
            }

            span:last-child {
              color: var(--ui-text-subtle);
            }
          }

          .tb-winner {
            background-color: oklch(from var(--ui-primary) l c h / 12%);
            color: var(--ui-text-strong);

            span:last-child {
              color: var(--ui-text-strong);
              font-weight: var(--ui-font-weight-heading);
            }
          }

          .tb-upcoming .tb-team span:last-child {
            font-size: var(--ui-font-size-caption);
          }

          .tb-champion {
            align-content: center;
            display: grid;
            justify-items: center;
            text-align: center;

            strong {
              color: var(--ui-text-strong);
              font-size: var(--ui-font-size-large);
            }
          }

          .tb-trophy {
            align-items: center;
            background-color: oklch(from var(--ui-warning) l c h / 20%);
            block-size: 4rem;
            border: var(--ui-border-width-large) dashed var(--ui-warning);
            border-radius: var(--ui-radius-round);
            color: var(--ui-warning-text);
            display: grid;
            inline-size: 4rem;
            justify-content: center;
            margin-block-end: var(--ui-space-4);
          }
        }
      `}</style>
    </>
  )
}
