# Typography

Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in `.ui-rich-text`.

## Class-based

Utils that you can plop down wherever.

### Variants

```svelte
<h1 class="ui-h1">Heading 1</h1>
<h2 class="ui-h2">Heading 2</h2>
<h3 class="ui-h3">Heading 3</h3>
<h4 class="ui-h4">Heading 4</h4>
<h5 class="ui-h5">Heading 5</h5>
<h6 class="ui-h6">Heading 6</h6>
<p class="ui-p ui-large">Body Large</p>
<p class="ui-p">Body</p>
<p class="ui-p ui-small">Body Small</p>
<p class="ui-overline">Overline</p>
<p class="ui-caption">Caption</p>
```

### Heading group

```svelte
<div class="ui-hgroup">
  <p class="ui-overline">Zero or more p elements</p>
  <h2 class="ui-h2">Followed by one h* element</h2>
  <p class="ui-p">Followed by zero or more p elements</p>
</div>
```

### Blockquote

```svelte
<blockquote class="ui-blockquote">
  “Occupy your mind, don't stay home. Talk to all your friends, but don't look
  at your phone”
  <footer>Marika Hackman, <cite>No Caffeine</cite></footer>
</blockquote>
```

### Link

Use `.ui-link` for links outside `.ui-rich-text`. Inside rich text, links get the same style without a class. On hover and focus the underline gets thicker, and the color darkens in light mode and lightens in dark mode.

```svelte
<p>Read the <a class="ui-link" href="#link">guide</a> first.</p>
```

### Code block

```svelte
<script lang="ts">
  const code = `.ui-card {
  background: var(--ui-surface-elevated);
  border-radius: var(--ui-radius);
  padding: var(--ui-space-4);
}`
</script>

<pre class="ui-code-block"><code>{code}</code></pre>
```

## Inline text elements

| Result            | Element           | Class       |
| ----------------- | ----------------- | ----------- |
| [Link](#link)     | `<a href>`        | `.ui-link`  |
| Abbr.             | `<abbr>`          | `.ui-abbr`  |
| **Bold**          | `<b>`, `<strong>` | None        |
| Citation          | `<cite>`          | `.ui-cite`  |
| ~~Deleted~~       | `<del>`           | `.ui-del`   |
| Definition        | `<dfn>`           | `.ui-dfn`   |
| *Italic*          | `<em>`, `<i>`     | None        |
| Inserted          | `<ins>`           | `.ui-ins`   |
| `Ctrl + S`        | `<kbd>`           | `.ui-kbd`   |
| *Highlight*       | `<mark>`          | `.ui-mark`  |
| ~~Strikethrough~~ | `<s>`             | `.ui-s`     |
| `sample output`   | `<samp>`          | `.ui-samp`  |
| Small             | `<small>`         | `.ui-small` |
| Text Sub          | `<sub>`           | `.ui-sub`   |
| Text Sup          | `<sup>`           | `.ui-sup`   |
| *Underline*       | `<u>`             | `.ui-u`     |
| `variable`        | `<var>`           | `.ui-var`   |

## Classless

Wrap your code in `.ui-rich-text` to add typographic styles to its children. It's extra handy when you can't control the contents yourself, like printing text from a CMS.

Headings, lists and tables with a class keep their own styles, and components look the same inside rich text as outside it. Wrap a part in `.ui-not-rich-text` to end the rich text styles there.

```html
<article class="ui-rich-text">
  <h2>Styled</h2>
  <div class="ui-not-rich-text"><!-- not styled --></div>
</article>
```

### Classless showcase

Let's put everything together and see how all elements look in a classless, rich-text context. It's plain HTML on every framework page, the way rich text arrives from a CMS.

```html
<article class="ui-rich-text">
  <hgroup>
    <p>Typography showcase</p>
    <h1>Fixie beard tumeric: What the kombucha tells us about every element</h1>
    <p>
      Ugh, raw denim four loko bitters cold-pressed whatever retro tousled tilde
      pabst. Not a single class name below, just plain HTML.
    </p>
    <p>A second subtitle paragraph, because some CMSes will do that.</p>
  </hgroup>
  <p>
    Kitsch tbh pug banjo distillery cred listicle typewriter snackwave
    knausgaard tousled. Offal chicharrones humblebrag wolf affogato whatever
    swag four loko vaporware poutine roof party. Raclette
    <em>drinking vinegar</em> chartreuse gochujang kogi heirloom ugh snackwave
    banh mi cray cliche locavore,
    <a href="#typography-default-1">skip to inline text</a>.
  </p>
  <p>
    Gluten-free ennui air plant franzen tattooed poutine scenester tote bag
    microdosing affogato kinfolk iceland vegan. Celiac literally:
  </p>
  <blockquote>
    Cornhole actually <code>h1</code> tumblr tacos mumblecore twee. Crucifix
    pour-over leggings heirloom chartreuse cloud bread trust fund lyft keytar.
    <footer>
      <cite>Flexitarian single-origin, somewhere off the L train</cite>
    </footer>
  </blockquote>
  <p>
    Locavore ennui adaptogen literally palo santo flannel <code>p</code> +1
    hashtag meggings sartorial disrupt.
  </p>

  <hr />

  <h2 id="typography-default-1">Inline text</h2>
  <p>
    <strong>Strong</strong>, <b>bold</b>, <em>emphasis</em>, <i>italic</i>,
    <strong><em>strong emphasis</em></strong
    >, <u>underline</u>, <s>strikethrough</s>, <del>deleted</del>,
    <ins>inserted</ins>, <mark>highlight</mark>, <small>small print</small>,
    H<sub>2</sub>O, E&nbsp;=&nbsp;mc<sup>2</sup>, x<sub>i</sub><sup>2</sup>,
    <abbr title="Hypertext Markup Language">HTML</abbr>,
    <abbr>CSS</abbr> without a title, <dfn>definition</dfn>,
    <dfn><abbr title="Oat Milk Latte">OML</abbr></dfn
    >, <cite>The Kombucha Chronicles</cite>,
    <q>quoted with a <q>nested quote</q> inside</q>, <code>inline code</code>,
    <kbd>Esc</kbd>, <kbd><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></kbd
    >, <samp>sample output</samp>, <var>steepHours</var>,
    <time datetime="2026-09-30">September 30</time>,
    <data value="42">forty-two</data> and a <span>plain span</span>.
  </p>
  <p>
    Nested inline elements:
    <a href="#typography-default-1"><code>linked code</code></a
    >, <a href="#typography-default-1"><strong>linked strong</strong></a
    >,
    <mark>highlight with <a href="#typography-default-1">a link</a> inside</mark
    >, <del><code>deleted code</code></del
    >, <ins><code>inserted code</code></ins
    >, <em><code>emphasized code</code></em
    >,
    <small
      >small with <code>code</code> and
      <a href="#typography-default-1">link</a></small
    >, <strong><kbd>Enter</kbd></strong> and
    <sup><a href="#typography-default-1">sup link</a></sup
    >.
  </p>
  <p>
    Links come in a few flavors: an
    <a href="https://github.com/felix-bohlin/ui">external link</a>, an
    <a href="#typography-default-1">in-page anchor</a>, and a placeholder
    <a>anchor without an href</a> that shouldn't look clickable.
  </p>
  <p>
    Long inline runs have to wrap gracefully. Mixtape actually wolf godard
    <mark
      >four loko ugh distillery marfa vaporware cliche celiac, this highlight
      keeps going until it breaks onto another line and keeps its padding</mark
    >
    and then
    <a href="#typography-default-1"
      >this link also runs long enough that it needs to wrap across a line break
      without losing its underline</a
    >. Same goes for
    <code
      >a.very.long.inline.code.span.that.has.no.natural.break.points.whatsoever</code
    >
    and a bare URL like
    https://example.com/a/really/long/path/that/does/not/contain/any/spaces/at/all/and/overflows?utm_source=typography&amp;utm_medium=stress-test.
  </p>
  <p>
    Superscripts and subscripts must not blow out the line height of a
    paragraph. Here is a footnote reference<sup
      ><a href="#typography-default-2" id="typography-default-2-ref">1</a></sup
    >
    in the middle of a line, then some more text so it wraps, CO<sub>2</sub>
    emissions, 2<sup>10</sup> = 1024 and the 21<sup>st</sup> century, just to be
    sure the lines above and below stay evenly spaced.
    <br />
    This sentence follows a line break.
  </p>

  <h2>Headings</h2>
  <p>Each level followed by body copy.</p>
  <h1>Heading level one</h1>
  <p>Squid thundercats mumblecore celiac typewriter ugh mlkshk cornhole.</p>
  <h2>Heading level two</h2>
  <p>Microdosing shaman keffiyeh selvage, locavore chartreuse.</p>
  <h3>Heading level three</h3>
  <p>Lumbersexual praxis distillery cold-pressed tilde keffiyeh cred vinyl.</p>
  <h4>Heading level four</h4>
  <p>Tilde four loko banh mi lyft flexitarian sartorial neutra.</p>
  <h5>Heading level five</h5>
  <p>
    Rarely needed, but it exists and should look intentional, not like broken
    body copy.
  </p>
  <h6>Heading level six</h6>
  <p>
    The last heading level. If you find yourself using this, consider
    restructuring your content instead.
  </p>

  <h3>Stacked headings</h3>
  <h4>An <code>h4</code> directly under an <code>h3</code></h4>
  <h5>An <code>h5</code> directly under an <code>h4</code></h5>
  <h6>An <code>h6</code> directly under an <code>h5</code></h6>
  <p>
    Phew, with any luck the headings above sit close together and this paragraph
    hugs the last one.
  </p>

  <h3>Sibling headings of the same level</h3>
  <h3>Like this one, right after another <code>h3</code></h3>
  <p>Vegan poutine letterpress tacos coloring book flannel hexagon.</p>

  <h3>
    A heading with <code>code</code>, <em>emphasis</em> and
    <a href="#typography-default-1">a link</a> in it
  </h3>
  <p>Shoreditch tbh mlkshk wolf.</p>

  <h3>
    A deliberately long heading that wraps onto several lines to check line
    height, letter spacing and text wrapping at larger sizes, because titles
    from a CMS are never as short as the designer hoped
  </h3>
  <p>Heirloom cloud bread tousled.</p>

  <h4>A heading directly followed by a list</h4>
  <ul>
    <li>Selvage cardigan asymmetrical snackwave pug.</li>
    <li>Bitters gluten-free mixtape tumeric tote bag scenester.</li>
  </ul>
  <h4>A heading directly followed by a code block</h4>
  <pre><code>npm install @opui/css</code></pre>
  <h4>A heading directly followed by a blockquote</h4>
  <blockquote>Humblebrag cloud bread kogi raw denim pabst affogato.</blockquote>

  <hr />

  <hgroup>
    <p>Mid-article heading group</p>
    <h2>Lists</h2>
    <p>An <code>hgroup</code> that doesn't start the article.</p>
  </hgroup>
  <p>Microdosing literally taxidermy flannel pork belly:</p>
  <ul>
    <li>Selvage cardigan asymmetrical snackwave pug.</li>
    <li>
      A longer item that wraps onto a second line, so we can check that the
      wrapped text lines up with the first line instead of the bullet.
    </li>
    <li>Humblebrag cloud bread kogi raw denim pabst affogato.</li>
  </ul>
  <ol>
    <li>
      <s>Artisan</s> mass-produced roof party whatever pickled gluten-free.
    </li>
    <li>Hashtag literally small batch ugh kogi leggings snackwave.</li>
    <li>
      Chambray vegan pug ennui cornhole bitters lumbersexual:
      <ul>
        <li>Bitters glazed oat milk.</li>
        <li>
          Vegan enamel pin cortado:
          <ol>
            <li>Third level, ordered.</li>
            <li>
              Fourth level, unordered:
              <ul>
                <li>As deep as anyone should ever nest.</li>
              </ul>
            </li>
          </ol>
        </li>
      </ul>
    </li>
    <li>Authentic tacos mixtape squid meggings tote bag.</li>
  </ol>
  <p>
    Ordered lists that start at 98 go to three digits, so the markers change
    width:
  </p>
  <ol start="98">
    <li>Ninety-eight.</li>
    <li>Ninety-nine.</li>
    <li>One hundred.</li>
  </ol>
  <p>Reversed, and with a <code>type</code> attribute:</p>
  <ol reversed>
    <li>Three.</li>
    <li>Two.</li>
    <li>One.</li>
  </ol>
  <ol type="a">
    <li>Alpha.</li>
    <li>Bravo.</li>
    <li>Charlie.</li>
  </ol>
  <p>List items with several blocks inside:</p>
  <ul>
    <li>
      <strong>Heirloom leggings snackwave tattooed.</strong>
      <p>
        Crucifix vegan ennui knausgaard tousled disrupt mixtape sartorial
        asymmetrical bitters.
      </p>
      <p>
        Skateboard letterpress cold-pressed palo santo trust fund vexillologist
        roof party microdosing flannel cloud bread tote bag poutine affogato.
      </p>
    </li>
    <li>
      <strong>Pickled tumeric raw denim squid.</strong>
      <pre><code>const brew = await steep({ hours: 18 })</code></pre>
    </li>
    <li>
      <strong>Humblebrag chartreuse YOLO pug.</strong>
      <blockquote>
        Mixtape actually wolf godard four loko ugh distillery marfa vaporware.
      </blockquote>
    </li>
  </ul>
  <p>A task list, the way Markdown renderers output it:</p>
  <ul>
    <li>
      <label><input type="checkbox" checked disabled /> Grind the beans</label>
    </li>
    <li>
      <label
        ><input type="checkbox" checked disabled /> Steep for 18 hours</label
      >
    </li>
    <li>
      <label><input type="checkbox" disabled /> Drink it all</label>
    </li>
  </ul>

  <h2>Description lists</h2>
  <p>
    Tbh literally roof party four loko snackwave vexillologist cold-pressed
    tilde heirloom knausgaard. Ugh pabst actually dreamcatcher&hellip;okay?
  </p>
  <dl>
    <dt>Why do fixies have no brakes?</dt>
    <dd>
      Chartreuse tumblr raw denim crucifix pabst enamel pin. Quas cupiditate
      laboriosam fugiat tote bag mlkshk.
    </dd>
    <dt>Cold brew</dt>
    <dt>Cold drip</dt>
    <dd>Two terms sharing one description.</dd>
    <dt>Pour-over</dt>
    <dd>One term with two descriptions.</dd>
    <dd>This is the second one.</dd>
    <dt><code>steepHours</code></dt>
    <dd>
      <p>A description with several blocks.</p>
      <ul>
        <li>Defaults to <code>18</code>.</li>
        <li>Must be a positive number.</li>
      </ul>
    </dd>
  </dl>

  <h2>Blockquotes</h2>
  <p>Without any inner elements:</p>
  <blockquote>
    Typography is pretty important if you don't want your stuff to look like
    trash. Make it good then it won't be bad.
  </blockquote>
  <p>With paragraphs, a list and a citation:</p>
  <blockquote>
    <p>
      Crucifix vegan ennui knausgaard tousled disrupt mixtape sartorial
      asymmetrical bitters.
    </p>
    <ul>
      <li>Skateboard letterpress cold-pressed.</li>
      <li>Palo santo trust fund vexillologist.</li>
    </ul>
    <p>Roof party microdosing flannel cloud bread.</p>
    <footer><cite>Someone who owns a fixie</cite></footer>
  </blockquote>
  <p>Nested, like an email reply chain:</p>
  <blockquote>
    <p>Sounds good, see you at the farmers market.</p>
    <blockquote>
      <p>Are we still on for Saturday?</p>
      <blockquote>
        <p>Third level of quoting, for the truly committed.</p>
      </blockquote>
    </blockquote>
  </blockquote>
  <p>Inside a figure, with a caption as attribution:</p>
  <figure>
    <blockquote>
      <p>The kombucha was fermenting before it was cool.</p>
    </blockquote>
    <figcaption>A barista, probably</figcaption>
  </figure>

  <h2>Code</h2>
  <p>
    Flexitarian <code>brew.config.js</code> kogi hashtag vaporware, set
    <var>steepHours</var> to taste:
  </p>
  <pre><code>module.exports = {
  grind: "coarse",
  origin: "single-origin",
  roast: {
    level: "light",
  },

  steepHours: 18,
  plugins: ["oat-milk", "pour-over"],
}</code></pre>
  <p>A line that is far too long for the container has to scroll, not wrap:</p>
  <pre><code>const menu = ["cold brew", "pour-over", "oat milk latte", "matcha", "kombucha", "drinking vinegar", "turmeric latte", "flat white"]</code></pre>
  <p>Markup inside a code block has to be escaped:</p>
  <pre><code>&lt;article class="ui-rich-text"&gt;
  &lt;h1&gt;Hello &amp;amp; welcome&lt;/h1&gt;
&lt;/article&gt;</code></pre>
  <p>
    Terminal output in a <code>pre</code> with <code>samp</code> instead of
    <code>code</code>:
  </p>
  <pre><samp>$ brew --version
cold-brew 1.0.0</samp></pre>
  <p>Preformatted text without any code at all:</p>
  <pre>
  Roses are red,
      violets are blue,
          whitespace is kept,
              and so is this, too.</pre>
  <figure>
    <pre><code>brew --steep 18h --grind coarse</code></pre>
    <figcaption>A code block with a caption.</figcaption>
  </figure>

  <h2>Media</h2>
  <p>Raclette actually marfa air plant gluten-free knausgaard:</p>
  <figure>
    <img
      src="https://images.unsplash.com/photo-1774268184985-f1af67b38179?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Lush green hills surround dark blue lakes under cloudy sky"
      decoding="async"
      loading="lazy"
    />
    <figcaption>
      Taxidermy tousled heirloom letterpress mixtape hashtag. Yr pabst cliche
      mlkshk vaporware affogato poutine scenester tote bag jianbing, a caption
      long enough to wrap onto a second line.
    </figcaption>
  </figure>
  <p>
    An image outside a figure, wrapped in a paragraph like Markdown does it:
  </p>
  <p>
    <img
      src="https://images.unsplash.com/photo-1774268184985-f1af67b38179?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Lush green hills surround dark blue lakes under cloudy sky"
      decoding="async"
      loading="lazy"
    />
  </p>

  <h2>Tables</h2>
  <p>Tables from Markdown or a CMS never come with classes:</p>
  <table>
    <caption>
      Cold brew ratios
    </caption>
    <thead>
      <tr>
        <th scope="col">Method</th>
        <th scope="col">Grind</th>
        <th scope="col">Ratio</th>
        <th scope="col">Hours</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Immersion</th>
        <td>Coarse</td>
        <td><code>1:8</code></td>
        <td>18</td>
      </tr>
      <tr>
        <th scope="row">Slow drip</th>
        <td>Medium, with a longer note that has to wrap inside its cell</td>
        <td><code>1:10</code></td>
        <td>4</td>
      </tr>
      <tr>
        <th scope="row">Japanese iced</th>
        <td>Fine</td>
        <td><code>1:15</code></td>
        <td>0.1</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Average</th>
        <td></td>
        <td></td>
        <td>7.4</td>
      </tr>
    </tfoot>
  </table>

  <h2>Other elements</h2>
  <details>
    <summary>A closed disclosure</summary>
    <p>Hidden until opened.</p>
  </details>
  <details open>
    <summary>An open disclosure with blocks inside</summary>
    <p>Chartreuse tumblr raw denim crucifix pabst enamel pin.</p>
    <ul>
      <li>Quas cupiditate laboriosam.</li>
      <li>Fugiat tote bag mlkshk.</li>
    </ul>
  </details>
  <address>
    Kombucha HQ<br />
    123 Pour-over Lane<br />
    Brooklyn, NY 11211
  </address>
  <p>
    Text in other scripts, like Japanese:
    <span lang="ja">吾輩は猫である。名前はまだ無い。</span>
  </p>
  <div dir="rtl" lang="ar">
    <p>هذه فقرة مكتوبة من اليمين إلى اليسار.</p>
    <ul>
      <li>العنصر الأول</li>
      <li>العنصر الثاني</li>
    </ul>
    <blockquote>اقتباس قصير للتحقق من اتجاه الحد.</blockquote>
  </div>
  <p>Content inside <code>.ui-not-rich-text</code> opts out:</p>
  <div class="ui-not-rich-text">
    <h3>An unstyled heading</h3>
    <ul>
      <li>An unstyled list item</li>
    </ul>
    <p><a href="#typography-default-1">An unstyled link</a></p>
  </div>
  <p>And now we're back in rich text.</p>

  <hr />

  <ol>
    <li id="typography-default-2">
      A footnote at the very end of the article.
      <a href="#typography-default-2-ref" aria-label="Back to reference 1">↩</a>
    </li>
  </ol>
</article>
```

## API

### Typography API

| Type          | Modifiers                                                                                                                                                  | Default | Description                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blockquote    | `.ui-blockquote`                                                                                                                                           | -       | Quoted block with a start border.                                                                                                                  |
| Caption       | `.ui-caption`                                                                                                                                              | -       | Muted supporting text.                                                                                                                             |
| Code block    | `pre.ui-code-block`                                                                                                                                        | -       | Monospace preformatted block.                                                                                                                      |
| Heading       | `.ui-h1`, `.ui-h2`, `.ui-h3`, `.ui-h4`, `.ui-h5`, `.ui-h6`                                                                                                 | -       | Heading styles for any element.                                                                                                                    |
| Heading group | `.ui-hgroup`                                                                                                                                               | -       | Groups an overline, heading, and optional body copy.                                                                                               |
| Inline        | `.ui-abbr`, `.ui-cite`, `.ui-del`, `.ui-dfn`, `.ui-ins`, `.ui-kbd`, `.ui-mark`, `.ui-s`, `.ui-samp`, `.ui-small`, `.ui-sub`, `.ui-sup`, `.ui-u`, `.ui-var` | -       | Inline text element utilities.                                                                                                                     |
| Link          | `.ui-link`                                                                                                                                                 | -       | Link styles outside `.ui-rich-text`. On hover and focus, the underline gets thicker. The color gets darker in light mode and lighter in dark mode. |
| Not rich text | `.ui-not-rich-text`                                                                                                                                        | -       | Ends the `.ui-rich-text` styles inside it.                                                                                                         |
| Overline      | `.ui-overline`                                                                                                                                             | -       | Small uppercase label text.                                                                                                                        |
| Paragraph     | `.ui-p`                                                                                                                                                    | -       | Body paragraph styling.                                                                                                                            |
| Sizes         | default, `.ui-large`, `.ui-small`                                                                                                                          | default | Size modifiers on `.ui-p`.                                                                                                                         |

#### Parts

| Part            | Description                                         |
| --------------- | --------------------------------------------------- |
| `.ui-rich-text` | Classless typography for uncontrolled child markup. |

#### CSS variables

| Variable                         | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                                                                                                | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-width`              | `1px`                                                                                                                                                                                            | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-border-width-thick`        | `var(--border-size-2)`                                                                                                                                                                           | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                              |
| `--ui-code-bg-color`             | `light-dark(oklch(0 0 0 / 12%), oklch(1 0 0 / 10%))`                                                                                                                                             | Background of inline `code` in rich text and `Typography`. A translucent black in light mode and white in dark mode, fainter with more contrast so the text stands out.                                                                                                                                                                                                                  |
| `--ui-code-block-bg-color`       | `var(--ui-color-15)`                                                                                                                                                                             | Background of `pre.ui-code-block` and `pre` in rich text. A dark shade of the palette in both modes.                                                                                                                                                                                                                                                                                     |
| `--ui-code-block-text-color`     | `var(--ui-color-1)`                                                                                                                                                                              | Text color of `pre.ui-code-block` and `pre` in rich text.                                                                                                                                                                                                                                                                                                                                |
| `--ui-font-body`                 | `var(--font-sans)`                                                                                                                                                                               | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                                                                                                                                                                                     |
| `--ui-font-code`                 | `var(--font-mono)`                                                                                                                                                                               | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                        |
| `--ui-font-heading`              | Unset                                                                                                                                                                                            | Font family for `h1`–`h6` and the `.ui-h1`–`.ui-h6` classes. When unset, headings follow `--ui-font-body`.                                                                                                                                                                                                                                                                               |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                                                                                                                                                        | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                           |
| `--ui-font-size-h1`              | `clamp( var(--ui-font-size-700), 9vi, var(--ui-font-size-900) )`                                                                                                                                 | Font size for `h1` and `.ui-h1`. Fluid between `--ui-font-size-700` and `--ui-font-size-900`.                                                                                                                                                                                                                                                                                            |
| `--ui-font-size-h2`              | `clamp( var(--ui-font-size-600), 6vi, var(--ui-font-size-800) )`                                                                                                                                 | Font size for `h2` and `.ui-h2`. Fluid between `--ui-font-size-600` and `--ui-font-size-800`.                                                                                                                                                                                                                                                                                            |
| `--ui-font-size-h3`              | `clamp( var(--ui-font-size-500), 4vi, var(--ui-font-size-600) )`                                                                                                                                 | Font size for `h3` and `.ui-h3`. Fluid between `--ui-font-size-500` and `--ui-font-size-600`.                                                                                                                                                                                                                                                                                            |
| `--ui-font-size-h4`              | `clamp( var(--ui-font-size-400), 3vi, var(--ui-font-size-500) )`                                                                                                                                 | Font size for `h4` and `.ui-h4`. Fluid between `--ui-font-size-400` and `--ui-font-size-500`.                                                                                                                                                                                                                                                                                            |
| `--ui-font-size-h5`              | `var(--ui-font-size-400)`                                                                                                                                                                        | Font size for `h5` and `.ui-h5`. Defaults to `--ui-font-size-400`.                                                                                                                                                                                                                                                                                                                       |
| `--ui-font-size-h6`              | `var(--ui-font-size-300)`                                                                                                                                                                        | Font size for `h6` and `.ui-h6`. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                                                                                       |
| `--ui-font-size-large`           | `var(--ui-font-size-500)`                                                                                                                                                                        | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                                                                                                                                                                                                        |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                  |
| `--ui-font-weight-bold`          | `var(--font-weight-7)`                                                                                                                                                                           | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-font-weight-medium`        | `var(--font-weight-5)`                                                                                                                                                                           | Font weight for badges, overlines and group labels.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-letter-spacing-caps`       | `0.06em`                                                                                                                                                                                         | Letter spacing of uppercase text: overlines and the first paragraph of an `hgroup`.                                                                                                                                                                                                                                                                                                      |
| `--ui-letter-spacing-display`    | `-0.02em`                                                                                                                                                                                        | Letter spacing of `h1` and `h2`, tighter than the body.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-letter-spacing-heading`    | `-0.01em`                                                                                                                                                                                        | Letter spacing of `h3` and `h4`, slightly tighter than the body.                                                                                                                                                                                                                                                                                                                         |
| `--ui-line-height`               | `1.6`                                                                                                                                                                                            | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                               |
| `--ui-palette-accent`            | `light-dark(var(--ui-color-9), var(--ui-color-7))`                                                                                                                                               | The accent shade of the current palette: `Callout` icons and outlined borders, the `abbr` underline. Stronger with more contrast. Re-derived inside every severity scope, so `.ui-success` gets a green one.                                                                                                                                                                             |
| `--ui-palette-text`              | `light-dark(var(--ui-color-11), var(--ui-color-6))`                                                                                                                                              | A readable text shade of the current palette: `del`, `ins`, `.ui-del` and `.ui-ins`. Darker in light mode and lighter in dark mode with more contrast. Re-derived inside every severity scope.                                                                                                                                                                                           |
| `--ui-primary-text`              | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                    | `var(--size-2)`                                                                                                                                                                                  | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                         |
| `--ui-radius-small`              | `min(var(--radius-2), var(--ui-radius))`                                                                                                                                                         | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px.                                                                                                                                                                                                                                  |
| `--ui-rhythm-step`               | `0.25rem`                                                                                                                                                                                        | Vertical rhythm unit. Rich text margins and heading line heights round to it.                                                                                                                                                                                                                                                                                                            |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-4`                   | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-text`                      | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                         |
| `--ui-text-subtle-on-inverse`    | `light-dark( var(--ui-gray-4), var(--ui-gray-13) )`                                                                                                                                              | Subtle text color on an inverted fill: `kbd` and `var`, drawn on `--ui-text`.                                                                                                                                                                                                                                                                                                            |
| `--ui-underline-offset`          | `2px`                                                                                                                                                                                            | Gap between text and its underline: `Link` and rich text links, and in Firefox `abbr`, `dfn`, `ins` and `u`.                                                                                                                                                                                                                                                                             |
| `--ui-underline-offset-small`    | `1px`                                                                                                                                                                                            | Gap between text and the underline of `abbr`, `dfn`, `ins` and `u` and their classes. Firefox uses `--ui-underline-offset`.                                                                                                                                                                                                                                                              |
| `--ui-underline-thickness-hover` | `3px`                                                                                                                                                                                            | Underline thickness of `Link` and rich text links on hover and keyboard focus. At rest they keep the font's own thickness.                                                                                                                                                                                                                                                               |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

Add the classes to elements in your markup. There is no Svelte component.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

### link.css

| Property        | Kind  | Description                                                |
| --------------- | ----- | ---------------------------------------------------------- |
| `--_text-color` | Input | Text and underline color. Defaults to `--ui-primary-text`. |

### typography.css

| Property          | Kind   | Description                                                                                                  |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `--_count-digits` | Output | Digits reserved for the numbers of an `ol`, from its number of items.                                        |
| `--_flow-gap`     | Input  | Space between blocks in `.ui-rich-text`. Heading, `hr` and `figure` margins are multiples of it.             |
| `--_font-scale`   | Output | Ratio of `1em` to `1rem` that scales heading sizes with the surrounding font size.                           |
| `--_start-digits` | Output | Digits reserved for the numbers of an `ol`, from its `start` attribute.                                      |
| `--_text-color`   | Input  | Text and underline color of links without a `ui-` class in `.ui-rich-text`. Defaults to `--ui-primary-text`. |

## Under the hood

Read the post: [Vertical rhythm with round()](https://open-props-ui.netlify.app/learn/vertical-rhythm-round)

1. Unsnapped

   - Stripes mark each line box (`1lh`), dotted lines mark `--ui-rhythm-step`
   - A plain `line-height` lands between grid lines at most sizes

2. Snap line height

   - `round(up, …, step)` snaps the line height to the next step
   - `1em + 0.5rem`: tight for large headings, roomy for small ones
   - One rule for every heading level

3. Snap font size

   - Fluid sizes land on half a step
   - Drag **Font size**: it moves in steps, not pixels

4. Flow space

   - One flow space derived from the body text
   - `@property` makes it a length, so `1.25em` resolves once, on `.prose`. Unregistered, each heading would resolve it against its own font size
   - `round()` puts it on the step. Fractions of it round again
   - More space above a heading than below: it sits with the text it introduces

Step 1 of 4: Unsnapped

```css
.prose h2 {
  font-size: var(--size);
  line-height: 1.2;
}
```

Step 2 of 4: Snap line height

- [`round(), mod(), and rem()` ](https://webstatus.dev/features/round-mod-rem)(Newly available): Chrome 125+, Edge 125+, Firefox 118+, Safari 17.2+

```css
.prose :is(h1, h2, h3, h4, h5, h6) {
  line-height: round(up, 1em + 0.5rem, var(--ui-rhythm-step));
}
```

Step 3 of 4: Snap font size

- [`round(), mod(), and rem()` ](https://webstatus.dev/features/round-mod-rem)(Newly available): Chrome 125+, Edge 125+, Firefox 118+, Safari 17.2+

```css
.prose h2 {
  font-size: round(var(--size), var(--ui-rhythm-step) / 2);
}
```

Step 4 of 4: Flow space

- [Registered custom properties ](https://webstatus.dev/features/registered-custom-properties)(Newly available): Chrome 85+, Edge 85+, Firefox 128+, Safari 16.4+
- [`round(), mod(), and rem()` ](https://webstatus.dev/features/round-mod-rem)(Newly available): Chrome 125+, Edge 125+, Firefox 118+, Safari 17.2+

```css
@property --flow-space {
  inherits: true;
  initial-value: 0px;
  syntax: "<length>";
}

.prose {
  --flow-space: round(1.25em, var(--ui-rhythm-step));
}

.prose > * {
  margin-block: 0 var(--flow-space);
}

.prose h2 {
  margin-block: calc(var(--flow-space) * 3)
    round(var(--flow-space) * 0.75, var(--ui-rhythm-step));
}
```

## Browser support

- Chromium: Full support Supported since v143.
- Firefox: Partial support Missing: text-wrap-pretty.
- Safari: Partial support Missing: box-decoration-break, marker.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Typography.md).

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/typography.css`
- `opui-css/css/components/link.css`

## Changelog

### What's new

- [Inline `code`](#rich-text-showcase) reads `--ui-code-bg-color`, code blocks read `--ui-code-block-bg-color` and `--ui-code-block-text-color`, and `del`, `ins` and `abbr` read the `--ui-palette-*` roles.
- Inline `code`, `kbd`, `mark` and `var` are rounded with `--ui-radius-small`, and the blockquote bar and table rules follow `--ui-border-width-thick`.
- Text sizes follow the type roles `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body` and `--ui-font-size-large` on the `--ui-font-size-100` to `900` scale, with `--ui-line-height-*` and `--ui-letter-spacing-*` roles for the rest, so a theme reshapes the type in a few lines.
- [Rich text](#classless) spacing comes from one flow space, with more room above headings than below.
- Breaking: [heading sizes](#variants) changed. Sizes and line heights snap to `--ui-rhythm-step`, and the heading scale no longer inverts on narrow screens.
- Breaking: [rich text](#classless) only styles headings without a class, like lists. Add a `.ui-h1`–`.ui-h6` class to a heading that has another class.
- [Rich text](#rich-text-showcase) styles tables, which scroll sideways in narrow columns, `hr` and task lists.
- Breaking: [rich text](#classless) sits in the `components.prose` layer, below components, so components inside prose keep their own styles. If you declare the layer order yourself, add `components.prose` before `components.root`.
- [Rich text](#rich-text-showcase) headings, `pre` and `small` scale with the surrounding font size, and so does [`.ui-small`](#inline-text-elements).
- Rich text `var` is monospace, like [`.ui-var`](#inline-text-elements).
- [Links](#link) are documented, and get a thicker underline on hover.
- Headings read [`--ui-font-heading`](#api), and code, `kbd`, `samp` and `.ui-var` read `--ui-font-code`. Rich text margins read the `--ui-space-*` scale.
- [Links](#link) read `--ui-primary-text`, which keeps 4.5:1 on every surface, in a List too.
- [Links](#link) and [underlined text](#inline-text-elements) read `--ui-underline-offset`, `--ui-underline-offset-small` and `--ui-underline-thickness-hover`.
