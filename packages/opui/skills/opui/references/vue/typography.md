# Typography

Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in `.ui-rich-text`.

### What's new

- [Rich text](#classless) spacing comes from one flow space, with more room above headings than below.
- Heading sizes and line heights snap to `--rhythm-step`, and the heading scale no longer inverts on narrow screens.
- [Rich text](#rich-text-showcase) styles tables, `hr` and task lists.
- Rich text sits in the `components.prose` layer, below components, so components inside prose keep their own styles.
- Rich text headings, `pre` and `small` scale with the surrounding font size.
- [Links](#link) are documented, and get a thicker underline on hover.

## Class-based

Utils that you can plop down wherever.

### Variants

```vue
<template>
  <h1 class="ui-h1">Heading 1</h1>
  <h2 class="ui-h2">Heading 2</h2>
  <h3 class="ui-h3">Heading 3</h3>
  <h4 class="ui-h4">Heading 4</h4>
  <h5 class="ui-h5">Heading 5</h5>
  <h6 class="ui-h6">Heading 6</h6>
  <p class="ui-p ui-large">Body Large</p>
  <p class="ui-p">Body</p>
  <p class="ui-overline">Overline</p>
  <p class="ui-caption">Caption</p>
</template>
```

### Heading group

```vue
<template>
  <div class="ui-hgroup">
    <p class="ui-overline">Zero or more p elements</p>
    <h2 class="ui-h2">Followed by one h* element</h2>
    <p class="ui-p">Followed by zero or more p elements</p>
  </div>
</template>
```

### Blockquote

### Link

Use `.ui-link` for links outside `.ui-rich-text`. Inside rich text, links get the same style without a class. On hover and focus the underline gets thicker, and the color darkens in light mode and lightens in dark mode.

```vue
<template>
  <p>Read the <a class="ui-link" href="#link">guide</a> first.</p>
</template>
```

### Code block

## Inline text elements

| Result            | Element           | Class       |
| ----------------- | ----------------- | ----------- |
| Abbr.             | `<abbr>`          | `.ui-abbr`  |
| Definition        | `<dfn>`           | `.ui-dfn`   |
| **Bold**          | `<strong>`, `<b>` | —           |
| *Italic*          | `<i>`, `<em>`     | —           |
| Citation          | `<cite>`          | `.ui-cite`  |
| `Ctrl + S`        | `<kbd>`           | `.ui-kbd`   |
| [Link](#link)     | `<a href>`        | `.ui-link`  |
| *Highlight*       | `<mark>`          | `.ui-mark`  |
| ~~Strikethrough~~ | `<s>`             | `.ui-s`     |
| Small             | `<small>`         | `.ui-small` |
| Text Sub          | `<sub>`           | `.ui-sub`   |
| Text Sup          | `<sup>`           | `.ui-sup`   |
| *Underline*       | `<u>`             | `.ui-u`     |
| ~~Deleted~~       | `<del>`           | `.ui-del`   |
| Inserted          | `<ins>`           | `.ui-ins`   |
| `variable`        | `<var>`           | `.ui-var`   |
| `sample output`   | `<samp>`          | `.ui-samp`  |

## Classless

Wrap your code in `.ui-rich-text` to add typographic styles to its children. It's extra handy when you can't control the contents yourself, like printing text from a CMS.

```html
<article class="ui-rich-text">
  <!-- -->
</article>
```

### Classless showcase

Let's put everything together and see how all elements look in a classless, rich-text context.

```vue
<template>
  <article class="ui-rich-text">
    <hgroup>
      <p>Typography showcase</p>
      <h1>
        Fixie beard tumeric: What the kombucha tells us about every element
      </h1>
      <p>
        Ugh, raw denim four loko bitters cold-pressed whatever retro tousled
        tilde pabst. Not a single class name below, just plain HTML.
      </p>
      <p>A second subtitle paragraph, because some CMSes will do that.</p>
    </hgroup>
    <p>
      Kitsch tbh pug banjo distillery cred listicle typewriter snackwave
      knausgaard tousled. Offal chicharrones humblebrag wolf affogato whatever
      swag four loko vaporware poutine roof party. Raclette
      <em>drinking vinegar</em> chartreuse gochujang kogi heirloom ugh snackwave
      banh mi cray cliche locavore,
      <a href="#inline-text">skip to inline text</a>.
    </p>
    <p>
      Gluten-free ennui air plant franzen tattooed poutine scenester tote bag
      microdosing affogato kinfolk iceland vegan. Celiac literally:
    </p>
    <blockquote>
      Cornhole actually <code>h1</code> tumblr tacos mumblecore twee. Crucifix
      pour-over leggings heirloom chartreuse cloud bread trust fund lyft keytar.
      <footer>
        — <cite>Flexitarian single-origin, somewhere off the L train</cite>
      </footer>
    </blockquote>
    <p>
      Locavore ennui adaptogen literally palo santo flannel <code>p</code> +1
      hashtag meggings sartorial disrupt.
    </p>


    <hr />


    <h2 id="inline-text">Inline text</h2>
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
      <kbd>Esc</kbd>,
      <kbd><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></kbd
      >, <samp>sample output</samp>, <var>steepHours</var>,
      <time datetime="2026-09-30">September 30</time>,
      <data value="42">forty-two</data> and a <span>plain span</span>.
    </p>
    <p>
      Nested inline elements: <a href="#inline-text"><code>linked code</code></a
      >, <a href="#inline-text"><strong>linked strong</strong></a
      >, <mark>highlight with <a href="#inline-text">a link</a> inside</mark>,
      <del><code>deleted code</code></del
      >, <ins><code>inserted code</code></ins
      >, <em><code>emphasized code</code></em
      >,
      <small
        >small with <code>code</code> and <a href="#inline-text">link</a></small
      >, <strong><kbd>Enter</kbd></strong> and
      <sup><a href="#inline-text">sup link</a></sup
      >.
    </p>
    <p>
      Links come in a few flavors: an
      <a href="https://github.com/felix-bohlin/ui">external link</a>, an
      <a href="#inline-text">in-page anchor</a>, and a placeholder
      <a>anchor without an href</a> that shouldn't look clickable.
    </p>
    <p>
      Long inline runs have to wrap gracefully. Mixtape actually wolf godard
      <mark
        >four loko ugh distillery marfa vaporware cliche celiac, this highlight
        keeps going until it breaks onto another line and keeps its
        padding</mark
      >
      and then
      <a href="#inline-text"
        >this link also runs long enough that it needs to wrap across a line
        break without losing its underline</a
      >. Same goes for
      <code
        >a.very.long.inline.code.span.that.has.no.natural.break.points.whatsoever</code
      >
      and a bare URL like
      https://example.com/a/really/long/path/that/does/not/contain/any/spaces/at/all/and/overflows?utm_source=typography&utm_medium=stress-test.
    </p>
    <p>
      Superscripts and subscripts must not blow out the line height of a
      paragraph. Here is a footnote reference<sup
        ><a href="#footnote-1" id="footnote-ref-1">1</a></sup
      >
      in the middle of a line, then some more text so it wraps, CO<sub>2</sub>
      emissions, 2<sup>10</sup> = 1024 and the 21<sup>st</sup> century, just to
      be sure the lines above and below stay evenly spaced.
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
    <p>
      Lumbersexual praxis distillery cold-pressed tilde keffiyeh cred vinyl.
    </p>
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
      Phew, with any luck the headings above sit close together and this
      paragraph hugs the last one.
    </p>


    <h3>Sibling headings of the same level</h3>
    <h3>Like this one, right after another <code>h3</code></h3>
    <p>Vegan poutine letterpress tacos coloring book flannel hexagon.</p>


    <h3>
      A heading with <code>code</code>, <em>emphasis</em> and
      <a href="#inline-text">a link</a> in it
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
    <blockquote>
      Humblebrag cloud bread kogi raw denim pabst affogato.
    </blockquote>


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
          Skateboard letterpress cold-pressed palo santo trust fund
          vexillologist roof party microdosing flannel cloud bread tote bag
          poutine affogato.
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
        <label
          ><input type="checkbox" checked disabled /> Grind the beans</label
        >
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
      <footer>— <cite>Someone who owns a fixie</cite></footer>
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
      <figcaption>— A barista, probably</figcaption>
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
    <p>
      A line that is far too long for the container has to scroll, not wrap:
    </p>
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
          <td>—</td>
          <td>—</td>
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
      <p><a href="#inline-text">An unstyled link</a></p>
    </div>
    <p>And now we're back in rich text.</p>


    <hr />


    <ol>
      <li id="footnote-1">
        A footnote at the very end of the article.
        <a href="#footnote-ref-1" aria-label="Back to reference 1">↩</a>
      </li>
    </ol>
  </article>
</template>
```

## API

| Type          | Modifiers                                                                                                                                                  | Default | Description                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Blockquote    | `.ui-blockquote`                                                                                                                                           | -       | Quoted block with a start border.                                                                                                       |
| Caption       | `.ui-caption`                                                                                                                                              | -       | Muted supporting text.                                                                                                                  |
| Code block    | `pre.ui-code-block`                                                                                                                                        | -       | Monospace preformatted block.                                                                                                           |
| Heading group | `.ui-hgroup`                                                                                                                                               | -       | Groups an overline, heading, and optional body copy.                                                                                    |
| Headings      | `.ui-h1`, `.ui-h2`, `.ui-h3`, `.ui-h4`, `.ui-h5`, `.ui-h6`                                                                                                 | -       | Heading styles for any element.                                                                                                         |
| Inline        | `.ui-abbr`, `.ui-cite`, `.ui-del`, `.ui-dfn`, `.ui-ins`, `.ui-kbd`, `.ui-mark`, `.ui-s`, `.ui-samp`, `.ui-small`, `.ui-sub`, `.ui-sup`, `.ui-u`, `.ui-var` | -       | Inline text element utilities.                                                                                                          |
| Link          | `.ui-link`                                                                                                                                                 | -       | Link styles outside `.ui-rich-text`. Hover and focus darken the color in light mode, lighten it in dark mode and thicken the underline. |
| Overline      | `.ui-overline`                                                                                                                                             | -       | Small uppercase label text.                                                                                                             |
| Paragraph     | `.ui-p`                                                                                                                                                    | -       | Body paragraph styling.                                                                                                                 |
| Sizes         | `.ui-large`, `.ui-small`                                                                                                                                   | -       | Size modifiers on `.ui-p`.                                                                                                              |

### Parts

| Part            | Description                                         |
| --------------- | --------------------------------------------------- |
| `.ui-rich-text` | Classless typography for uncontrolled child markup. |

CSS-only typography. Apply the classes on elements in templates; no Vue component.

## Under the hood

1. Unsnapped

   - Stripes mark each line box (`1lh`), dotted lines mark `--rhythm-step`
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
   - More space above a heading than below: it sits with the text it introduces

Step 1 of 4: Unsnapped

```css
.prose h2 {
  font-size: var(--size);
  line-height: 1.2;
}
```

Step 2 of 4: Snap line height

- [`round(), mod(), and rem()`](https://webstatus.dev/features/round-mod-rem) (Newly available): Chrome 125+, Edge 125+, Firefox 118+, Safari 17.2+

```css
.prose h2 {
  line-height: round(up, 1em + 0.5rem, var(--rhythm-step));
}
```

Step 3 of 4: Snap font size

```css
.prose h2 {
  font-size: round(var(--size), var(--rhythm-step) / 2);
}
```

Step 4 of 4: Flow space

```css
.prose {
  --flow-space: 1.25em;
}


.prose > * {
  margin-block: 0 var(--flow-space);
}


.prose h2 {
  margin-block: calc(var(--flow-space) * 1.5) calc(var(--flow-space) * 0.5);
}
```

## Browser support

- Chromium: Full support Supported since v143.
- Firefox: Partial support Missing: text-wrap-pretty.
- Safari: Partial support Missing: box-decoration-break.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Typography.md).

## Installation

- `opui-css/css/components/typography.css`
- `opui-css/css/components/link.css`

