import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MemoryRouter } from 'react-router-dom'
import Providers from './Providers.tsx'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MemoryRouter>
    <Providers>

      <App />
    </Providers>
  </MemoryRouter>
  // </StrictMode>,
)
  