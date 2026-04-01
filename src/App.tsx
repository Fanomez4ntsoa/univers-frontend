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

const queryClient = new QueryClient()

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64">
    <h1 className="text-xl font-semibold text-slate-400">{title} — bientôt disponible</h1>
  </div>
)

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
              <Route path="/chantiers" element={<Placeholder title="Chantiers" />} />
              <Route path="/settings" element={<Placeholder title="Paramètres" />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
