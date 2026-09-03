import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import BerberAdmin from './pages/BerberAdmin'
import MusteriRandevu from './pages/MusteriRandevu'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={page} onNavigate={setPage} />
      {page === 'home' && <LandingPage onNavigate={setPage} />}
      {page === 'admin' && <BerberAdmin />}
      {page === 'musteri' && <MusteriRandevu />}
    </div>
  )
}

export default App
