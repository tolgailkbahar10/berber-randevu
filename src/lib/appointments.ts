export type AppointmentStatus = 'Bekliyor' | 'Onaylandı' | 'İptal'

export interface Appointment {
  id: string
  customer: string
  phone: string
  service: string
  price: number
  date: string
  time: string
  status: AppointmentStatus
  createdAt: string
}

const STORAGE_KEY = 'berber-randevu:appointments'

function readRaw(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeRaw(appointments: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  // notify listeners within the same tab (native 'storage' event only fires cross-tab)
  window.dispatchEvent(new CustomEvent('appointments:updated'))
}

export function getAppointments(): Appointment[] {
  return readRaw().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function seedAppointmentsIfEmpty(seed: Appointment[]) {
  if (readRaw().length === 0) {
    writeRaw(seed)
  }
}

export function addAppointment(data: {
  customer: string
  phone: string
  service: string
  price: number
  date: string
  time: string
}): Appointment {
  const appointment: Appointment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: 'Bekliyor',
    createdAt: new Date().toISOString(),
    ...data,
  }
  const current = readRaw()
  writeRaw([...current, appointment])
  return appointment
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const current = readRaw()
  writeRaw(current.map((a) => (a.id === id ? { ...a, status } : a)))
}

export function subscribeToAppointments(callback: () => void): () => void {
  const handler = () => callback()
  window.addEventListener('storage', handler)
  window.addEventListener('appointments:updated', handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('appointments:updated', handler)
  }
}
