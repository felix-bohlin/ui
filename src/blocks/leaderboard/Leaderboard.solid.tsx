/** @jsxImportSource @solidjs/web */
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
} from "opui-css/solid"

export default function Leaderboard() {
  return (
    <>
      <div
        class="leaderboard ui-layout-container ui-layout-column ui-gap-large"
        style="--_max-inline-size: 56rem"
      >
        <div class="ui-layout-row ui-spread">
          <hgroup class="ui-hgroup">
            <p class="ui-overline">Slap Battle, season 3</p>
            <h1 class="lb-title">High scores</h1>
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
          <h2 class="ui-sr-only" id="leaderboard-podium-heading">
            Top three
          </h2>
          <ol class="lb-podium">
            <li class="lb-first">
              <Avatar aria-hidden="true" size="large" variant="filled">
                EN
              </Avatar>
              <span class="ui-layout-column ui-gap-x-small">
                <strong>Ellen Nut</strong>
                <span class="ui-caption ui-tabular-nums">98 420 points</span>
              </span>
              <span class="lb-step">
                <span class="ui-sr-only">Place</span>1
              </span>
            </li>
            <li class="lb-second">
              <Avatar aria-hidden="true" size="large">
                LR
              </Avatar>
              <span class="ui-layout-column ui-gap-x-small">
                <strong>Leland Riff</strong>
                <span class="ui-caption ui-tabular-nums">91 005 points</span>
              </span>
              <span class="lb-step">
                <span class="ui-sr-only">Place</span>2
              </span>
            </li>
            <li class="lb-third">
              <Avatar aria-hidden="true" size="large">
                SH
              </Avatar>
              <span class="ui-layout-column ui-gap-x-small">
                <strong>Scott Humbucker</strong>
                <span class="ui-caption ui-tabular-nums">87 760 points</span>
              </span>
              <span class="lb-step">
                <span class="ui-sr-only">Place</span>3
              </span>
            </li>
          </ol>
        </section>
        <Table class="lb-table" flush overflow="scroll" tabindex={0}>
          <TableCaption class="ui-sr-only">
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
                <div class="ui-layout-media ui-gap-small">
                  <Avatar aria-hidden="true" size="small">
                    KH
                  </Avatar>
                  <span>Kinga Headstock</span>
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
                <div class="ui-layout-media ui-gap-small">
                  <Avatar aria-hidden="true" size="small">
                    IM
                  </Avatar>
                  <span>Ian Mute</span>
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
                <div class="ui-layout-media ui-gap-small">
                  <Avatar aria-hidden="true" size="small">
                    EF
                  </Avatar>
                  <span>Esperanza Fretless</span>
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
                <div class="ui-layout-media ui-gap-small">
                  <Avatar aria-hidden="true" size="small">
                    ND
                  </Avatar>
                  <span>Nik Detune</span>
                </div>
              </TableCell>
              <TableCell numeric>49×</TableCell>
              <TableCell numeric>70 040</TableCell>
              <TableCell>
                <Chip as="span" label="Same" size="small" />
              </TableCell>
            </TableRow>
            <TableRow class="lb-you">
              <TableCell numeric>42</TableCell>
              <TableCell>
                <div class="ui-layout-media ui-gap-small">
                  <Avatar aria-hidden="true" size="small" variant="filled">
                    AG
                  </Avatar>
                  <span>
                    <strong>Adam Groove (you)</strong>
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
          class="ui-layout-column ui-gap-small"
        >
          <h2 class="ui-h5" id="leaderboard-stats-heading">
            Your week
          </h2>
          <div
            class="ui-layout-grid ui-stretch"
            style="--_min-inline-size: 12rem"
          >
            <Card variant="outlined">
              <CardContent>
                <Stat
                  description={
                    <>
                      <span class="ui-caption ui-success">+9</span> from last
                      week
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
                      <span class="ui-caption ui-success">+6%</span> from last
                      week
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
            color: var(--ui-text-strong);
            font-size: var(--ui-font-size-800);
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            text-transform: uppercase;
          }

          .lb-podium {
            align-items: end;
            display: grid;
            gap: var(--ui-space-4);
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
              font-weight: var(--ui-font-weight-heading);
              inline-size: 100%;
              padding-block-start: var(--ui-space-4);
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

          .lb-you > td {
            background-image: linear-gradient(
              oklch(from var(--ui-primary) l c h / 14%),
              oklch(from var(--ui-primary) l c h / 14%)
            );
          }

          @container (inline-size < 30rem) {
            .lb-table :is(th, td):is(:nth-child(3), :nth-child(5)) {
              display: none;
            }
          }
        }
      `}</style>
    </>
  )
}
