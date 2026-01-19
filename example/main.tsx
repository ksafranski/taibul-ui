import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FontProvider } from '@/components/FontProvider'
import { ToastProvider } from '@/components/Toast'
import '@/index.css'

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
