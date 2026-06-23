import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./utils/fetchInterceptor"
import './index.css'
import App from './App.tsx'
import AuthenticationProvider from './context/AuthenticationProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
    <App />
    </AuthenticationProvider>
  </StrictMode>,
)
