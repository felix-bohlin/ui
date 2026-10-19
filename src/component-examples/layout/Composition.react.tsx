import { Button, Card, CardContent } from "opui-css/react"

export default function Composition() {
  return (
    <div className="ui-l-container" style={{ "--_max-inline-size": "40rem" }}>
      <div className="ui-l-column ui-large">
        <div className="ui-l-column ui-x-small">
          <h3 className="ui-h4">Team</h3>
          <p>Invite people to work on this project.</p>
        </div>
        <div className="ui-l-grid" style={{ "--_min-inline-size": "10rem" }}>
          <Card variant="tonal">
            <CardContent>Design</CardContent>
          </Card>
          <Card variant="tonal">
            <CardContent>Engineering</CardContent>
          </Card>
          <Card variant="tonal">
            <CardContent>Support</CardContent>
          </Card>
        </div>
        <div className="ui-l-row" style={{ "--_justify-content": "flex-end" }}>
          <Button>Cancel</Button>
          <Button color="primary" variant="filled">
            Invite
          </Button>
        </div>
      </div>
    </div>
  )
}
