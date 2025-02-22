import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout 