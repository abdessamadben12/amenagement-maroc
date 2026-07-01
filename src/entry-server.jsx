import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppServer from './AppServer'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppServer />
    </StaticRouter>,
  )
}
