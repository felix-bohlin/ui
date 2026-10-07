# Form

Spacing and grouping for form fields.

## Anatomy

Favorite pet

Pick one.

Dog Cat

- `.ui-form`

  Container element. Spaces its fieldsets and fields.

- `<fieldset>`

  Groups related fields.

- `<legend>`

  The label of the fieldset.

- `.ui-field-description`

  Supporting text displayed below the legend.

- `.ui-field-group`

  Lays out related fields.

## Usage

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend><!-- --></legend>
    <p class="ui-field-description"><!-- --></p>


    <div class="ui-field-group">
      <!-- form fields -->
    </div>


    <div class="ui-field-group">
      <!-- form fields -->
    </div>
  </fieldset>
</form>
```

## Fieldset

Groups related fields. Label it with `<legend>` and add an optional `.ui-field-description`.

```html
<fieldset class="ui-fieldset">
  <legend>Favorite Pet</legend>
  <p class="ui-field-description">Please select your favorite type of pet.</p>
  <div class="ui-field-group">
    <label class="ui-radio">
      <input name="pet" type="radio" value="dog" />
      <span class="ui-label">Dog</span>
    </label>
    <label class="ui-radio">
      <input name="pet" type="radio" value="cat" />
      <span class="ui-label">Cat</span>
    </label>
    <label class="ui-radio">
      <input name="pet" type="radio" value="hamster" />
      <span class="ui-label">Hamster</span>
    </label>
  </div>
</fieldset>
```

## Field group

Lays out related fields. Wrap it in a fieldset to group them for screen readers.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Choose your favorite Radiohead album</legend>
    <p class="ui-field-description">There are no wrong answers.</p>
    <div class="ui-field-group">
      <label class="ui-radio">
        <input type="radio" name="albums" value="ok-computer" />
        <span class="ui-label">OK Computer</span>
      </label>
      <label class="ui-radio">
        <input type="radio" name="albums" value="kid-a" />
        <span class="ui-label">Kid A</span>
      </label>
      <label class="ui-radio">
        <input type="radio" name="albums" value="in-rainbows" />
        <span class="ui-label">In Rainbows</span>
      </label>
      <label class="ui-radio">
        <input type="radio" name="albums" value="king-of-limbs" />
        <span class="ui-label">The King of Limbs</span>
      </label>
    </div>
  </fieldset>


  <fieldset class="ui-fieldset">
    <legend>Which side projects do you follow?</legend>
    <p class="ui-field-description">Some are better than others.</p>
    <div class="ui-field-group">
      <label class="ui-checkbox">
        <input
          aria-describedby="field-group-projects-1-end-text"
          type="checkbox"
          name="projects"
          value="the-smile"
        />
        <span class="ui-label">The Smile</span>
        <span class="ui-end-text" id="field-group-projects-1-end-text"
          >Thom Yorke, Jonny Greenwood, Tom Skinner</span
        >
      </label>
      <label class="ui-checkbox">
        <input
          aria-describedby="field-group-projects-2-end-text"
          type="checkbox"
          name="projects"
          value="atoms-for-peace"
        />
        <span class="ui-label">Atoms for Peace</span>
        <span class="ui-end-text" id="field-group-projects-2-end-text"
          >Thom Yorke, Flea, Nigel Godrich</span
        >
      </label>
      <label class="ui-checkbox">
        <input
          aria-describedby="field-group-projects-3-end-text"
          type="checkbox"
          name="projects"
          value="eob"
        />
        <span class="ui-label">EOB</span>
        <span class="ui-end-text" id="field-group-projects-3-end-text"
          >Ed O'Brien solo</span
        >
      </label>
      <label class="ui-checkbox">
        <input
          aria-describedby="field-group-projects-4-end-text"
          type="checkbox"
          name="projects"
          value="jonny-scores"
        />
        <span class="ui-label">Film Scores</span>
        <span class="ui-end-text" id="field-group-projects-4-end-text"
          >Film compositions by Jonny Greenwood</span
        >
      </label>
      <label class="ui-checkbox">
        <input
          aria-describedby="field-group-projects-5-end-text"
          type="checkbox"
          name="projects"
          value="selway-solo"
        />
        <span class="ui-label">Philip Selway</span>
        <span class="ui-end-text" id="field-group-projects-5-end-text"
          >Philip Selway solo albums</span
        >
      </label>
    </div>
  </fieldset>
</form>
```

### Row

Add `.ui-row` to lay out fields horizontally.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Options</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input type="checkbox" />
        <span class="ui-label">Option 1</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" />
        <span class="ui-label">Option 2</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" />
        <span class="ui-label">Option 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## States

### Disabled

Add `disabled` to the `<fieldset>` to disable every field inside.

```html
<fieldset class="ui-fieldset" disabled>
  <legend>Pet dating</legend>
  <p class="ui-field-description">You can't change these settings</p>
  <div class="ui-field-group">
    <label class="ui-checkbox">
      <input
        checked
        name="notifications"
        type="checkbox"
        value="horse-tinder"
      />
      <span class="ui-label">Horse Tinder</span>
    </label>
    <label class="ui-checkbox">
      <input
        name="notifications"
        type="checkbox"
        value="onlyhorsefans"
        checked
      />
      <span class="ui-label">OnlyHorseFans</span>
    </label>
  </div>
</fieldset>
```

### Invalid

Add `aria-invalid="true"` to each control in the `<fieldset>`, and explain the error in a `.ui-end-text` directly inside it. The end text turns red when a control has `aria-invalid="true"`.

```html
<fieldset class="ui-fieldset">
  <legend>Pet food</legend>
  <p class="ui-field-description">Pick at least one.</p>
  <div class="ui-field-group">
    <label class="ui-checkbox">
      <input aria-invalid="true" name="food" type="checkbox" value="kibble" />
      <span class="ui-label">Kibble</span>
    </label>
    <label class="ui-checkbox">
      <input aria-invalid="true" name="food" type="checkbox" value="wet-food" />
      <span class="ui-label">Wet food</span>
    </label>
  </div>
  <span class="ui-end-text">Your pet is hungry.</span>
</fieldset>
```

### Required

The legend gets an asterisk when a field inside is required.

```html
<fieldset class="ui-fieldset">
  <legend>Pet info</legend>
  <p class="ui-field-description">We must know your pet's information.</p>
  <div class="ui-field-group">
    <label class="ui-text-field">
      <span class="ui-label">Name</span>
      <span class="ui-field">
        <input type="text" name="name" />
      </span>
    </label>
    <label class="ui-textarea">
      <span class="ui-label">Life story</span>
      <span class="ui-field">
        <textarea name="bio" required></textarea>
      </span>
    </label>
  </div>
</fieldset>
```

## Actions

A field group with only buttons lines up in a row. Add `.ui-column` to stack the buttons instead. Separate the group from the fields with `<hr class="ui-divider">`.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Post Content</legend>
    <div class="ui-field-group">
      <label class="ui-text-field">
        <span class="ui-label">Title</span>
        <span class="ui-field">
          <input placeholder="My new post" type="text" />
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <div class="ui-field-group">
    <button type="button" class="ui-button">Save draft</button>
    <button type="button" class="ui-button ui-filled">Publish</button>
  </div>
</form>
```

## Without fieldset

Can't use `<form>`, `<fieldset>` or `<legend>`? Use `.ui-form`, `.ui-fieldset` with `role="group"` and `.ui-legend` on other elements. A `div` doesn't pick up its name from the legend, so give the legend an `id` and point `aria-labelledby` on the field set at it.

```html
<div class="ui-form">
  <div class="ui-fieldset" role="group" aria-labelledby="delivery-legend">
    <p class="ui-legend" id="delivery-legend">Delivery</p>
    <p class="ui-field-description">Rendered as div and p elements.</p>
  </div>
</div>
```

## Kitchen sink

Everything at once.

```html
<form class="ui-form" id="kitchen-sink-example-html">
  <fieldset class="ui-fieldset">
    <legend>User Profile</legend>
    <p class="ui-field-description">
      Please provide your basic contact details.
    </p>
    <div class="ui-field-group">
      <label class="ui-text-field">
        <span class="ui-label">Full Name</span>
        <span class="ui-field">
          <input type="text" placeholder="Jane Doe" required />
        </span>
      </label>
      <label class="ui-text-field">
        <span class="ui-label">Email Address</span>
        <span class="ui-field">
          <input type="email" placeholder="jane@example.com" required />
        </span>
      </label>
      <label class="ui-select">
        <span class="ui-label" id="kitchen-sink-role-label">Role</span>
        <span class="ui-field">
          <select aria-labelledby="kitchen-sink-role-label">
            <button type="button">
              <selectedcontent></selectedcontent>
            </button>
            <div class="ui-list">
              <option value="dev">Developer</option>
              <option value="design">Designer</option>
              <option value="manager">Manager</option>
            </div>
          </select>
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Notifications</legend>
    <p class="ui-field-description">
      Configure how you want to receive updates.
    </p>
    <div class="ui-field-group">
      <label class="ui-switch">
        <input type="checkbox" role="switch" name="email_notifs" checked />
        <span class="ui-label">Email Notifications</span>
      </label>
      <label class="ui-switch">
        <input type="checkbox" role="switch" name="sms_notifs" />
        <span class="ui-label">SMS Notifications</span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Theme Preference</legend>
    <p class="ui-field-description">Select your preferred visual style.</p>
    <div class="ui-field-group">
      <label class="ui-radio">
        <input type="radio" name="theme" value="light" checked />
        <span class="ui-label">Light Theme</span>
      </label>
      <label class="ui-radio">
        <input type="radio" name="theme" value="dark" />
        <span class="ui-label">Dark Theme</span>
      </label>
      <label class="ui-radio">
        <input type="radio" name="theme" value="system" />
        <span class="ui-label">System Default</span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Experience Level</legend>
    <p class="ui-field-description">
      How many years of experience do you have?
    </p>
    <div class="ui-field-group">
      <label class="ui-range">
        <span class="ui-label" id="kitchen-sink-experience-label"
          >Professional Experience</span
        >
        <span class="ui-start-text" id="kitchen-sink-experience-start-text"
          >Drag the slider to match your total tenure.</span
        >
        <input
          type="range"
          aria-describedby="kitchen-sink-experience-start-text"
          aria-labelledby="kitchen-sink-experience-label"
          min="0"
          max="20"
          step="1"
          value="5"
        />
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Additional Info</legend>
    <p class="ui-field-description">Anything else we should know?</p>
    <div class="ui-field-group">
      <label class="ui-textarea">
        <span class="ui-label">Biography</span>
        <span class="ui-field">
          <textarea
            name="details"
            placeholder="Tell us about yourself..."
            rows="4"
          ></textarea>
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Legal</legend>
    <div class="ui-field-group">
      <label class="ui-checkbox">
        <input
          aria-describedby="kitchen-sink-terms-1-end-text"
          type="checkbox"
          name="terms"
          required
        />
        <span class="ui-label">I agree to the terms and conditions</span>
        <span class="ui-end-text" id="kitchen-sink-terms-1-end-text"
          >Support this text</span
        >
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <div class="ui-field-group">
    <button class="ui-button ui-filled" type="submit">Send</button>
    <button type="button" class="ui-button">Cancel</button>
  </div>
</form>
```

## API

### Form API

#### Parts

| Part       | Description                                         |
| ---------- | --------------------------------------------------- |
| `.ui-form` | Container element. Spaces its fieldsets and fields. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Field set API

| Type       | Modifiers                     | Default | Description                                                        |
| ---------- | ----------------------------- | ------- | ------------------------------------------------------------------ |
| State      | `[disabled]`                  | -       | Disables every field inside.                                       |
| Validation | `:has([aria-invalid="true"])` | -       | Colors the end text when a field inside has `aria-invalid="true"`. |

#### Parts

| Part                    | Description                                 |
| ----------------------- | ------------------------------------------- |
| `.ui-fieldset`          | Container element.                          |
| `<legend>`              | The label of the fieldset.                  |
| `.ui-field-description` | Supporting text displayed below the legend. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Field legend API

#### Parts

| Part                      | Description              |
| ------------------------- | ------------------------ |
| `:is(legend, .ui-legend)` | The label of a fieldset. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Field description API

#### Parts

| Part                    | Description                     |
| ----------------------- | ------------------------------- |
| `.ui-field-description` | Supporting text for a fieldset. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Field group API

| Type        | Modifiers               | Default | Description                                                                                              |
| ----------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Orientation | `.ui-column`, `.ui-row` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Wrap it in a `.ui-fieldset` with a `<legend>` to group and label it.

## Under the hood

Read the post: [Smarter fieldsets with :has()](https://open-props-ui.netlify.app/learn/form-fieldset-has)

1. Fieldset

   - `<fieldset>` and `<legend>` name the group for assistive tech
   - `all: unset` drops the border, padding and the legend notch
   - What's left is a plain grid

2. Description

   - `:has(+ .description)`: the legend knows a description follows
   - The spacing moves from the legend to the description

3. Groups

   - `:has(> .check):not(:has(> :not(.check)))`: only checkboxes, radios or switches, nothing else
   - A list of choices gets a tighter gap
   - A group of only buttons becomes a row, unless it's set to `.column`
   - The row gets space above it, unless an `<hr>` comes right before it
   - A `.column` of buttons keeps each button at its own width
   - The buttons act on the whole form, so their group goes after the fieldset, not inside it

4. Required

   - One `required` input anywhere inside marks the legend
   - No prop to keep in sync with the inputs

Step 1 of 4: Fieldset

- [`all` ](https://webstatus.dev/features/all)(Widely available): Chrome 37+, Edge 79+, Firefox 27+, Safari 9.1+
- [\<fieldset> and \<legend> ](https://webstatus.dev/features/fieldset)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported

```html
<fieldset class="fieldset">
  <legend>Account</legend>
  …
</fieldset>
```

```css
.fieldset {
  all: unset;
  display: grid;
  gap: 0.25rem;
}


.fieldset legend {
  all: unset;
  font-weight: 600;
  margin-block-end: 0.75rem;
}
```

Step 2 of 4: Description

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.fieldset legend:has(+ .description) {
  margin-block-end: 0;
}


.description {
  color: var(--text-muted);
  font-size: var(--font-size-05);
  margin: 0;
}


.description:has(+ *) {
  margin-block-end: 0.75rem;
}
```

Step 3 of 4: Groups

- [`:not()` ](https://webstatus.dev/features/not)(Widely available): Chrome 88+, Edge 88+, Firefox 84+, Safari 9+

```html
<form>
  <fieldset class="fieldset">
    <legend>Notifications</legend>
    …
  </fieldset>
  <div class="group">
    <button type="reset">Cancel</button>
    <button type="button">Save</button>
  </div>
</form>
```

```css
.group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.group + .group {
  margin-block-start: 1.25rem;
}


.group:has(> .check):not(:has(> :not(.check))) {
  gap: 0.5rem;
}


.group:has(> button):not(.column, :has(> :not(button))) {
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
}


.group:has(> button):not(.column, :has(> :not(button)), hr + .group) {
  margin-block-start: 1rem;
}


.group.column:has(> button):not(:has(> :not(button))) {
  align-items: start;
}
```

Step 4 of 4: Required

```css
.fieldset:has(:required) legend {
  padding-inline-end: 1ex;
  position: relative;
}


.fieldset:has(:required) legend::after {
  color: var(--field-required-color);
  content: "*";
  inset-block: 0 auto;
  inset-inline: auto -0.25ex;
  position: absolute;
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Form.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

### See also

- [Button](https://open-props-ui.netlify.app/html/components/button.md)
- [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md)
- [Divider](https://open-props-ui.netlify.app/html/components/divider.md)
- [Radio](https://open-props-ui.netlify.app/html/components/radio.md)
- [Range](https://open-props-ui.netlify.app/html/components/range.md)
- [Select](https://open-props-ui.netlify.app/html/components/select.md)
- [Switch](https://open-props-ui.netlify.app/html/components/switch.md)
- [Textarea](https://open-props-ui.netlify.app/html/components/textarea.md)
- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)

- `opui-css/css/components/form.css`

## Changelog

### What's new

- Drop `role="group"` from a [`.ui-field-group`](#field-group) inside a fieldset, which already groups the fields.
- Breaking: an invalid `.ui-fieldset` takes `aria-invalid="true"` on each control instead of `data-invalid` on the fieldset ([Invalid](#fieldset-invalid)).
