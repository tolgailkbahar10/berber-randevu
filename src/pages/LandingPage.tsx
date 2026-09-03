import {
  CalendarCheck,
  MessageCircle,
  Clock3,
  BarChart3,
  Sparkles,
  Check,
  ArrowRight,
} from 'lucide-react'
import type { Page } from '../components/Navbar'

interface LandingPageProps {
  onNavigate: (page: Page) => void
}

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Entegrasyonu',
    desc: 'Müşterileriniz randevusunu tek tıkla WhatsApp üzerinden onaylar, telefon trafiğine son verin.',
  },
  {
    icon: CalendarCheck,
    title: 'Sıfır Sürtünme',
    desc: 'Uygulama indirme, üyelik oluşturma yok. Müşteri linke tıklar, hizmetini seçer, randevusunu alır.',
  },
  {
    icon: Clock3,
    title: 'Akıllı Takvim',
    desc: 'Çalışma saatlerinizi tanımlayın, dolu saatler otomatik olarak müşterilere kapansın.',
  },
  {
    icon: BarChart3,
    title: 'Randevu Paneli',
    desc: 'Tüm randevularınızı, hizmetlerinizi ve gelirinizi tek bir şık panelden takip edin.',
  },
]

const plans = [
  {
    name: 'Başlangıç',
    price: '0',
    period: 'ücretsiz',
    highlight: false,
    features: ['1 çalışan / koltuk', 'Ayda 30 randevu', 'WhatsApp yönlendirme', 'Temel randevu paneli'],
  },
  {
    name: 'Profesyonel',
    price: '299',
    period: '/ay',
    highlight: true,
    features: [
      'Sınırsız çalışan',
      'Sınırsız randevu',
      'Otomatik hatırlatma mesajları',
      'Gelişmiş istatistikler',
      'Öncelikli destek',
    ],
  },
  {
    name: 'Zincir Mağaza',
    price: '799',
    period: '/ay',
    highlight: false,
    features: ['Çoklu şube yönetimi', 'Ekip bazlı yetkilendirme', 'Özel raporlama', 'Hesap yöneticisi'],
  },
]

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <Sparkles size={14} />
            Berberler için Sıfır Sürtünmeli Randevu Asistanı
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Randevularınızı <span className="text-indigo-600">WhatsApp</span> üzerinden yönetin
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Müşterileriniz uygulama indirmeden, üye olmadan saniyeler içinde randevu alsın.
            Siz de dükkanınızı tek panelden yönetin.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('musteri')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Hemen Dene (Müşteri Ekranı)
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Berber Panelini Gör
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">Neden Randevum?</h2>
          <p className="mt-3 text-slate-600">
            Berber dükkanınızı büyütmek için ihtiyacınız olan her şey, tek bir yerde.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Fiyatlandırma</h2>
            <p className="mt-3 text-slate-600">İşletmenizin büyüklüğüne göre esnek planlar.</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.highlight
                    ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    En Popüler
                  </span>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}₺</span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-indigo-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className={`mt-8 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    plan.highlight
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Hemen Dene
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-6 py-16 text-white sm:px-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Dükkanınızı bugün dijitalleştirin</h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Kredi kartı gerekmez. 2 dakikada kurulum yapın, ilk randevunuzu bugün alın.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
          >
            Hemen Ücretsiz Başla
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}
