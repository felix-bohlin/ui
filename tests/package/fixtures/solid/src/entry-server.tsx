import { renderToString } from "@solidjs/web"
import App from "./App"

export const render = () => renderToString(() => <App />)
