/** @jsxImportSource @solidjs/web */
const code = `.ui-card {
  background: var(--ui-surface-elevated);
  border-radius: var(--ui-radius);
  padding: var(--ui-space-4);
}`

export default function CodeBlock() {
  return (
    <pre class="ui-code-block">
      <code>{code}</code>
    </pre>
  )
}
