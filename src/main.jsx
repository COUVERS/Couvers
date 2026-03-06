// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './styles/global.css'
// import { ThemeProvider } from '@mui/material/styles'
// import theme from './styles/theme.js'
// import { AuthProvider } from './context/Authcontext'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ThemeProvider theme={theme}>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </ThemeProvider>
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)