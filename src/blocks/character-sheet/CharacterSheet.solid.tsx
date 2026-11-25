/** @jsxImportSource @solidjs/web */
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FieldGroup,
  List,
  ListItem,
  Meter,
  Progress,
} from "opui-css/solid"

export default function CharacterSheet() {
  return (
    <>
      <div
        class="character-sheet ui-layout-container ui-layout-column ui-large"
        style="--_max-inline-size: 64rem"
      >
        <header class="cs-hero">
          <Avatar
            aria-label="Percy Groove"
            class="cs-portrait"
            role="img"
            shape="squircle"
            size="large"
            variant="filled"
          >
            PG
          </Avatar>
          <div class="ui-layout-column ui-small">
            <hgroup class="ui-hgroup">
              <p class="ui-overline">Level 12 bard, Low End Oracle</p>
              <h1 class="ui-h2">Percy Groove</h1>
            </hgroup>
            <div class="ui-layout-row ui-x-small">
              <Chip as="span" label="Human" size="small" />
              <Chip as="span" label="Chaotic groovy" size="small" />
              <Chip as="span" label="Band: The Flatwounds" size="small" />
            </div>
          </div>
          <div class="cs-vitals">
            <div class="ui-layout-column ui-x-small">
              <span
                class="ui-layout-row ui-spread ui-tabular-nums"
                id="character-sheet-hp"
              >
                <span>Hit points</span>
                <span>34 of 52</span>
              </span>
              <Meter
                aria-labelledby="character-sheet-hp"
                high={40}
                low={16}
                max={52}
                optimum={52}
                value={34}
              />
            </div>
            <div class="ui-layout-column ui-x-small">
              <span
                class="ui-layout-row ui-spread ui-tabular-nums"
                id="character-sheet-xp"
              >
                <span>Experience</span>
                <span>8 450 of 10 000</span>
              </span>
              <Progress
                aria-labelledby="character-sheet-xp"
                max={10000}
                value={8450}
              />
            </div>
          </div>
        </header>
        <div class="ui-layout-columns ui-large" style="--_columns: 2fr 3fr">
          <div class="ui-layout-column ui-large">
            <Card
              aria-labelledby="character-sheet-attributes-heading"
              as="section"
              variant="outlined"
            >
              <hgroup>
                <h2 class="ui-h5" id="character-sheet-attributes-heading">
                  Attributes
                </h2>
                <p>Out of 20. Rolled, not bought. Honest.</p>
              </hgroup>
              <CardContent>
                <ul class="cs-attributes">
                  <li>
                    <span
                      class="ui-layout-row ui-spread ui-tabular-nums"
                      id="character-sheet-groove"
                    >
                      <span>Groove</span>
                      <span>18</span>
                    </span>
                    <Meter
                      aria-labelledby="character-sheet-groove"
                      max={20}
                      value={18}
                    />
                  </li>
                  <li>
                    <span
                      class="ui-layout-row ui-spread ui-tabular-nums"
                      id="character-sheet-volume"
                    >
                      <span>Volume</span>
                      <span>16</span>
                    </span>
                    <Meter
                      aria-labelledby="character-sheet-volume"
                      max={20}
                      value={16}
                    />
                  </li>
                  <li>
                    <span
                      class="ui-layout-row ui-spread ui-tabular-nums"
                      id="character-sheet-charisma"
                    >
                      <span>Charisma</span>
                      <span>14</span>
                    </span>
                    <Meter
                      aria-labelledby="character-sheet-charisma"
                      max={20}
                      value={14}
                    />
                  </li>
                  <li>
                    <span
                      class="ui-layout-row ui-spread ui-tabular-nums"
                      id="character-sheet-stamina"
                    >
                      <span>Stamina</span>
                      <span>11</span>
                    </span>
                    <Meter
                      aria-labelledby="character-sheet-stamina"
                      max={20}
                      value={11}
                    />
                  </li>
                  <li>
                    <span
                      class="ui-layout-row ui-spread ui-tabular-nums"
                      id="character-sheet-luck"
                    >
                      <span>Luck with sound engineers</span>
                      <span>4</span>
                    </span>
                    <Meter
                      aria-labelledby="character-sheet-luck"
                      max={20}
                      value={4}
                    />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card
              aria-labelledby="character-sheet-quests-heading"
              as="section"
              variant="outlined"
            >
              <hgroup>
                <h2 class="ui-h5" id="character-sheet-quests-heading">
                  Quest log
                </h2>
                <p>2 of 4 done this session.</p>
              </hgroup>
              <CardContent>
                <FieldGroup
                  aria-labelledby="character-sheet-quests-heading"
                  role="group"
                >
                  <Checkbox defaultChecked name="quest-capo">
                    Return the capo you borrowed
                  </Checkbox>
                  <Checkbox defaultChecked name="quest-soundcheck">
                    Survive soundcheck without crying
                  </Checkbox>
                  <Checkbox name="quest-solo">
                    Play a bass solo nobody walks out of
                  </Checkbox>
                  <Checkbox name="quest-van">
                    Find a parking spot for the van
                  </Checkbox>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
          <div class="ui-layout-column ui-large">
            <Card
              aria-labelledby="character-sheet-inventory-heading"
              as="section"
              variant="outlined"
            >
              <hgroup>
                <h2 class="ui-h5" id="character-sheet-inventory-heading">
                  Inventory
                </h2>
                <p>4 of 12 slots. The amp counts as two.</p>
              </hgroup>
              <List bordered variant="transparent">
                <ListItem
                  description="+3 to Groove. Never needs tuning, somehow."
                  end={
                    <Chip
                      as="span"
                      label="Legendary"
                      severity="warning"
                      size="small"
                    />
                  }
                  label="Fretless of Endless Sustain"
                />
                <ListItem
                  description="Smooth to the touch, quiet on the slides."
                  end={
                    <Chip as="span" label="Rare" severity="info" size="small" />
                  }
                  label="Flatwound strings +2"
                />
                <ListItem
                  description="Fixes cables, setlists and broken hearts."
                  end={<Chip as="span" label="Common" size="small" />}
                  label="Roll of gaffer tape"
                />
                <ListItem
                  description="Hand it to the right drummer to finish the quest."
                  end={
                    <Chip
                      as="span"
                      label="Quest item"
                      severity="success"
                      size="small"
                    />
                  }
                  label="Crumpled setlist"
                />
              </List>
            </Card>
            <section
              aria-labelledby="character-sheet-abilities-heading"
              class="ui-layout-column ui-small"
            >
              <h2 class="ui-h5" id="character-sheet-abilities-heading">
                Abilities
              </h2>
              <div class="ui-layout-column cs-abilities">
                <Accordion open variant="outlined">
                  <AccordionSummary>
                    <span>
                      Slap of Thunder
                      <span class="ui-layout-row ui-caption cs-ability-meta">
                        <span>Action</span>
                        <span>Once per set</span>
                      </span>
                    </span>
                  </AccordionSummary>
                  <AccordionContent>
                    <p>
                      Deal 2d8 sonic damage to everyone in the front row. Anyone
                      wearing earplugs takes half.
                    </p>
                  </AccordionContent>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary>
                    <span>
                      In the Pocket
                      <span class="ui-layout-row ui-caption cs-ability-meta">
                        <span>Passive</span>
                        <span>Always on</span>
                      </span>
                    </span>
                  </AccordionSummary>
                  <AccordionContent>
                    <p>
                      Allies within 10 feet stay on the beat, even the drummer.
                      Most of the time.
                    </p>
                  </AccordionContent>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary>
                    <span>
                      Soundcheck Stall
                      <span class="ui-layout-row ui-caption cs-ability-meta">
                        <span>Reaction</span>
                        <span>Twice per gig</span>
                      </span>
                    </span>
                  </AccordionSummary>
                  <AccordionContent>
                    <p>
                      Ask the engineer for "a bit more bass" and buy the whole
                      party 10 more minutes.
                    </p>
                  </AccordionContent>
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </div>
      <style>{`
        .character-sheet {
          container-type: inline-size;

          .cs-hero {
            align-items: center;
            background-image: linear-gradient(
              120deg,
              oklch(from var(--ui-primary) l c h / 18%),
              transparent 65%
            );
            border: var(--ui-border-width) solid var(--ui-border-color);
            border-radius: var(--ui-radius-large);
            display: grid;
            gap: var(--ui-space-5);
            grid-template-columns: auto minmax(0, 1fr);
            padding: var(--ui-space-6);
          }

          .cs-portrait {
            --_size: 5.5rem;

            font-size: var(--ui-font-size-700);
          }

          .cs-vitals {
            display: grid;
            gap: var(--ui-space-3);
            grid-column: 1 / -1;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
          }

          .cs-attributes {
            display: grid;
            gap: var(--ui-space-4);
            list-style-type: none;
            padding: 0;

            li {
              display: grid;
              gap: var(--ui-space-1);
            }
          }

          .cs-abilities summary > span {
            display: grid;
            flex: 1;
            gap: var(--ui-space-1);
          }

          .cs-ability-meta {
            --_gap: var(--ui-space-2);

            font-weight: var(--ui-font-weight-normal);
          }
        }
      `}</style>
    </>
  )
}
