# Text field

## Variants

```html
<label class="ui-text-field">
  <span class="ui-label">Outlined</span>
  <span class="ui-field">
    <input type="text" placeholder="Placeholder" />
  </span>
</label>


<label class="ui-text-field ui-filled">
  <span class="ui-label">Filled</span>
  <span class="ui-field">
    <input type="text" placeholder="Placeholder" />
  </span>
</label>
```

## Sizes

```html
<label class="ui-text-field ui-small">
  <span class="ui-label">Small outlined</span>
  <span class="ui-field">
    <input type="text" placeholder="Placeholder" />
  </span>
</label>


<label class="ui-text-field ui-filled ui-small">
  <span class="ui-label">Small filled</span>
  <span class="ui-field">
    <input type="text" placeholder="Placeholder" />
  </span>
</label>
```

## End text

```html
<label class="ui-text-field">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <input type="text" placeholder="Outlined" />
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

## Affix

Add `.ui-prefix`, `.ui-suffix`, `.ui-header`, or`.ui-footer` elements inside `.ui-field` to affix content inside the field's border. Prefix and suffix sit beside the input, while header and footer span the field's full width with a divider.

```html
<label class="ui-text-field">
  <span class="ui-label">Amount</span>
  <span class="ui-field">
    <input type="text" placeholder="0.00" />
    <span class="ui-prefix">¢</span>
    <span class="ui-suffix">EUR</span>
  </span>
</label>


<label class="ui-text-field">
  <span class="ui-label">Website</span>
  <span class="ui-field">
    <input type="text" placeholder="example.com" />
    <span class="ui-prefix">https://</span>
  </span>
</label>


<label class="ui-text-field">
  <span class="ui-label">Weight</span>
  <span class="ui-field">
    <input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" />
    <span class="ui-suffix">kg</span>
  </span>
</label>


<label class="ui-text-field">
  <span class="ui-label">Search</span>
  <span class="ui-field">
    <input type="text" placeholder="Search..." />
    <span class="ui-prefix">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </span>
  </span>
</label>
```

### Headers and footers

Use the `header` slot for inside-field captions (filenames, categories) and the `footer` slot for counters, hints, or action buttons.

```html
<label class="ui-text-field">
  <span class="ui-label">Username</span>
  <span class="ui-field">
    <input type="text" placeholder="Enter your name" />
    <span class="ui-header">Full Name</span>
  </span>
</label>


<label class="ui-text-field">
  <span class="ui-label">Tagline</span>
  <span class="ui-field">
    <input type="text" placeholder="A short description" />
    <span class="ui-footer">0 / 80</span>
  </span>
</label>
```

## Validation

Add `[required]` to the `<input>` element to toggle required styles.

Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

```html
<div class="example-row">
  <label class="ui-text-field">
    <span class="ui-label">I'm required</span>
    <span class="ui-field">
      <input type="text" placeholder="Placeholder" required />
    </span>
  </label>
  <label class="ui-text-field ui-filled">
    <span class="ui-label">So am I!</span>
    <span class="ui-field">
      <input type="text" placeholder="Placeholder" required />
    </span>
  </label>
</div>


<div class="example-row">
  <label class="ui-text-field" data-invalid>
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <input type="text" placeholder="Placeholder" value="This isn't right" />
    </span>
    <span class="ui-end-text">Only double-negatives are allowed.</span>
  </label>
  <label class="ui-text-field ui-filled" data-invalid>
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <input type="text" placeholder="Placeholder" value="Uh-oh" />
    </span>
    <span class="ui-end-text"
      >Only letters from the first half of the alphabet are allowed.</span
    >
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to display the label and description on the left with the input on the right. The layout collapses to a column on narrow containers.

```html
<label class="ui-text-field ui-spread">
  <span class="ui-label">Name</span>
  <span class="ui-start-text">Provide your full name for identification</span>
  <span class="ui-field">
    <input type="text" placeholder="Evil Rabbit" />
  </span>
</label>


<label class="ui-text-field ui-spread ui-filled">
  <span class="ui-label">Email</span>
  <span class="ui-start-text">We'll use this to contact you</span>
  <span class="ui-field">
    <input type="email" placeholder="you@example.com" />
  </span>
  <span class="ui-end-text">Please use a valid email address</span>
</label>


<label class="ui-text-field ui-spread">
  <span class="ui-label">Required</span>
  <span class="ui-start-text">You must fill this in</span>
  <span class="ui-field">
    <input type="text" required />
  </span>
</label>


<label class="ui-text-field ui-spread">
  <span class="ui-label">Disabled</span>
  <span class="ui-start-text">This field is disabled</span>
  <span class="ui-field">
    <input type="text" disabled />
  </span>
</label>


<label class="ui-text-field ui-spread" data-invalid>
  <span class="ui-label">Invalid Name</span>
  <span class="ui-start-text">This field has an error</span>
  <span class="ui-field">
    <input type="text" />
  </span>
  <span class="ui-end-text">This value is too short.</span>
</label>


<label class="ui-text-field ui-spread">
  <span class="ui-label">Amount</span>
  <span class="ui-start-text">Daily spending limit</span>
  <span class="ui-field">
    <input type="text" placeholder="0.00" />
    <span class="ui-prefix">¢</span>
    <span class="ui-suffix">EUR</span>
  </span>
</label>


<label class="ui-text-field ui-spread ui-filled">
  <span class="ui-label">Website</span>
  <span class="ui-start-text">Your public profile URL</span>
  <span class="ui-field">
    <input type="text" placeholder="example.com" />
    <span class="ui-prefix">https://</span>
  </span>
  <span class="ui-end-text">Must include a valid domain</span>
</label>


<label class="ui-text-field ui-spread">
  <span class="ui-label">Project name</span>
  <span class="ui-start-text">Used to generate the project URL</span>
  <span class="ui-field">
    <input type="text" placeholder="my-project" />
    <span class="ui-header">acme.dev/</span>
    <span class="ui-footer">Lowercase letters and dashes only</span>
  </span>
</label>


<label class="ui-text-field ui-spread ui-filled">
  <span class="ui-label">API key</span>
  <span class="ui-start-text">Stored encrypted at rest</span>
  <span class="ui-field">
    <input type="password" placeholder="Paste your key" />
    <span class="ui-prefix">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </span>
    <span class="ui-header">Secret</span>
    <span class="ui-footer">Rotates every 90 days</span>
  </span>
  <span class="ui-end-text">Treat like a password</span>
</label>
```

## Auto-fit

When enabled the Field changes size depending on its content.

```html
<label class="ui-text-field ui-auto-fit">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <input type="text" placeholder="Auto-fit" />
  </span>
</label>
```

## Input types

```html
<div class="example-column">
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Color</span>
    <span class="ui-field">
      <input type="color" placeholder="Color" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Email</span>
    <span class="ui-field">
      <input type="email" placeholder="name@email.com" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Password</span>
    <span class="ui-field">
      <input type="password" placeholder="Password" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Search</span>
    <span class="ui-field">
      <input type="search" placeholder="Search" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Phone</span>
    <span class="ui-field">
      <input type="tel" placeholder="(666) 666-1337" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Text</span>
    <span class="ui-field">
      <input type="text" placeholder="Text" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">URL</span>
    <span class="ui-field">
      <input type="url" placeholder="https://yoursite.com" />
    </span>
  </label>
</div>


<div class="example-column">
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Date</span>
    <span class="ui-field">
      <input type="date" placeholder="Date" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Datetime local</span>
    <span class="ui-field">
      <input type="datetime-local" placeholder="Datetime local" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Month</span>
    <span class="ui-field">
      <input type="month" placeholder="Month" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Time</span>
    <span class="ui-field">
      <input type="time" placeholder="Time" />
    </span>
  </label>
  <label class="ui-text-field input-type-field">
    <span class="ui-label">Week</span>
    <span class="ui-field">
      <input type="week" placeholder="Week" />
    </span>
  </label>
</div>
```

### Date inputs

Date-related inputs never show as empty, so the label is always visible. There are only hacks with compromises and no neat ways of dealing with that issue. You're free to implement a solution of your own here that works with your project.

### Numeric vs `<input type="number">`

```html
<label class="ui-text-field">
  <span class="ui-label">Numeric</span>
  <span class="ui-field">
    <input
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      placeholder="Numeric"
    />
  </span>
</label>
```

### You most likely don't need `<input type="number">`

While `<input type="number">` may seem logical for numeric data it should only be used when mathematical operations are needed on the input (which is... never). Data like credit card numbers, IDs or social security numbers - are actually text that happen to be numeric rather than mathematical values. Therefore, consider using`<input type="text" inputmode="numeric" pattern="[0-9]*">` instead.

**You will have a bad time.**

This triggers the numeric keyboard on mobile devices while avoiding the jank of number inputs, such as:

- Unexpected value increments from scroll wheels
- Browser-specific validation differences
- Accessibility problems
- Removal of leading zeros
- Allows for some non-numeric mathematical characters

It should probably be called `<input type="math">` instead.

The British Government has a [great article](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) about how bad input number is and goes in-depth. It's a very interesting read.

### File

Use `aria-label` instead of the `<label>` element.

File is a weird one. Should it really be an `<input>` element? Well, it's what we've got :sweat_smile:

```html
<div class="ui-text-field" aria-label="Label">
  <span class="ui-field">
    <input type="file" placeholder="File" />
  </span>
</div>


<div class="ui-text-field ui-filled" aria-label="Label">
  <span class="ui-field">
    <input type="file" placeholder="File" />
  </span>
</div>
```

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

```html
<label class="ui-text-field">
  <span class="ui-label">Users</span>
  <span class="ui-field">
    <input type="text" list="users" placeholder="Placeholder" />
  </span>
  <datalist id="users">
    <option value="Ray Manzarek"></option>
    <option value="Jonny Greenwood"></option>
    <option value="Marika Hackman"></option>
  </datalist>
</label>


<label class="ui-text-field ui-filled">
  <span class="ui-label">Emails</span>
  <span class="ui-field">
    <input type="email" list="users-email" placeholder="Placeholder" />
  </span>
  <datalist id="users-email">
    <option value="ray.manzarek@the.doors"></option>
    <option value="jonny.greenwood@radio.head"></option>
    <option value="marika@hack.man"></option>
  </datalist>
</label>
```

Think of `<datalist>` as a list of *suggested* values.

- `<select>` only allows you to choose between its provided values.
- `<input>` lets you input anything you want.
- `<input>` + `<datalist>` is a hybrid between the two.

## Do I have to use `<label>`?

No. But you get some accessibility wins for free with `<label>`. It's recommended to label your inputs somehow.

```html
<div class="ui-text-field">
  <span class="ui-field">
    <input type="text" placeholder="Placeholder" />
  </span>
</div>
```

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

## Anatomy

1. `label.ui-text-field`: Container element
2. `.ui-label`: Field label element
3. `.ui-field`: The boxed input area
4. `.ui-header`: Optional inside-border header strip (with divider)
5. `.ui-prefix`: Optional inline-start affix
6. `<input>`: Input element
7. `.ui-suffix`: Optional inline-end affix
8. `.ui-footer`: Optional inside-border footer strip (with divider)
9. `.ui-end-text`: Supporting text element

## API

### Text field API

### Text input API

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/text-input.css`

