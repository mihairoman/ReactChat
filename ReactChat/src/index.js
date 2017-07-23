import ReactDOM from 'react-dom'
import './index.css'
import { initMainRoutes } from './routes'

const routes = initMainRoutes()

ReactDOM.render(
  routes,
  document.getElementById('root')
)
