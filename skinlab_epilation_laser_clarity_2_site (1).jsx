/*
=========================
PROJET VERCEL / VITE
=========================

1) Crée un dossier :
skinlab-laser

2) Dans ce dossier crée :

package.json
vite.config.js
index.html
src/main.jsx
src/index.css
src/App.jsx

=========================
package.json
=========================

{
  "name": "skinlab-laser",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
  }
}

=========================
vite.config.js
=========================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

=========================
index.html
=========================

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SkinLab — Épilation laser Clarity II Montpellier</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

=========================
src/main.jsx
=========================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

=========================
src/index.css
=========================

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: #f7f3ed;
}

* {
  box-sizing: border-box;
}

=========================
src/App.jsx
=========================
*/

import React, { useMemo, useState } from "react";

function Icon({ name, className = "" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    sparkles: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></>,
    check: <path d="M20 6L9 17l-5-5" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    chevron: <path d="M6 9l6 6 6-6" />,
    zap: <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />,
    timer: <><path d="M10 2h4"/><path d="M12 14l3-3"/><circle cx="12" cy="14" r="8"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
    pin: <><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Button({ children, variant = "dark", className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition";
  const styles = variant === "light" ? "bg-white text-stone-950 hover:bg-stone-100" : variant === "outline" ? "border border-stone-300 bg-white/60 text-stone-950 hover:bg-white" : variant === "outlineDark" ? "border border-white/25 bg-transparent text-white hover:bg-white/10" : "bg-stone-950 text-white hover:bg-stone-800";
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

const zones = [
  { label: "Aisselles", detail: "Séance rapide, zone fréquente en première indication" },
  { label: "Maillot", detail: "Simple, échancré ou intégral selon le projet" },
  { label: "Jambes", detail: "Demi-jambes ou jambes complètes" },
  { label: "Visage", detail: "Lèvre, menton, favoris — indication à valider" },
  { label: "Dos / épaules", detail: "Traitement fréquent chez l’homme" },
  { label: "Torse / abdomen", detail: "Adaptation selon densité et phototype" },
];

const steps = [
  ["01", "Évaluation", "Analyse de la peau, du poil, du bronzage récent, des traitements en cours et des contre-indications."],
  ["02", "Plan de traitement", "Choix des paramètres, explication du nombre de séances et remise d’un devis clair."],
  ["03", "Séance laser", "La zone est rasée avant la séance. Le laser cible progressivement les follicules pileux."],
  ["04", "Suivi", "Les séances sont espacées pour traiter les poils au bon moment de leur cycle."],
];

const faq = [
  { q: "L’épilation laser est-elle vraiment définitive ?", a: "On parle plutôt de réduction durable de la pilosité. Le résultat dépend du phototype, de la couleur du poil, de la zone, des facteurs hormonaux et de la régularité des séances." },
  { q: "Combien de séances faut-il prévoir ?", a: "Plusieurs séances sont nécessaires, car tous les poils ne sont pas dans la même phase de croissance au même moment. Le protocole est personnalisé après évaluation." },
  { q: "Peut-on traiter les peaux mates ?", a: "Le Clarity II associe Alexandrite 755 nm et Nd:YAG 1064 nm. Le choix de la longueur d’onde et des paramètres est adapté au phototype et à la sécurité cutanée." },
  { q: "Faut-il éviter le soleil ?", a: "Oui. Le bronzage récent augmente le risque d’effets indésirables. Les consignes exactes sont précisées avant la séance selon la zone et le phototype." },
  { q: "Les poils blancs ou très clairs répondent-ils ?", a: "Les poils blancs, roux ou très peu pigmentés répondent mal au laser, car le ciblage dépend en grande partie de la mélanine du poil." },
];

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-7 text-stone-600 md:text-lg">{text}</p>}
    </div>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-stone-200 py-5">
      <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen(!open)}>
        <span className="text-base font-medium text-stone-950 md:text-lg">{item.q}</span>
        <Icon name="chevron" className={`h-5 w-5 shrink-0 text-stone-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 md:text-base">{item.a}</p>}
    </div>
  );
}

export default function SkinLabLaserClarityII() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#f7f3ed]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <div className="text-lg font-semibold tracking-tight">SkinLab</div>
            <div className="text-xs uppercase tracking-[0.22em] text-stone-500">Maison Opéra · Montpellier</div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-stone-700 md:flex">
            <a href="#clarity" className="hover:text-stone-950">Clarity II</a>
            <a href="#zones" className="hover:text-stone-950">Zones</a>
            <a href="#deroulement" className="hover:text-stone-950">Déroulement</a>
            <a href="#faq" className="hover:text-stone-950">FAQ</a>
          </nav>
          <Button className="rounded-full bg-stone-950 px-5 text-white hover:bg-stone-800">Prendre RDV</Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
          <div className="absolute -right-36 top-16 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute -left-36 bottom-0 h-80 w-80 rounded-full bg-stone-200/80 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-sm text-stone-700 shadow-sm">
                <Icon name="sparkles" className="h-4 w-4" /> Épilation laser médicale à Montpellier
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-stone-950 md:text-7xl">
                Épilation laser par Clarity II, précise, rapide et personnalisée.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-650 md:text-xl">
                Chez SkinLab, l’épilation laser est réalisée avec une plateforme double longueur d’onde Alexandrite 755 nm et Nd:YAG 1064 nm, pour adapter le traitement à votre peau, votre pilosité et votre objectif.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-full bg-stone-950 px-7 text-white hover:bg-stone-800">
                  Réserver une consultation <Icon name="arrow" className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-12 rounded-full border-stone-300 bg-white/60 px-7 hover:bg-white">
                  Voir les zones traitées
                </Button>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-stone-600 sm:grid-cols-3">
                <div className="flex items-center gap-2"><Icon name="check" className="h-4 w-4" /> Devis personnalisé</div>
                <div className="flex items-center gap-2"><Icon name="check" className="h-4 w-4" /> Peaux claires à mates</div>
                <div className="flex items-center gap-2"><Icon name="check" className="h-4 w-4" /> Centre médical</div>
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-2xl shadow-stone-300/40 backdrop-blur">
                <div className="relative min-h-[520px] overflow-hidden rounded-[1.6rem] bg-stone-950 p-8 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.16),transparent_35%)]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">Clarity II · Lutronic / Cynosure</div>
                      <h3 className="text-4xl font-semibold tracking-tight">755 nm + 1064 nm</h3>
                      <p className="mt-4 max-w-sm text-white/72">Deux longueurs d’onde pour personnaliser le ciblage du poil et sécuriser l’approche selon le phototype.</p>
                    </div>
                    <div className="mt-40 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                        <Icon name="timer" className="mb-3 h-5 w-5" />
                        <div className="font-medium">Séances rapides</div>
                        <p className="mt-1 text-sm text-white/65">Technologie de balayage IntelliTrak.</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                        <Icon name="shield" className="mb-3 h-5 w-5" />
                        <div className="font-medium">Confort cutané</div>
                        <p className="mt-1 text-sm text-white/65">Refroidissement intégré pendant le traitement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clarity" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="La technologie"
              title="Pourquoi Clarity II chez SkinLab ?"
              text="Un laser performant ne remplace jamais l’indication médicale : il permet surtout d’adapter le traitement avec précision à chaque peau et à chaque pilosité."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ["zap", "Double longueur d’onde", "Alexandrite 755 nm et Nd:YAG 1064 nm pour adapter le protocole selon phototype, zone et densité pilaire."],
                ["timer", "Traitements fluides", "IntelliTrak aide à délivrer l’énergie de façon régulière sur les zones étendues."],
                ["shield", "Confort & sécurité", "Le refroidissement intégré améliore le confort pendant le passage du laser."],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-[1.7rem] border border-stone-200 bg-white/70 p-8 shadow-sm">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white"><Icon name={icon} className="h-5 w-5" /></div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-stone-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="zones" className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Zones traitées" title="Une prise en charge femme & homme" text="Le plan dépend de la couleur du poil, du phototype, de l’exposition solaire et de la zone anatomique." />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {zones.map((z) => (
                <div key={z.label} className="rounded-[1.5rem] border border-stone-200 bg-[#f7f3ed] p-6">
                  <h3 className="text-lg font-semibold">{z.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{z.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="deroulement" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Déroulement" title="Un protocole simple, mais jamais standardisé" />
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {steps.map(([n, title, text]) => (
                <div key={n} className="rounded-[1.5rem] border border-stone-200 bg-white/70 p-6">
                  <div className="mb-6 text-sm font-semibold text-stone-400">{n}</div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-950 px-5 py-20 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Avant la séance</div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Les bonnes conditions pour traiter efficacement.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Éviter le bronzage récent et signaler toute exposition solaire.",
                "Raser la zone selon les consignes données avant la séance.",
                "Ne pas épiler à la cire ou à la pince avant le protocole.",
                "Signaler grossesse, traitements photosensibilisants ou antécédents cutanés.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/8 p-5 text-white/80">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionTitle eyebrow="Questions fréquentes" title="Avant de prendre rendez-vous" />
            <div className="mt-10">
              {faq.map((item, index) => <FAQItem key={item.q} item={item} index={index} />)}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 text-white shadow-2xl shadow-stone-300/50">
            <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Prendre rendez-vous chez SkinLab</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Une première évaluation permet de confirmer l’indication, d’écarter les contre-indications et de définir un protocole adapté.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="light"><Icon name="calendar" className="h-4 w-4" /> RDV en ligne</Button>
                  <Button variant="outlineDark"><Icon name="phone" className="h-4 w-4" /> Appeler SkinLab</Button>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-6">
                <div className="flex gap-3"><Icon name="pin" className="mt-1 h-5 w-5" /><div><div className="font-medium">SkinLab · Maison Opéra</div><p className="mt-1 text-sm leading-6 text-white/65">Centre de médecine esthétique à Montpellier, à proximité de l’Opéra Comédie.</p></div></div>
                <div className="mt-6 border-t border-white/10 pt-6 text-sm leading-7 text-white/65">Remplacer ici par l’adresse exacte, le téléphone, le lien Doctolib et les mentions légales du centre.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 px-5 py-8 text-sm text-stone-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 md:flex-row">
          <div>© {year} SkinLab · Épilation laser Clarity II</div>
          <div className="flex gap-5"><a>Mentions légales</a><a>Confidentialité</a><a>Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
