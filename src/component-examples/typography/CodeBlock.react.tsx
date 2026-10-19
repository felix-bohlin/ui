const code = `.ui-card {
  background: var(--ui-surface-elevated);
  border-radius: var(--radius-3);
  padding: var(--size-4);
}`

export default function CodeBlock() {
  return (
    <pre className="ui-code-block">
      <code>{code}</code>
    </pre>
  )
}
