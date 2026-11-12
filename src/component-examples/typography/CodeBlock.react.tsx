const code = `.ui-card {
  background: var(--ui-surface-elevated);
  border-radius: var(--ui-radius);
  padding: var(--ui-space-4);
}`

export default function CodeBlock() {
  return (
    <pre
      aria-label="Card styles"
      className="ui-code-block"
      role="region"
      tabIndex={0}
    >
      <code>{code}</code>
    </pre>
  )
}
