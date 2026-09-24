import {
  ArrowRight,
  HeartHandshake,
  Info,
  Landmark,
  Stethoscope,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { HeroVideo } from '../components/HeroVideo'
import type { Tint } from '../components/IconChip'
import { IconChip } from '../components/IconChip'
import { TrustBadge } from '../components/TrustBadge'

const DOCTOR_APP_URL = '/doctor/dashboard'

const PATHS: Array<{
  icon: LucideIcon
  tint: Tint
  eyebrow: string
  title: string
  text: string
  cta: string
  href: string
}> = [
  {
    icon: HeartHandshake,
    tint: 'brand',
    eyebrow: 'For patients and families',
    title: 'I am a patient',
    text: 'Learn about genetic testing for kidney disease in plain language, including family sharing, privacy, and next steps.',
    cta: 'Enter patient side',
    href: '/learn',
  },
  {
    icon: Stethoscope,
    tint: 'accent',
    eyebrow: 'For doctors and clinicians',
    title: 'I am a doctor',
    text: 'Access the clinician-facing side with nephrology education, workflow guidance, counseling resources, and practical tools.',
    cta: 'Enter doctor side',
    href: DOCTOR_APP_URL,
  },
]

export function Home() {
  return (
    <>
      {/* ============ 1. Hero ============ */}
      <section id="top" aria-labelledby="hero-heading" className="hero-wash relative overflow-hidden">
        <HeroVideo />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <TrustBadge icon={Landmark}>Supported by the National Kidney Foundation.</TrustBadge>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.3rem] leading-[1.12] font-semibold text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3.35rem]"
            >
              Could genetic testing help you, your family, or your patient understand kidney disease?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body sm:text-xl">
              GARNET helps people with kidney disease learn about genetic testing and prepare to
              talk with their care team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/learn">Start learning</Button>
              <Button href="/check" variant="secondary">
                Check if testing may help
              </Button>
            </div>
            <p className="mt-6 flex max-w-xl items-start gap-2.5 text-[0.99rem] leading-normal text-muted">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
              GARNET is for education only. It does not provide a diagnosis or medical advice.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-8 size-56 rounded-full bg-brand/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -left-10 size-56 rounded-full bg-accent/25 blur-3xl"
            />
            <div className="grid gap-4">
              {PATHS.map((path) => (
                <Card
                  key={path.title}
                  className="relative flex scale-100 flex-col p-5 transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] hover:shadow-lift sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <IconChip icon={path.icon} tint={path.tint} className="size-[3.25rem] shrink-0" />
                    <div>
                      <p className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-brand">
                        {path.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-[1.55rem] leading-snug font-semibold text-ink sm:text-[1.85rem]">
                        {path.title}
                      </h2>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-body">{path.text}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Button href={path.href} variant="secondary" size="md" className="w-full">
                      {path.cta}
                      <ArrowRight aria-hidden="true" className="size-4.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. Call to action ============ */}
      <section id="check" aria-labelledby="check-heading" className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="on-dark cta-panel relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-lift sm:rounded-[2.75rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-12 size-64 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-14 size-64 rounded-full bg-white/10 blur-3xl"
            />
            <h2
              id="check-heading"
              className="relative mx-auto max-w-3xl font-display text-[1.9rem] leading-tight font-semibold text-white sm:text-4xl"
            >
              Ready to learn whether genetic testing may be worth discussing?
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Start with a few simple questions. Your answers are not a diagnosis, but they may
              help you prepare for a conversation with a doctor or genetic counselor.
            </p>
            <div className="relative mt-9">
              <Button href="/check" variant="inverse" className="w-full sm:w-auto">
                Start check
                <ArrowRight aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
