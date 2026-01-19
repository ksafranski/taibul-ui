import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, FontProvider, ToastProvider } from 'taibul-ui'
import 'taibul-ui/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FontProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </FontProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
