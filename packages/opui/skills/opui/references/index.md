# References

Guides: `getting-started.md` (setup, with a section per framework), `theming.md` (colors, scopes, density, spacing, corners, fonts, elevation, motion and contrast) and `customizing.md` (the `theme.custom` layer and component properties).

Each component reference covers HTML, Astro, React, Svelte and Vue: the parts, props, classes, slots and notes they share, the component properties and theme tokens, then a section per framework with its import line, slots, hydration and an example.

| Component | File | Description |
| --- | --- | --- |
| Accordion | `accordion.md` | Lets you show and hide content, on its own or as a group. |
| Anchor | `anchor.md` | A structural primitive to enable CSS Anchor Positioning on stuff. |
| Avatar | `avatar.md` | Avatars show a person or entity as an image, initials or icon. |
| Badge | `badge.md` | Badges attach a small count or status dot to another element. |
| Button | `button.md` | Buttons allow users to take actions, and make choices, with a single tap. |
| Button group | `button-group.md` | Groups related buttons by wrapping them with class="ui-button-group" and role="group". |
| Callout | `callout.md` | Callouts call out for user attention. Should be part of the flow and used without interrupting the user's task. |
| Card | `card.md` | The card is extremely versatile and can be used on its own, or as a building block for accordions, dialogs and more. |
| Carousel | `carousel.md` | A scrolling list with snap points, buttons and markers. |
| Checkbox | `checkbox.md` | Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a Switch, and for options in a toolbar a Toggle. See also: Checkbox field group. |
| Chip | `chip.md` | Chips are compact elements that represent an input, attribute, or action. Use them for filters, tags and choices. For the main action, like Save or Send, use a Button. |
| Color field | `color-field.md` | A text field for an oklch() color, with a picker of lightness, chroma, hue and opacity sliders. |
| Copy | `copy.md` | A button that copies text or a field's value to the clipboard. |
| Description list | `description-list.md` | Description lists are used to display a list of terms and their descriptions. |
| Dialog | `dialog.md` | A minimally styled window overlaid on the main content. By design the Dialog is minimal with zero content to allow for both modal and non-modal use. |
| Divider | `divider.md` | It's just a line. |
| Drawer | `drawer.md` | Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a Dialog. |
| Form | `form.md` | Spacing and grouping for form fields. |
| Layout | `layout.md` | Six classes for the space between components: .ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-columns, .ui-layout-media and .ui-layout-container. Put them on wrapper elements, such as div, section or ul. They sit in the utils layer, so on a component they replace its own layout. Their gaps come from the --ui-space-* scale, so they follow --ui-space-scale. |
| List | `list.md` | Lists are continuous, vertical indexes of text and images and video. Use lists to help users find a specific item and act on it. |
| Menu | `menu.md` | A popover list of actions or links. |
| Number stepper | `number-stepper.md` | A number field with buttons that step the value down and up, for amounts like a quantity. |
| Progress | `progress.md` | See also: Spinner. |
| Radio | `radio.md` | See also: Form documentation. |
| Range | `range.md` | Range lets users pick a number by sliding a thumb along a track. |
| Select | `select.md` | Leverages the List component to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a Menu. |
| Spinner | `spinner.md` | Add it to an element with aria-busy="true". Spinners are always indeterminate. See also: Progress bar. |
| Stat | `stat.md` | A stat shows one number with its label and the change behind it. |
| Switch | `switch.md` | Use a Switch for a setting that applies right away. Use a Checkbox for choices that are submitted with a form, and a Toggle for options in a toolbar. See also: Switch field group. |
| Table | `table.md` | Displays tabular data. Basic tables with row and column headers, and optional captions and footers. |
| Tabs | `tabs.md` | The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' :checked state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a Toggle group. |
| Text field | `text-field.md` | An input for single-line text data. Basic text fields with labels, field descriptions, and validation states. |
| Textarea | `textarea.md` | An input for multi-line text data. Basic textareas with labels, supporting text, and validation states. |
| Toast | `toast.md` | Short messages that confirm an action and dismiss themselves. |
| Toggle | `toggle.md` | Toggle buttons and toggle groups switch options on and off, alone or as a set. |
| Tooltip | `tooltip.md` | Built on top of Anchor. |
| Typography | `typography.md` | Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in .ui-rich-text. |

Components documented on another component's page:

| Component | File |
| --- | --- |
| AccordionActions | `accordion.md` |
| AccordionContent | `accordion.md` |
| AccordionSummary | `accordion.md` |
| AnchorContent | `anchor.md` |
| AvatarGroup | `avatar.md` |
| CalloutContent | `callout.md` |
| CalloutIcon | `callout.md` |
| CardActions | `card.md` |
| CardContent | `card.md` |
| CardHeader | `card.md` |
| CheckboxInput | `checkbox.md` |
| DescriptionListDescription | `description-list.md` |
| DescriptionListItem | `description-list.md` |
| DescriptionListTerm | `description-list.md` |
| DialogContent | `dialog.md` |
| DialogFooter | `dialog.md` |
| DialogHeader | `dialog.md` |
| DialogTitle | `dialog.md` |
| DrawerContent | `drawer.md` |
| DrawerFooter | `drawer.md` |
| DrawerHeader | `drawer.md` |
| DrawerTitle | `drawer.md` |
| FieldDescription | `form.md` |
| FieldGroup | `form.md` |
| FieldLegend | `form.md` |
| Fieldset | `form.md` |
| ListItem | `list.md` |
| RadioInput | `radio.md` |
| SelectAll | `checkbox.md` |
| SortableTable | `table.md` |
| SwitchInput | `switch.md` |
| TableBody | `table.md` |
| TableCaption | `table.md` |
| TableCell | `table.md` |
| TableColumn | `table.md` |
| TableColumnGroup | `table.md` |
| TableFoot | `table.md` |
| TableHead | `table.md` |
| TableHeaderCell | `table.md` |
| TableRow | `table.md` |
| TabsItem | `tabs.md` |
| TabsLabel | `tabs.md` |
| TabsPanel | `tabs.md` |
| Toaster | `toast.md` |
| ToggleButton | `toggle.md` |
| ToggleGroup | `toggle.md` |
| TooltipContent | `tooltip.md` |
