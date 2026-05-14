import React, { useMemo, useState } from "react";
import mapImage from "./assets/plan-clinique-opera.png";

const DOCTOLIB_URL =
  "https://www.doctolib.fr/centre-laser-et-esthetique/montpellier/skinlab";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=33422916022&text&type=phone_number&app_absent=0";

const INSTAGRAM_URL =
  "https://www.instagram.com/skinlab.cliniqueopera";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=2%20rue%20des%20%C3%A9tuves%2034000%20Montpellier";

function Icon({ name, className = "" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
  };

  const paths = {
    sparkles: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      </>
    ),
    check: <path d="M5 13l4 4L19 7" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    chevron: <path d="M6 9l6 6 6-6" />,
    zap: <path d="M13 2L3 14h7l-1 8 12-14h-7l1-6z" />,
    timer: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 13l3-2" />
        <path d="M9 2h6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2z" />,
    pin: (
      <>
        <path d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Button({ children, variant = "dark", className = "", href }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition";

  const styles =
    variant === "light"
      ? "bg-white text-stone-950 hover:bg-stone-100"
      : variant === "outline"
      ? "border border-stone-300 bg-white/60 text-stone-950 hover:bg-white"
      : variant === "outlineDark"
      ? "border border-white/25 bg-transparent text-white hover:bg-white/10"
      : "bg-stone-950 text-white hover:bg-stone-800";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

const zones = [
  {
    label: "Aisselles",
    detail: "Séance rapide, zone fréquente en première indication",
  },
  {
    label: "Maillot",
    detail: "Simple, échancré ou intégral selon le projet",
  },
  {
    label: "Jambes",
    detail: "Demi-jambes ou jambes complètes",
  },
  {
    label: "Visage",
    detail: "Lèvre, menton, favoris",
  },
  {
    label: "Dos / épaules",
    detail: "Traitement fréquent chez l’homme",
  },
];

const faq = [
  {
    q: "L’épilation laser est-elle définitive ?",
    a: "On parle plutôt de réduction durable de la pilosité.",
  },
  {
    q: "Combien de séances faut-il prévoir ?",
    a: "Plusieurs séances sont nécessaires selon la zone et la pilosité.",
  },
  {
    q: "Le Clarity II convient-il aux peaux mates ?",
    a: "Oui, le traitement est adapté selon le phototype.",
  },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-[#f5f1ec] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-[#f5f1ec]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-lg font-semibold tracking-tight">
              SkinLab
            </div>

            <div className="text-xs uppercase tracking-[0.22em] text-stone-500">
              by Clinique Opéra · Montpellier
            </div>
          </div>

          <Button
            href={DOCTOLIB_URL}
            className="rounded-full bg-stone-950 px-5 text-white"
          >
            Prendre RDV
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm">
            <Icon name="sparkles" className="h-4 w-4" />
            Épilation laser à Montpellier
          </div>

          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-stone-950 md:text-7xl">
            Épilation laser Clarity II
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600">
            Chez SkinLab by Clinique Opéra, l’épilation laser est réalisée
            avec Clarity II, une technologie permettant un traitement
            précis, rapide et personnalisé.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={DOCTOLIB_URL}
              className="h-12 rounded-full bg-stone-950 px-7 text-white"
            >
              Prendre rendez-vous
              <Icon name="arrow" className="h-4 w-4" />
            </Button>

            <Button
              href={WHATSAPP_URL}
              variant="outline"
              className="h-12 rounded-full"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-stone-900 p-10 text-white shadow-2xl">
          <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
            Clarity II
          </div>

          <div className="grid gap-5">
            {zones.map((z) => (
              <div
                key={z.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <Icon name="check" className="h-5 w-5" />
                  <div className="font-medium">{z.label}</div>
                </div>

                <div className="mt-2 text-sm text-white/70">
                  {z.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-[2.5rem] border border-stone-200 bg-white/70 p-8 shadow-sm">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              FAQ
            </div>

            <h2 className="mt-2 text-3xl font-semibold">
              Questions fréquentes
            </h2>
          </div>

          <div className="grid gap-4">
            {faq.map((item, i) => (
              <div
                key={item.q}
                className="rounded-2xl border border-stone-200 bg-white"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === i ? null : i)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium">{item.q}</span>

                  <Icon
                    name="chevron"
                    className={`h-5 w-5 transition ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-7 text-stone-600">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] bg-stone-950 p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                Contact
              </div>

              <h2 className="mt-3 text-4xl font-semibold">
                SkinLab by Clinique Opéra
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/70">
                2 rue des Étuves, 34000 Montpellier.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={DOCTOLIB_URL} variant="light">
                  <Icon name="calendar" className="h-4 w-4" />
                  Doctolib
                </Button>

                <Button href={WHATSAPP_URL} variant="outlineDark">
                  <Icon name="phone" className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2">
                <img
                  src={mapImage}
                  alt="Plan d’accès SkinLab by Clinique Opéra Montpellier"
                  className="w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="mt-6 grid gap-3 text-sm leading-7 text-white/65">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Voir l’itinéraire Google Maps
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Instagram @skinlab.cliniqueopera
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        © {year} SkinLab by Clinique Opéra · Épilation laser Clarity II
      </footer>
    </div>
  );
}