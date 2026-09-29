# Form

A way to build structured forms.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/form.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

## Usage

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend><!-- --></legend>
    <p class="ui-field-description"><!-- --></p>


    <div class="ui-field-group" role="group">
      <!-- form fields -->
    </div>


    <div class="ui-field-group" role="group">
      <!-- form fields -->
    </div>
  </fieldset>
</form>


<!-- or -->


<div class="ui-form">
  <div class="ui-fieldset">
    <p class="ui-legend"><!-- --></p>
    <p class="ui-field-description"><!-- --></p>


    <div class="ui-field-group" role="group">
      <!-- form fields -->
    </div>
    <div class="ui-field-group" role="group">
      <!-- form fields -->
    </div>
  </div>
</div>
```

### Non-semantic elements

Sometimes you can't use semantic form elements like `<fieldset>` and `<legend>`. Replace them with `<div role="group">` paired with a `<span class="ui-legend">` (or any heading) to keep the visual treatment without the native semantics.

## Fieldset

Used to show a relationship between form elements.

- `<legend>`

  ---

  to describe what it's about.

- `.ui-field-description`(optional)

  ---

  to give extra context about the fieldset.

- `.ui-field-group`

  ---

  groups related fields.

```html
<fieldset class="ui-fieldset">
  <legend>Favorite Pet</legend>
  <p class="ui-field-description">Please select your favorite type of pet.</p>
  <div class="ui-field-group" role="group">
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

### Required

```html
<fieldset class="ui-fieldset">
  <legend>Pet info</legend>
  <p class="ui-field-description">We must know your pet's information.</p>
  <div class="ui-field-group" role="group">
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

### Disabled

Turns out you can disable an entire fieldset.

```html
<fieldset class="ui-fieldset" disabled>
  <legend>Pet dating</legend>
  <p class="ui-field-description">You can't change these settings</p>
  <div class="ui-field-group" role="group">
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

## Field Legend

Use `FieldLegend` (or `<legend>`) to describe the fieldset.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
</fieldset>
```

## Field Description

Use `FieldDescription` (or `.ui-field-description`) to give extra context about the fieldset.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <p class="ui-field-description">This is a field description.</p>
</fieldset>
```

## Field Group

Use `.ui-field-group` to wrap related fields.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Choose your favorite Radiohead album</legend>
    <p class="ui-field-description">There are no wrong answers.</p>
    <div class="ui-field-group" role="group">
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
        <input type="radio" name="albums" value="the-king-of-limbs" />
        <span class="ui-label">The King of Limbs</span>
      </label>
    </div>
  </fieldset>


  <fieldset class="ui-fieldset">
    <legend>Which side projects do you follow?</legend>
    <p class="ui-field-description">Some are better than others.</p>
    <div class="ui-field-group" role="group">
      <label class="ui-checkbox">
        <input type="checkbox" name="projects" value="the-smile" />
        <span class="ui-label">The Smile</span>
        <span class="ui-end-text"
          >Thom Yorke, Jonny Greenwood, Tom Skinner</span
        >
      </label>
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
    </div>
  </fieldset>
</form>
```

### Row

Use the `.ui-row` class to lay out fields horizontally.

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

## Divider

Use a `<hr />` to create a visual break between sections of your form.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Post Content</legend>
    <div class="ui-field-group" role="group">
      <label class="ui-text-field">
        <span class="ui-label">Title</span>
        <span class="ui-field">
          <input name="New post" placeholder="My new post" type="text" />
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <div class="ui-field-group" role="group">
    <button class="ui-button ui-filled">Publish</button>
  </div>
</form>
```

## Kitchen Sink

Everything all at once.

```html
<form class="ui-form" id="kitchen-sink-example-html">
  <fieldset class="ui-fieldset">
    <legend>User Profile</legend>
    <p class="ui-field-description">
      Please provide your basic contact details.
    </p>
    <div class="ui-field-group" role="group">
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
        <span class="ui-label">Role</span>
        <span class="ui-field">
          <select>
            <button>
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
    <div class="ui-field-group" role="group">
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
    <div class="ui-field-group" role="group">
      <label class="ui-range">
        <span class="ui-label">Professional Experience</span>
        <span class="ui-start-text"
          >Drag the slider to match your total tenure.</span
        >
        <input type="range" min="0" max="20" step="1" value="5" />
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Additional Info</legend>
    <p class="ui-field-description">Anything else we should know?</p>
    <div class="ui-field-group" role="group">
      <label class="ui-textarea">
        <span class="ui-label">Biography</span>
        <span class="ui-field">
          <textarea placeholder="Tell us about yourself..." rows="4"></textarea>
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Legal</legend>
    <div class="ui-field-group" role="group">
      <label class="ui-checkbox">
        <input type="checkbox" name="terms" required />
        <span class="ui-label">I agree to the terms and conditions</span>
        <span class="ui-end-text">Support this text</span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <div class="ui-field-group" role="group">
    <button class="ui-button ui-filled" type="submit">Send</button>
    <button class="ui-button">Cancel</button>
  </div>
</form>
```

### Row

Everything all at once, but horizontally.

```html
<form class="ui-form" id="kitchen-sink-example-row-html">
  <fieldset class="ui-fieldset">
    <legend>User Profile</legend>
    <p class="ui-field-description">
      Please provide your basic contact details.
    </p>
    <div class="ui-field-group" role="group">
      <label class="ui-text-field ui-spread">
        <span class="ui-label">Full Name</span>
        <span class="ui-field">
          <input type="text" placeholder="Jane Doe" required />
        </span>
      </label>
      <label class="ui-text-field ui-spread">
        <span class="ui-label">Email Address</span>
        <span class="ui-field">
          <input type="email" placeholder="jane@example.com" required />
        </span>
      </label>
      <label class="ui-select ui-spread">
        <span class="ui-label">Role</span>
        <span class="ui-field">
          <select>
            <button>
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
    <div class="ui-field-group" role="group">
      <label class="ui-switch ui-spread">
        <input type="checkbox" role="switch" name="email_notifs" checked />
        <span class="ui-label">Email Notifications</span>
      </label>
      <label class="ui-switch ui-spread">
        <input type="checkbox" role="switch" name="sms_notifs" />
        <span class="ui-label">SMS Notifications</span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Theme Preference</legend>
    <p class="ui-field-description">Select your preferred visual style.</p>
    <div class="ui-field-group ui-row">
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
    <div class="ui-field-group" role="group">
      <label class="ui-range ui-spread">
        <span class="ui-label">Professional Experience</span>
        <span class="ui-start-text"
          >Drag the slider to match your total tenure.</span
        >
        <input type="range" min="0" max="20" step="1" value="5" />
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Additional Info</legend>
    <p class="ui-field-description">Anything else we should know?</p>
    <div class="ui-field-group" role="group">
      <label class="ui-textarea ui-spread">
        <span class="ui-label">Biography</span>
        <span class="ui-field">
          <textarea placeholder="Tell us about yourself..." rows="4"></textarea>
        </span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <fieldset class="ui-fieldset">
    <legend>Legal</legend>
    <div class="ui-field-group" role="group">
      <label class="ui-checkbox ui-spread">
        <input type="checkbox" name="terms" required />
        <span class="ui-label">I agree to the terms and conditions</span>
        <span class="ui-end-text">Support this text</span>
      </label>
    </div>
  </fieldset>


  <hr class="ui-divider" />


  <div class="ui-field-group" role="group">
    <button class="ui-button ui-filled" type="submit">Send</button>
    <button class="ui-button">Cancel</button>
  </div>
</form>
```

## API

### Form

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

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

