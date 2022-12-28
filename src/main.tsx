import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Example1 } from './sandbox/Example1'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Example1 />
  </React.StrictMode>
)
