import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Clock3,
  Scissors,
  Save,
  X,
  CheckCircle2,
  Hourglass,
  XCircle,
  Phone,
} from 'lucide-react'
import {
  type Appointment,
  type AppointmentStatus,
  getAppointments,
  seedAppointmentsIfEmpty,
  subscribeToAppointments,
  updateAppointmentStatus,
} from '../lib/appointments'

interface Service {
  id: number
  name: string
  price: number
  duration: number
}

interface WorkingHour {
  day: string
  open: string
  close: string
  closed: boolean
}

const initialServices: Service[] = [
  { id: 1, name: 'Saç Kesimi', price: 250, duration: 30 },
  { id: 2, name: 'Sakal Tıraşı', price: 150, duration: 20 },
  { id: 3, name: 'Saç + Sakal', price: 350, duration: 45 },
]

const initialHours: WorkingHour[] = [
  { day: 'Pazartesi', open: '09:00', close: '19:00', closed: false },
  { day: 'Salı', open: '09:00', close: '19:00', closed: false },
  { day: 'Çarşamba', open: '09:00', close: '19:00', closed: false },
  { day: 'Perşembe', open: '09:00', close: '19:00', closed: false },
  { day: 'Cuma', open: '09:00', close: '19:00', closed: false },
  { day: 'Cumartesi', open: '10:00', close: '18:00', closed: false },
  { day: 'Pazar', open: '-', close: '-', closed: true },
]

const initialAppointments: Appointment[] = [
  {
    id: 'seed-1',
    customer: 'Ahmet Yılmaz',
    phone: '05551112233',
    service: 'Saç Kesimi',
    price: 250,
    date: '2026-09-04',
    time: '10:30',
    status: 'Onaylandı',
    createdAt: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    customer: 'Mehmet Demir',
    phone: '05554445566',
    service: 'Saç + Sakal',
    price: 350,
    date: '2026-09-04',
    time: '14:00',
    status: 'Bekliyor',
    createdAt: '2026-09-01T11:00:00.000Z',
  },
  {
    id: 'seed-3',
    customer: 'Can Öztürk',
    phone: '05557778899',
    service: 'Sakal Tıraşı',
    price: 150,
    date: '2026-09-05',
    time: '11:15',
    status: 'İptal',
    createdAt: '2026-09-01T12:00:00.000Z',
  },
]

const statusStyles: Record<AppointmentStatus, string> = {
  Onaylandı: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Bekliyor: 'bg-amber-50 text-amber-700 border-amber-200',
  İptal: 'bg-rose-50 text-rose-700 border-rose-200',
}

const statusIcons: Record<AppointmentStatus, typeof CheckCircle2> = {
  Onaylandı: CheckCircle2,
  Bekliyor: Hourglass,
  İptal: XCircle,
}

export default function BerberAdmin() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [hours, setHours] = useState<WorkingHour[]>(initialHours)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    seedAppointmentsIfEmpty(initialAppointments)
    setAppointments(getAppointments())

    return subscribeToAppointments(() => setAppointments(getAppointments()))
  }, [])

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    updateAppointmentStatus(id, status)
    setAppointments(getAppointments())
  }

  const [editingId, setEditingId] = useState<number | null>(null)
  const [draft, setDraft] = useState<{ name: string; price: string; duration: string }>({
    name: '',
    price: '',
    duration: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const resetDraft = () => setDraft({ name: '', price: '', duration: '' })

  const startAdd = () => {
    resetDraft()
    setEditingId(null)
    setShowAddForm(true)
  }

  const startEdit = (service: Service) => {
    setDraft({ name: service.name, price: String(service.price), duration: String(service.duration) })
    setEditingId(service.id)
    setShowAddForm(true)
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditingId(null)
    resetDraft()
  }

  const saveService = () => {
    if (!draft.name.trim() || !draft.price || !draft.duration) return

    if (editingId !== null) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { ...s, name: draft.name, price: Number(draft.price), duration: Number(draft.duration) }
            : s
        )
      )
    } else {
      const newService: Service = {
        id: Date.now(),
        name: draft.name,
        price: Number(draft.price),
        duration: Number(draft.duration),
      }
      setServices((prev) => [...prev, newService])
    }
    cancelForm()
  }

  const deleteService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const updateHour = (index: number, field: keyof WorkingHour, value: string | boolean) => {
    setHours((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Berber Paneli</h1>
        <p className="mt-1 text-slate-500">Hizmetlerinizi, çalışma saatlerinizi ve randevularınızı yönetin.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Services */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Scissors size={18} className="text-indigo-600" />
              Hizmetler
            </h2>
            <button
              type="button"
              onClick={startAdd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Plus size={16} />
              Hizmet Ekle
            </button>
          </div>

          {showAddForm && (
            <div className="mb-4 grid grid-cols-1 gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 sm:grid-cols-4">
              <input
                type="text"
                placeholder="Hizmet adı"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none sm:col-span-2"
              />
              <input
                type="number"
                placeholder="Fiyat (₺)"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Süre (dk)"
                value={draft.duration}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <div className="flex gap-2 sm:col-span-4">
                <button
                  type="button"
                  onClick={saveService}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Save size={14} />
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <X size={14} />
                  Vazgeç
                </button>
              </div>
            </div>
          )}

          <div className="divide-y divide-slate-100">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-slate-900">{service.name}</p>
                  <p className="text-sm text-slate-500">
                    {service.price} TL · {service.duration} dk
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(service)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(service.id)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Henüz hizmet eklenmedi.</p>}
          </div>
        </div>

        {/* Working hours */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Clock3 size={18} className="text-indigo-600" />
            Çalışma Saatleri
          </h2>
          <div className="space-y-2">
            {hours.map((h, i) => (
              <div key={h.day} className="flex items-center justify-between gap-2 text-sm">
                <span className="w-20 shrink-0 font-medium text-slate-700">{h.day}</span>
                {h.closed ? (
                  <span className="text-slate-400">Kapalı</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <input
                      type="time"
                      value={h.open}
                      onChange={(e) => updateHour(i, 'open', e.target.value)}
                      className="rounded-md border border-slate-300 px-1.5 py-1 text-xs"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="time"
                      value={h.close}
                      onChange={(e) => updateHour(i, 'close', e.target.value)}
                      className="rounded-md border border-slate-300 px-1.5 py-1 text-xs"
                    />
                  </div>
                )}
                <label className="flex items-center gap-1 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={h.closed}
                    onChange={(e) => updateHour(i, 'closed', e.target.checked)}
                  />
                  Kapalı
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments table */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Gelen Randevular</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-medium">Müşteri</th>
                <th className="pb-3 font-medium">Telefon</th>
                <th className="pb-3 font-medium">Hizmet</th>
                <th className="pb-3 font-medium">Tarih</th>
                <th className="pb-3 font-medium">Saat</th>
                <th className="pb-3 font-medium">Durum</th>
                <th className="pb-3 font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((a) => {
                const StatusIcon = statusIcons[a.status]
                return (
                  <tr key={a.id} className="text-slate-700">
                    <td className="py-3 font-medium text-slate-900">{a.customer}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Phone size={13} />
                        {a.phone}
                      </span>
                    </td>
                    <td className="py-3">
                      {a.service} <span className="text-slate-400">· {a.price} TL</span>
                    </td>
                    <td className="py-3">{a.date}</td>
                    <td className="py-3">{a.time}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[a.status]}`}
                      >
                        <StatusIcon size={13} />
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          disabled={a.status === 'Onaylandı'}
                          onClick={() => handleStatusChange(a.id, 'Onaylandı')}
                          className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Onayla
                        </button>
                        <button
                          type="button"
                          disabled={a.status === 'İptal'}
                          onClick={() => handleStatusChange(a.id, 'İptal')}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          İptal Et
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-sm text-slate-400">
                    Henüz randevu bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
