import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stat,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"

export default function Leaderboard() {
  return (
    <>
      <div
        className="leaderboard ui-layout-container ui-layout-column ui-large"
        style={{ "--_max-inline-size": "56rem" }}
      >
        <div className="ui-layout-row ui-spread">
          <hgroup className="ui-hgroup">
            <p className="ui-overline">Slap Battle, season 3</p>
            <h1 className="lb-title">High scores</h1>
          </hgroup>
          <ToggleGroup
            aria-label="Period"
            name="leaderboard-period"
            size="small"
          >
            <ToggleButton label="Today" value="today" />
            <ToggleButton defaultChecked label="This week" value="week" />
            <ToggleButton label="All time" value="all" />
          </ToggleGroup>
        </div>
        <section aria-labelledby="leaderboard-podium-heading">
          <h2 className="ui-sr-only" id="leaderboard-podium-heading">
            Top three
          </h2>
          <ol className="lb-podium">
            <li className="lb-first">
              <Avatar aria-hidden="true" size="large" variant="filled">
                SN
              </Avatar>
              <span className="ui-layout-column ui-x-small">
                <strong>Stella Nut</strong>
                <span className="ui-caption ui-tabular-nums">
                  98 420 points
                </span>
              </span>
              <span className="lb-step">
                <span className="ui-sr-only">Place</span>1
              </span>
            </li>
            <li className="lb-second">
              <Avatar aria-hidden="true" size="large">
                RR
              </Avatar>
              <span className="ui-layout-column ui-x-small">
                <strong>Reggie Riff</strong>
                <span className="ui-caption ui-tabular-nums">
                  91 005 points
                </span>
              </span>
              <span className="lb-step">
                <span className="ui-sr-only">Place</span>2
              </span>
            </li>
            <li className="lb-third">
              <Avatar aria-hidden="true" size="large">
                HH
              </Avatar>
              <span className="ui-layout-column ui-x-small">
                <strong>Holly Humbucker</strong>
                <span className="ui-caption ui-tabular-nums">
                  87 760 points
                </span>
              </span>
              <span className="lb-step">
                <span className="ui-sr-only">Place</span>3
              </span>
            </li>
          </ol>
        </section>
        <Table flush overflow="scroll" tabIndex={0}>
          <TableCaption className="ui-sr-only">
            Places 4 to 8, and yours
          </TableCaption>
          <TableHead>
            <TableRow>
              <TableHeaderCell numeric scope="col">
                Place
              </TableHeaderCell>
              <TableHeaderCell scope="col">Player</TableHeaderCell>
              <TableHeaderCell numeric scope="col">
                Best combo
              </TableHeaderCell>
              <TableHeaderCell numeric scope="col">
                Points
              </TableHeaderCell>
              <TableHeaderCell scope="col">This week</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell numeric>4</TableCell>
              <TableCell>
                <div className="ui-layout-media ui-small">
                  <Avatar aria-hidden="true" size="small">
                    LH
                  </Avatar>
                  <span>Lou Headstock</span>
                </div>
              </TableCell>
              <TableCell numeric>64×</TableCell>
              <TableCell numeric>82 310</TableCell>
              <TableCell>
                <Chip as="span" label="Up 2" severity="success" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell numeric>5</TableCell>
              <TableCell>
                <div className="ui-layout-media ui-small">
                  <Avatar aria-hidden="true" size="small">
                    MM
                  </Avatar>
                  <span>Mo Mute</span>
                </div>
              </TableCell>
              <TableCell numeric>58×</TableCell>
              <TableCell numeric>79 880</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  label="Down 1"
                  severity="critical"
                  size="small"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell numeric>6</TableCell>
              <TableCell>
                <div className="ui-layout-media ui-small">
                  <Avatar aria-hidden="true" size="small">
                    FF
                  </Avatar>
                  <span>Fran Fretless</span>
                </div>
              </TableCell>
              <TableCell numeric>51×</TableCell>
              <TableCell numeric>74 125</TableCell>
              <TableCell>
                <Chip as="span" label="New" severity="info" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell numeric>7</TableCell>
              <TableCell>
                <div className="ui-layout-media ui-small">
                  <Avatar aria-hidden="true" size="small">
                    DD
                  </Avatar>
                  <span>Dee Detune</span>
                </div>
              </TableCell>
              <TableCell numeric>49×</TableCell>
              <TableCell numeric>70 040</TableCell>
              <TableCell>
                <Chip as="span" label="Same" size="small" />
              </TableCell>
            </TableRow>
            <TableRow className="lb-you">
              <TableCell numeric>42</TableCell>
              <TableCell>
                <div className="ui-layout-media ui-small">
                  <Avatar aria-hidden="true" size="small" variant="filled">
                    PG
                  </Avatar>
                  <span>
                    <strong>Percy Groove (you)</strong>
                  </span>
                </div>
              </TableCell>
              <TableCell numeric>23×</TableCell>
              <TableCell numeric>31 600</TableCell>
              <TableCell>
                <Chip as="span" label="Up 18" severity="success" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <section
          aria-labelledby="leaderboard-stats-heading"
          className="ui-layout-column ui-small"
        >
          <h2 className="ui-h5" id="leaderboard-stats-heading">
            Your week
          </h2>
          <div
            className="ui-layout-grid ui-stretch"
            style={{ "--_min-inline-size": "12rem" }}
          >
            <Card variant="outlined">
              <CardContent>
                <Stat
                  description={
                    <>
                      <span className="ui-caption ui-success">+9</span> from
                      last week
                    </>
                  }
                  label="Games played"
                >
                  37
                </Stat>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Stat
                  description={
                    <>
                      <span className="ui-caption ui-success">+6%</span> from
                      last week
                    </>
                  }
                  label="Win rate"
                >
                  58%
                </Stat>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Stat
                  description="Mostly the low B, as usual"
                  label="Notes missed"
                >
                  214
                </Stat>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <style>{`
        .leaderboard {
          container-type: inline-size;

          .lb-title {
            font-size: var(--ui-font-size-800);
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            text-transform: uppercase;
          }

          .lb-podium {
            align-items: end;
            display: grid;
            gap: var(--ui-space-3);
            grid-template-columns: repeat(3, minmax(0, 1fr));
            list-style-type: none;
            padding: 0;

            li {
              display: grid;
              gap: var(--ui-space-2);
              justify-items: center;
              text-align: center;
            }

            .lb-step {
              align-content: start;
              background-color: oklch(from var(--_place) l c h / 25%);
              block-size: var(--_height);
              border-block-start: var(--ui-border-width-large) solid var(--_place);
              border-start-end-radius: var(--ui-radius);
              border-start-start-radius: var(--ui-radius);
              display: grid;
              font-size: var(--ui-font-size-800);
              font-weight: var(--ui-font-weight-bold);
              inline-size: 100%;
              padding-block-start: var(--ui-space-3);
            }

            .lb-first {
              --_height: 9rem;
              --_place: var(--ui-primary);

              order: 2;
            }

            .lb-second {
              --_height: 6.5rem;
              --_place: var(--ui-neutral);

              order: 1;
            }

            .lb-third {
              --_height: 5rem;
              --_place: var(--ui-orange);

              order: 3;
            }
          }

          .lb-you {
            background-color: oklch(from var(--ui-primary) l c h / 12%);
          }
        }
      `}</style>
    </>
  )
}
