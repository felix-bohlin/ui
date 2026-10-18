import { Button, Card, CardContent } from "opui-css/react"

export default function Composition() {
  return (
    <div className="ui-container" style={{ "--_max-inline-size": "40rem" }}>
      <div className="ui-flow ui-large">
        <div className="ui-flow ui-x-small">
          <h3 className="ui-h4">Team</h3>
          <p>Invite people to work on this project.</p>
        </div>
        <div className="ui-grid" style={{ "--_min-inline-size": "10rem" }}>
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
        <div
          className="ui-cluster"
          style={{ "--_justify-content": "flex-end" }}
        >
          <Button>Cancel</Button>
          <Button color="primary" variant="filled">
            Invite
          </Button>
        </div>
      </div>
    </div>
  )
}
