import TopBanner from '../../features/public/components/home/TopBanner'
import RegisterForm from '../../features/public/components/register/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <TopBanner />
      <div
        className="flex items-center justify-center py-12 px-4"
        style={{ minHeight: 'calc(100vh - 40px)' }}
      >
        <RegisterForm />
      </div>
    </div>
  )
}
