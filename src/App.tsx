import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import LoginPage from './pages/auth/LoginPage'
import AuthGuard from './features/auth/components/AuthGuard'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={
              <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <h1 className="text-2xl font-bold text-[#1E40AF]">Dashboard — bientôt disponible</h1>
              </div>
            } />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
