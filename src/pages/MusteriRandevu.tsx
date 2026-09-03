import { useMemo, useState } from 'react'
import { Scissors, CalendarDays, Clock, MessageCircle, Check, Phone } from 'lucide-react'
import { addAppointment } from '../lib/appointments'

interface Service {
  id: number
  name: string
  price: number
  duration: number
}

const services: Service[] = [
  { id: 1, name: 'Saç Kesimi', price: 250, duration: 30 },
  { id: 2, name: 'Sakal Tıraşı', price: 150, duration: 20 },
  { id: 3, name: 'Saç + Sakal', price: 350, duration: 45 },
  { id: 4, name: 'Çocuk Saç Kesimi', price: 200, duration: 25 },
]

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00', '16:30']

const BERBER_WHATSAPP_NUMBER = '905551234567'

export default function MusteriRandevu() {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) ?? null,
    [selectedServiceId]
  )

  const isFormComplete = Boolean(selectedService && date && time && name.trim() && phone.trim())

  const buildWhatsappLink = (service: Service) => {
    const message =
      `Merhaba, ${name} olarak randevu almak istiyorum.\n` +
      `Telefon: ${phone}\n` +
      `Hizmet: ${service.name} (${service.price} TL)\n` +
      `Tarih: ${date}\n` +
      `Saat: ${time}`
    return `https://wa.me/${BERBER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handleWhatsappSubmit = () => {
    if (!isFormComplete || !selectedService) return

    addAppointment({
      customer: name.trim(),
      phone: phone.trim(),
      service: selectedService.name,
      price: selectedService.price,
      date,
      time,
    })
    setIsSubmitted(true)
    window.open(buildWhatsappLink(selectedService), '_blank', 'noopener,noreferrer')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Scissors size={22} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Randevu Al</h1>
        <p className="mt-1 text-sm text-slate-500">Hizmetini seç, saatini belirle, WhatsApp ile onaylat.</p>
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Adınız Soyadınız</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Ahmet Yılmaz"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Phone size={15} />
            Telefon Numaranız
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Örn: 05XX XXX XX XX"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Services */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Hizmet Seçin</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                      <Check size={12} />
                    </span>
                  )}
                  <span className="text-sm font-semibold text-slate-900">{service.name}</span>
                  <span className="mt-1 text-xs text-slate-500">
                    {service.price} TL · {service.duration} dk
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <CalendarDays size={15} />
            Tarih Seçin
          </label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Clock size={15} />
            Saat Seçin
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                  time === slot
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-200 text-slate-700 hover:border-indigo-300'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedService && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-900">{selectedService.name}</span> ·{' '}
              {selectedService.price} TL
            </p>
            {date && <p>Tarih: {date}</p>}
            {time && <p>Saat: {time}</p>}
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          disabled={!isFormComplete}
          onClick={handleWhatsappSubmit}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold text-white shadow-lg transition ${
            isFormComplete
              ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700'
              : 'cursor-not-allowed bg-slate-300 shadow-none'
          }`}
        >
          <MessageCircle size={20} />
          WhatsApp ile Randevu Al
        </button>

        {isSubmitted && (
          <p className="text-center text-sm font-medium text-emerald-600">
            Randevunuz kaydedildi! WhatsApp üzerinden berberinizle görüşmeye devam edin.
          </p>
        )}
      </div>
    </div>
  )
}
