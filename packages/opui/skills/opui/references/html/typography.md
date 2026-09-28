# Typography

Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in `.ui-rich-text`.

## Class-based

Utils that you can plop down wherever.

### Variants

```html
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
```

### Heading group

```html
<div class="ui-hgroup">
  <p class="ui-overline">Zero or more p elements</p>
  <h2 class="ui-h2">Followed by one h* element</h2>
  <p class="ui-p">Followed by zero or more p elements</p>
</div>
```

### Blockquote

```html
<blockquote class="ui-blockquote">
  "Occupy your mind, don't stay home. Talk to all your friends, but don't look
  at your phone”
  <footer>— Marika Hackman, <cite>No Caffeine</cite></footer>
</blockquote>
```

### Code block

```html
<pre class="ui-code-block"><code>.ui-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-3);
  padding: var(--size-4);
}</code></pre>
```

## Inline text elements

| Result            | Element           | Class       |
| ----------------- | ----------------- | ----------- |
| Abbr.             | `<abbr>`          | `.ui-abbr`  |
| Definition        | `<dfn>`           | `.ui-dfn`   |
| **Bold**          | `<strong>`, `<b>` | —           |
| *Italic*          | `<i>`, `<em>`     | —           |
| Citation          | `<cite>`          | `.ui-cite`  |
| `Ctrl + S`        | `<kbd>`           | `.ui-kbd`   |
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

```html
<article class="ui-rich-text">
  <hgroup>
    <p>Typography showcase</p>
    <h1>Fixie beard tumeric: What the kombucha tells us</h1>
    <p>
      Ugh, raw denim four loko bitters cold-pressed whatever retro tousled tilde
      pabst.
    </p>
  </hgroup>
  <p>
    Kitsch tbh pug banjo distillery cred listicle typewriter snackwave
    knausgaard tousled. Offal chicharrones humblebrag wolf affogato whatever
    swag four loko vaporware poutine roof party. Raclette
    <em>drinking vinegar</em> chartreuse gochujang kogi heirloom ugh snackwave
    banh mi cray cliche locavore.
  </p>
  <p>
    Gluten-free ennui air plant franzen tattooed poutine scenester tote bag
    microdosing affogato kinfolk iceland vegan. Celiac literally:
  </p>
  <blockquote>
    Cornhole actually <code>h1</code> tumblr tacos mumblecore twee. Crucifix
    pour-over leggings heirloom chartreuse cloud bread trust fund lyft keytar.
    <footer>
      - <cite>Flexitarian single-origin, somewhere off the L train</cite>
    </footer>
  </blockquote>
  <p>
    Locavore ennui adaptogen literally palo santo flannel <code>p</code> +1
    hashtag meggings sartorial disrupt. Mlkshk <em>post-ironic</em> biodiesel
    praxis craft beer snackwave bitters swag hexagon tattooed tousled.
  </p>


  <hr class="ui-divider" />


  <h2>Mumblecore tbh snackwave pork belly</h2>
  <p>
    Mlkshk master cleanse vexillologist keffiyeh selvage hella wolf thundercats
    godard asymmetrical tattooed pabst. Tbh
    <strong>vaporware pickled</strong> cardigan tousled trust fund coloring book
    fam shaman, unordered lists, ordered lists, code blocks, block quotes,
    <em>and even air plant</em>.
  </p>
  <p>Microdosing literally taxidermy flannel pork belly:</p>
  <ol>
    <li>
      <s>Artisan</s> mass-produced roof party whatever pickled gluten-free.
    </li>
    <li>Hashtag literally small batch ugh kogi leggings snackwave.</li>
    <li>
      Chambray vegan pug ennui cornhole bitters lumbersexual:
      <ul>
        <li>Bitters glazed oat milk.</li>
        <li>Vegan enamel pin cortado.</li>
      </ul>
    </li>
  </ol>
  <p>Authentic tacos mixtape squid meggings tote bag.</p>
  <h3>Chartreuse humblebrag palo santo</h3>
  <p>
    Lumbersexual praxis distillery cold-pressed tilde keffiyeh cred vinyl plaid
    ascot narwhal brooklyn.
  </p>
  <p>Raclette actually marfa air plant gluten-free knausgaard:</p>
  <figure>
    <img
      src="https://images.unsplash.com/photo-1774268184985-f1af67b38179?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Lush green hills surround dark blue lakes under cloudy sky" decoding="async" loading="lazy" />
    <figcaption>
      Taxidermy tousled heirloom letterpress mixtape hashtag. Yr pabst cliche
      mlkshk vaporware affogato poutine scenester tote bag jianbing.
    </figcaption>
  </figure>
  <p>Thundercats hexagon wolf enamel pin craft beer:</p>
  <ul>
    <li>Selvage cardigan asymmetrical snackwave pug.</li>
    <li>Bitters gluten-free mixtape tumeric tote bag scenester.</li>
    <li>Humblebrag cloud bread kogi raw denim pabst affogato.</li>
  </ul>
  <p>Crucifix lumbersexual roof party skateboard.</p>


  <h2>Tumblr tbh disrupt keffiyeh?</h2>
  <h3>Vaporware praxis enamel pin, too.</h3>
  <p>
    Tilde four loko banh mi lyft flexitarian sartorial neutra literally pug
    hashtag taxidermy affogato knausgaard distillery humblebrag.
  </p>
  <h3>When a cold brew comes after a pour-over …</h3>
  <p>
    Squid thundercats mumblecore celiac typewriter ugh mlkshk cornhole locavore
    chartreuse. Microdosing shaman keffiyeh selvage.
  </p>
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
      <p>
        Neutra gluten-free narwhal kogi pabst air plant coloring book lyft tbh
        hashtag praxis lumbersexual.
      </p>
    </li>
    <li>
      <strong>Humblebrag chartreuse YOLO pug.</strong>
      <p>
        Mixtape actually wolf godard four loko ugh distillery marfa vaporware
        cliche celiac. I'm going to press <kbd>Enter</kbd> now.
      </p>
    </li>
  </ul>
  <p>Taxidermy sriracha selvage everyday carry raclette tousled.</p>


  <h2>Mlkshk jianbing tbh snackwave.</h2>
  <p>
    Thundercats
    <a href="https://highlightjs.org/" class="ui-link">pabst enamel pin</a> or
    <a href="https://prismjs.com/" class="ui-link">heirloom crucifix</a> banh mi
    leggings vexillologist cardigan <em>scenester</em> tilde locavore
    asymmetrical.
  </p>
  <p>
    Flexitarian <code>brew.config.js</code> kogi hashtag vaporware, set
    <var>steepHours</var> to taste:
  </p>
  <pre><code>module.exports = {
  grind: 'coarse',
  origin: 'single-origin',
  roast: {
    level: 'light',
  },
  steepHours: 18,
  plugins: ['oat-milk', 'pour-over'],
}</code></pre>
  <p>
    Narwhal <abbr title="You Only Live Once">YOLO</abbr> authentic letterpress
    affogato. The terminal said <samp>Error: cold brew timeout</samp>.
  </p>


  <h2>Pork belly hella keffiyeh description lists</h2>
  <p>
    Tbh literally roof party four loko snackwave vexillologist cold-pressed
    tilde heirloom knausgaard. Ugh pabst actually dreamcatcher&hellip;okay?
    Scenester marfa banh mi lumbersexual.
  </p>
  <dl>
    <dt>Why do fixies have no brakes?</dt>
    <dd>
      Chartreuse tumblr raw denim crucifix pabst enamel pin. Quas cupiditate
      laboriosam fugiat tote bag mlkshk.
    </dd>
    <dt>What do you call a vegan who codes?</dt>
    <dd>
      Gluten-free javascript. Lorem ipsum dolor sit amet consectetur distillery
      elit. Culpa, voluptas kogi quia excepturi, quibusdam natus exercitationem
      adaptogen tempore labore.
    </dd>
    <dt>Why can't mumblecore go to the farmers market?</dt>
    <dd>
      Because it sold out. Lorem ipsum dolor sit amet, consectetur snackwave
      elit. Ipsam, quas voluptatibus ex culpa ipsum, affogato blanditiis
      humblebrag ullamco magnam suscipit deserunt pug natus.
    </dd>
  </dl>


  <h2>There are other elements we need to style</h2>
  <p>
    Hella <del>mixtape</del> <ins>tracksuit</ins> tattooed, like
    <a href="https://open-props.style" class="ui-link">this palo santo chartreuse knausgaard</a>. <u>Tilde vaporware</u>
    actually leggings gochujang, feels more
    <mark>williamsburg</mark>.
    <small>Not financial advice.</small>
  </p>
  <p>
    Narwhal <dfn title="A type of fictional cat">thundercats</dfn> air plant
    <code><span></code> locavore bitters
    <code>@opui/typography</code> tote bag godard. H<sub>2</sub>O and
    footnotes<sup>1</sup>.
  </p>


  <h3>Sometimes I even use <code>code</code> in headings</h3>
  <p>
    Microdosing crucifix ennui pabst marfa lyft tbh. This
    <em>"wrap the cornhole in backticks"</em>
    typewriter flannel snackwave humblebrag four loko.
  </p>
  <p>
    Kogi raclette scenester pickled enamel pin
    <a href="https://github.com/felix-bohlin/ui" class="ui-link"><code>felix-bohlin/ui</code></a>
    distillery praxis selvage.
  </p>


  <h4>We haven't used an <code>h4</code> yet</h4>
  <p>But now we have.</p>


  <h5>And here comes an <code>h5</code></h5>
  <p>
    Rarely needed, but it exists and should look intentional, not like broken
    body copy.
  </p>


  <h6>And finally an <code>h6</code></h6>
  <p>
    The last heading level. If you find yourself using this, consider
    restructuring your content instead.
  </p>


  <h3>We still need to think about stacked headings though.</h3>
  <h4>
    Let's make sure we don't screw that up with <code>h4</code> elements,
    either.
  </h4>
  <p>
    Phew, with any luck we have styled the headings above this text and they
    look pretty good.
  </p>
  <p>
    Vegan poutine letterpress tacos coloring book flannel hexagon tousled
    heirloom cloud bread. Shoreditch tbh mlkshk wolf.
  </p>
</article>
```

## API

| Type          | Modifiers                                                                                                                                                  | Default | Description                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------- |
| Headings      | `.ui-h1`, `.ui-h2`, `.ui-h3`, `.ui-h4`, `.ui-h5`, `.ui-h6`                                                                                                 | -       | Heading styles for any element.                      |
| Paragraph     | `.ui-p`                                                                                                                                                    | -       | Body paragraph styling.                              |
| Sizes         | `.ui-small`, `.ui-large`                                                                                                                                   | -       | Size modifiers on `.ui-p`.                           |
| Overline      | `.ui-overline`                                                                                                                                             | -       | Small uppercase label text.                          |
| Caption       | `.ui-caption`                                                                                                                                              | -       | Muted supporting text.                               |
| Heading group | `.ui-hgroup`                                                                                                                                               | -       | Groups an overline, heading, and optional body copy. |
| Blockquote    | `.ui-blockquote`                                                                                                                                           | -       | Quoted block with a start border.                    |
| Code block    | `pre.ui-code-block`                                                                                                                                        | -       | Monospace preformatted block.                        |
| Inline        | `.ui-abbr`, `.ui-cite`, `.ui-del`, `.ui-dfn`, `.ui-ins`, `.ui-kbd`, `.ui-mark`, `.ui-s`, `.ui-samp`, `.ui-small`, `.ui-sub`, `.ui-sup`, `.ui-u`, `.ui-var` | -       | Inline text element utilities.                       |
| Rich text     | `.ui-rich-text`                                                                                                                                            | -       | Classless typography for uncontrolled child markup.  |

## Browser support

- Chromium: Full support Supported since v143.
- Firefox: Full support Supported since v146.
- Safari: Partial support Missing: box-decoration-break.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/typography.css`

