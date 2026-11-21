import "./app.css"
import Shell from "./Shell"
import { Router } from "./router"

export default function App() {
  return <Router>{(props) => <Shell>{props.children}</Shell>}</Router>
}
