# Form

Spacing and grouping for form fields.

## Anatomy

Favorite pet

Pick one.

Cat Dog

Supporting text

- `.ui-form`

  Container element. Spaces its fieldsets and fields.

- `<fieldset>`

  Groups related fields.

- `<legend>`

  The label of the fieldset.

- `.ui-fieldset > .ui-description`

  Supporting text displayed below the legend.

- `.ui-field-group`

  Lays out related fields.

- `.ui-fieldset > .ui-end-text`

  Supporting or error text for the whole group, after the fields.

## Basics

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend><!-- --></legend>
    <p class="ui-description"><!-- --></p>

    <div class="ui-field-group">
      <!-- -->
    </div>

    <div class="ui-field-group">
      <!-- -->
    </div>
  </fieldset>
</form>
```

## Fieldset

Groups related fields. Label it with `<legend>` and add an optional `.ui-description`.

```html
<fieldset class="ui-fieldset">
  <legend>Favorite Pet</legend>
  <p class="ui-description">Please select your favorite type of pet.</p>
  <div class="ui-field-group">
    <label class="ui-radio">
      <input name="pet" type="radio" value="cat" />
      <span class="ui-label">Cat</span>
    </label>
    <label class="ui-radio">
      <input name="pet" type="radio" value="dog" />
      <span class="ui-label">Dog</span>
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
    <p class="ui-description">There are no wrong answers.</p>
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
    <p class="ui-description">Some are better than others.</p>
    <div class="ui-field-group">
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="atoms-for-peace" />
        <span class="ui-label">Atoms for Peace</span>
        <span class="ui-end-text">Thom Yorke, Flea, Nigel Godrich</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="eob" />
        <span class="ui-label">EOB</span>
        <span class="ui-end-text">Ed O'Brien solo</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="jonny-scores" />
        <span class="ui-label">Film Scores</span>
        <span class="ui-end-text">Film compositions by Jonny Greenwood</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="selway-solo" />
        <span class="ui-label">Philip Selway</span>
        <span class="ui-end-text">Philip Selway solo albums</span>
      </label>
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="the-smile" />
        <span class="ui-label">The Smile</span>
        <span class="ui-end-text"
          >Thom Yorke, Jonny Greenwood, Tom Skinner</span
        >
      </label>
    </div>
  </fieldset>
</form>
```

### Horizontal

Add `.ui-horizontal` to lay out fields horizontally.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Options</legend>
    <div class="ui-field-group ui-horizontal">
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
  <p class="ui-description">You can't change these settings</p>
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

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```html
<fieldset aria-describedby="form-fieldset-invalid-1-error" class="ui-fieldset">
  <legend>Pet food</legend>
  <p class="ui-description">Pick at least one.</p>
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
  <span class="ui-end-text" id="form-fieldset-invalid-1-error"
    >Your pet is hungry.</span
  >
</fieldset>
```

### Required

The legend gets an asterisk when a field inside is required.

```html
<fieldset class="ui-fieldset">
  <legend>Pet info</legend>
  <p class="ui-description">We must know your pet's information.</p>
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
        <textarea name="story" required></textarea>
      </span>
    </label>
  </div>
</fieldset>
```

## Actions

A field group with only buttons lines up in a row. Add `.ui-vertical` to stack the buttons instead. Separate the group from the fields with `<hr class="ui-divider">`.

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

```html
<div class="ui-field-group ui-vertical">
  <button type="button" class="ui-button">Save draft</button>
  <button type="button" class="ui-button ui-filled">Publish</button>
</div>
```

## Without fieldset

Can't use `<form>`, `<fieldset>` or `<legend>`? Use `.ui-form`, `.ui-fieldset` with `role="group"` and `.ui-legend` on other elements. A `div` doesn't pick up its name from the legend, so give the legend an `id` and point `aria-labelledby` on the fieldset at it.

```html
<div class="ui-form">
  <div
    class="ui-fieldset"
    role="group"
    aria-labelledby="form-adaptive-output-1-legend"
  >
    <p class="ui-legend" id="form-adaptive-output-1-legend">Delivery</p>
    <p class="ui-description">Rendered as div and p elements.</p>
  </div>
</div>
```

## Kitchen sink

Everything at once.

```html
<form class="ui-form" id="form-kitchen-sink-1">
  <fieldset class="ui-fieldset">
    <legend>User Profile</legend>
    <p class="ui-description">Please provide your basic contact details.</p>
    <div class="ui-field-group">
      <label class="ui-text-field">
        <span class="ui-label">Full Name</span>
        <span class="ui-field">
          <input
            autocomplete="name"
            type="text"
            placeholder="Jane Doe"
            required
          />
        </span>
      </label>
      <label class="ui-text-field">
        <span class="ui-label">Email Address</span>
        <span class="ui-field">
          <input
            autocomplete="email"
            type="email"
            placeholder="jane@example.com"
            required
          />
        </span>
      </label>
      <label class="ui-select">
        <span class="ui-label" id="form-kitchen-sink-2-label">Role</span>
        <span class="ui-field">
          <select aria-labelledby="form-kitchen-sink-2-label">
            <button type="button">
              <selectedcontent></selectedcontent>
            </button>
            <div class="ui-list">
              <option value="design">Designer</option>
              <option value="dev">Developer</option>
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
    <p class="ui-description">Configure how you want to receive updates.</p>
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
    <p class="ui-description">Select your preferred visual style.</p>
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
    <p class="ui-description">How many years of experience do you have?</p>
    <div class="ui-field-group">
      <label class="ui-range">
        <span class="ui-label" id="form-kitchen-sink-3-label"
          >Professional Experience</span
        >
        <span class="ui-start-text" id="form-kitchen-sink-3-start-text"
          >Drag the slider to match your total tenure.</span
        >
        <input
          type="range"
          aria-describedby="form-kitchen-sink-3-start-text"
          aria-labelledby="form-kitchen-sink-3-label"
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
    <p class="ui-description">Anything else we should know?</p>
    <div class="ui-field-group">
      <label class="ui-textarea">
        <span class="ui-label">Biography</span>
        <span class="ui-field">
          <textarea
            name="biography"
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
        <input type="checkbox" name="terms" required />
        <span class="ui-label">I agree to the terms and conditions</span>
        <span class="ui-end-text">Support this text</span>
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

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Fieldset API

| Type  | Modifiers                                                                     | Default | Description                                                                                                                                                                                                             |
| ----- | ----------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| State | `:has(:required)`, `:has([aria-invalid="true"], :user-invalid)`, `[disabled]` | -       | `disabled` disables every field inside, only on a `<fieldset>`. A field inside with `aria-invalid="true"`, or that is `:user-invalid`, colors the end text, and a required field adds a required mark after the legend. |

#### Parts

| Part                             | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| `.ui-fieldset`                   | Container element.                                              |
| `<legend>`                       | The label of the fieldset.                                      |
| `.ui-fieldset > .ui-description` | Supporting text displayed below the legend.                     |
| `.ui-fieldset > .ui-end-text`    | Supporting or error text for the whole group, after the fields. |

#### CSS variables

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field legend API

#### Parts

| Part                      | Description              |
| ------------------------- | ------------------------ |
| `:is(legend, .ui-legend)` | The label of a fieldset. |

#### CSS variables

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field description API

#### Parts

| Part              | Description                     |
| ----------------- | ------------------------------- |
| `.ui-description` | Supporting text for a fieldset. |

#### CSS variables

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field group API

| Type        | Modifiers                                 | Default | Description                                                                                               |
| ----------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| Orientation | default, `.ui-horizontal`, `.ui-vertical` | default | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

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
  color: var(--ui-text-muted);
  font-size: var(--ui-font-size-small);
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
.fieldset:has(:required) legend::after {
  color: var(--ui-field-required-color);
  content: "*";
  margin-inline-start: 0.25ex;
}
```

## Browser support

- Chromium: Full support Supported since v119.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.5.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Form.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

### Used by

- [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md)
- [Radio](https://open-props-ui.netlify.app/html/components/radio.md)
- [Switch](https://open-props-ui.netlify.app/html/components/switch.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/form.css`

## See also

- [Button](https://open-props-ui.netlify.app/html/components/button.md)
- [Divider](https://open-props-ui.netlify.app/html/components/divider.md)
- [Range](https://open-props-ui.netlify.app/html/components/range.md)
- [Select](https://open-props-ui.netlify.app/html/components/select.md)
- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)
- [Textarea](https://open-props-ui.netlify.app/html/components/textarea.md)

## Changelog

### What's new

- Breaking: the [fieldset](#fieldset) description is `.ui-description` instead of `.ui-field-description`.
- Drop `role="group"` from a [`.ui-field-group`](#field-group) inside a fieldset, which already groups the fields.
- Breaking: an invalid `.ui-fieldset` takes `aria-invalid="true"` on each control instead of `data-invalid` on the fieldset ([Invalid](#fieldset-invalid)).
- Breaking: [`.ui-row` and `.ui-column`](#field-group-horizontal) on a field group are `.ui-horizontal` and `.ui-vertical`.
