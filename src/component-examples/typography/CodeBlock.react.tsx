const code = `.ui-card {
  background: var(--ui-surface-raised);
  border-radius: var(--ui-radius);
  padding: var(--ui-space-5);
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
