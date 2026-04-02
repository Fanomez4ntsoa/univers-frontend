import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import LoginPage from './pages/auth/LoginPage'
import AuthGuard from './features/auth/components/AuthGuard'
import CRMLayout from './features/crm/layout/components/CRMLayout'
import ProspectsPage from './pages/crm/ProspectsPage'
import ClientsPage from './pages/crm/ClientsPage'
import QuotesPage from './pages/crm/QuotesPage'
import InvoicesPage from './pages/crm/InvoicesPage'
import ChantiersPage from './pages/crm/ChantiersPage'
import SettingsPage from './pages/crm/SettingsPage'
import PortalPage from './pages/portal/PortalPage'
import PortalQuotePage from './pages/portal/PortalQuotePage'
import PortalInvoicePage from './pages/portal/PortalInvoicePage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected — CRM */}
          <Route element={<AuthGuard />}>
            <Route element={<CRMLayout />}>
              <Route index element={<Navigate to="/prospects" replace />} />
              <Route path="/prospects" element={<ProspectsPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/chantiers" element={<ChantiersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Public — Client Portal */}
          <Route path="/portal/:token" element={<PortalPage />} />
          <Route path="/portal/:token/quotes/:id" element={<PortalQuotePage />} />
          <Route path="/portal/:token/invoices/:id" element={<PortalInvoicePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
