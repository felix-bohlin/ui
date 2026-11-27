<script lang="ts">
  import {
    Button,
    Callout,
    CalloutContent,
    CalloutIcon,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Field,
    FieldGroup,
    Rating,
    Stat,
    StepButton,
    Stepper,
  } from "opui-css/svelte"

  const steps = [
    {
      description:
        "Warm the oil in a big pot over medium heat. Add the onion and garlic and stir for 5 minutes, until soft and shiny.",
      label: "Soften the onion",
    },
    {
      description:
        "Turn the heat up, add the beef and break it apart with a spoon. Cook until no pink is left, about 8 minutes.",
      label: "Brown the beef",
    },
    {
      description:
        "Stir in the cumin and paprika and give it a minute, until the whole van smells of it.",
      label: "Add the spices",
    },
    {
      description:
        "Add the tomatoes and beans, then simmer with the lid half on for 30 minutes. Like a good bass line, it should barely move.",
      label: "Simmer low and slow",
    },
    {
      description:
        "Melt in the chocolate, season with salt and serve with rice, bread or straight from the pot.",
      label: "Finish with chocolate",
    },
  ]
</script>

<article
  aria-labelledby="recipe-title"
  class="recipe ui-layout-container ui-layout-column ui-gap-large"
  style="--_max-inline-size: 60rem"
>
  <div class="ui-layout-row ui-spread">
    <hgroup class="ui-hgroup">
      <p class="ui-overline">Tour food</p>
      <h1 class="ui-h2" id="recipe-title">One-pot pre-gig chili</h1>
      <p>
        Warm, filling and done before soundcheck. Scott's van recipe, now with
        fewer beans.
      </p>
    </hgroup>
    <div class="ui-layout-row ui-gap-small">
      <Button size="small" type="button" variant="outlined">
        <svg
          data-icon="heart"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"
          ></path>
        </svg>
        <span class="ui-text">Save</span>
      </Button>
      <Button size="small" type="button" variant="outlined">
        <svg
          data-icon="print"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1-9H6v4h12z"
          ></path>
        </svg>
        <span class="ui-text">Print</span>
      </Button>
    </div>
  </div>
  <div class="ui-layout-row ui-gap-large recipe-meta">
    <Stat label="Prep" size="small">15 min</Stat>
    <Stat label="Cook" size="small">45 min</Stat>
    <Stat label="Difficulty" size="small">Easy</Stat>
    <div class="ui-layout-row ui-gap-small">
      <Rating
        aria-hidden="true"
        label="Rated 4.8 out of 5"
        size="small"
        value={4.8}
      />
      <span>4.8 from 212 cooks</span>
    </div>
    <div class="ui-layout-row ui-gap-x-small">
      <Chip as="span" label="Gluten free" size="small" />
      <Chip as="span" label="Freezes well" size="small" />
    </div>
  </div>
  <div class="ui-layout-columns ui-gap-large" style="--_columns: 2fr 3fr">
    <Card
      aria-labelledby="recipe-ingredients-heading"
      as="section"
      class="recipe-ingredients"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="recipe-ingredients-heading">Ingredients</h2>
        <p>Tick them off as they go in the pot.</p>
      </hgroup>
      <CardContent>
        <Field autoFit for="recipe-servings" label="Servings">
          <input
            id="recipe-servings"
            max="12"
            min="1"
            name="servings"
            type="number"
            value="4"
          />
          {#snippet start()}
            <StepButton command="--step-down" for="recipe-servings" />
          {/snippet}
          {#snippet end()}
            <StepButton command="--step-up" for="recipe-servings" />
          {/snippet}
        </Field>
        <FieldGroup aria-labelledby="recipe-ingredients-heading" role="group">
          <Checkbox defaultChecked name="ingredient-oil"
            >2 tbsp olive oil</Checkbox
          >
          <Checkbox defaultChecked name="ingredient-onion"
            >1 onion, chopped</Checkbox
          >
          <Checkbox name="ingredient-garlic">3 cloves garlic</Checkbox>
          <Checkbox name="ingredient-beef">500 g minced beef</Checkbox>
          <Checkbox name="ingredient-spices"
            >2 tsp each of cumin and smoked paprika</Checkbox
          >
          <Checkbox name="ingredient-tomatoes"
            >2 cans of chopped tomatoes</Checkbox
          >
          <Checkbox name="ingredient-beans">1 can of kidney beans</Checkbox>
          <Checkbox name="ingredient-chocolate"
            >1 square of dark chocolate</Checkbox
          >
        </FieldGroup>
      </CardContent>
    </Card>
    <section
      aria-labelledby="recipe-method-heading"
      class="recipe-method ui-layout-column ui-gap-large"
    >
      <h2 class="ui-h5" id="recipe-method-heading">Method</h2>
      <Stepper
        aria-labelledby="recipe-method-heading"
        items={steps}
        orientation="vertical"
      />
      <Callout severity="info">
        <CalloutIcon />
        <CalloutContent>
          <h2>Roadie tip</h2>
          <p>
            Cook it the night before. It tastes better on day two, and you get
            to sleep in before load-in.
          </p>
        </CalloutContent>
      </Callout>
    </section>
  </div>
</article>

<style>
  :global {
    .recipe {
      container-type: inline-size;

      .recipe-meta {
        align-items: center;
      }

      .recipe-method .ui-stepper {
        --_description-text-color: var(--ui-text);

        font-size: var(--ui-font-size-body);

        & > li {
          --_label-text-color: var(--ui-text-strong);

          font-weight: var(--ui-font-weight-heading);
        }

        .ui-description {
          font-size: var(--ui-font-size-body);
          line-height: var(--ui-line-height-body);
        }
      }

      .recipe-ingredients {
        align-self: start;

        .ui-content {
          display: grid;
          gap: var(--ui-space-6);
        }
      }
    }
  }
</style>
