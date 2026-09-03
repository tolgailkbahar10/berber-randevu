import { Scissors, Home, LayoutDashboard, CalendarClock } from 'lucide-react'

export type Page = 'home' | 'admin' | 'musteri'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { key: Page; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Ana Sayfa', icon: Home },
  { key: 'admin', label: 'Berber Paneli', icon: LayoutDashboard },
  { key: 'musteri', label: 'Müşteri Ekranı', icon: CalendarClock },
]

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-lg font-bold text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <Scissors size={18} />
          </span>
          Randevum<span className="text-indigo-600">.</span>
        </button>

        <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all sm:px-4 ${
                currentPage === key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
