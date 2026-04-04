import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import LoginPage from './pages/auth/LoginPage'
import ArtisansPage from './pages/ecosystem/ArtisansPage'
import AuthGuard from './features/auth/components/AuthGuard'
import CRMLayout from './features/crm/layout/components/CRMLayout'
import EcosystemLayout from './features/ecosystem/layout/components/EcosystemLayout'
import ProspectsPage from './pages/crm/ProspectsPage'
import ClientsPage from './pages/crm/ClientsPage'
import QuotesPage from './pages/crm/QuotesPage'
import InvoicesPage from './pages/crm/InvoicesPage'
import ChantiersPage from './pages/crm/ChantiersPage'
import SettingsPage from './pages/crm/SettingsPage'
import FeedPage from './pages/ecosystem/FeedPage'
import DiscoverPage from './pages/ecosystem/DiscoverPage'
import ProfilePage from './pages/ecosystem/ProfilePage'
import ShopsPage from './pages/ecosystem/ShopsPage'
import ShopDetailPage from './pages/ecosystem/ShopDetailPage'
import MyShopPage from './pages/ecosystem/MyShopPage'
import ListingsPage from './pages/ecosystem/ListingsPage'
import ListingDetailPage from './pages/ecosystem/ListingDetailPage'
import MyListingsPage from './pages/ecosystem/MyListingsPage'
import JobsPage from './pages/ecosystem/JobsPage'
import JobDetailPage from './pages/ecosystem/JobDetailPage'
import EventDetailPage from './pages/ecosystem/EventDetailPage'
import MyRequestsPage from './pages/matching/MyRequestsPage'
import RequestDetailPage from './pages/matching/RequestDetailPage'
import AvailablePage from './pages/matching/AvailablePage'
import MyQuotesPage from './pages/matching/MyQuotesPage'
import SubscriptionPage from './pages/subscription/SubscriptionPage'
import PublicLayout from './features/public/components/layout/PublicLayout'
import HomePage from './pages/public/HomePage'
import LandingPage from './pages/public/LandingPage'
import PublicPricingPage from './pages/public/PricingPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import RegisterPage from './pages/public/RegisterPage'
import PortalPage from './pages/portal/PortalPage'
import PortalQuotePage from './pages/portal/PortalQuotePage'
import PortalInvoicePage from './pages/portal/PortalInvoicePage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public — Marketing */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/tarifs" element={<PublicPricingPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/artisans" element={<ArtisansPage />} />
          </Route>

          {/* Public — Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected — CRM */}
          <Route element={<AuthGuard />}>
            <Route element={<CRMLayout />}>
              <Route path="/prospects" element={<ProspectsPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/chantiers" element={<ChantiersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/my-shop" element={<MyShopPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
              <Route path="/matching/requests" element={<MyRequestsPage />} />
              <Route path="/matching/requests/:id" element={<RequestDetailPage />} />
              <Route path="/matching/available" element={<AvailablePage />} />
              <Route path="/matching/my-quotes" element={<MyQuotesPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
            </Route>
          </Route>

          {/* Public — Ecosystem */}
          <Route element={<EcosystemLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/shops/:slug" element={<ShopDetailPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingDetailPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
          </Route>

          {/* Public — Client Portal */}
          <Route path="/portal/:token" element={<PortalPage />} />
          <Route path="/portal/:token/quotes/:id" element={<PortalQuotePage />} />
          <Route path="/portal/:token/invoices/:id" element={<PortalInvoicePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
