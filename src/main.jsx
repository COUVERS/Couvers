import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CertificateTest from './CertificateTest.jsx'
import { Button } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <CertificateTest />
  </StrictMode>,
)
