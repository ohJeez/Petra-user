import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/shared/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Registration />} />
          <Route path="admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
