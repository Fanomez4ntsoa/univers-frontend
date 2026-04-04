# ROADMAP_FRONTEND.md — AbracadaBati Frontend

> **Lire ce fichier avant chaque nouvelle page ou composant.**
> Il trace l'état exact du développement frontend et indique quoi faire ensuite.
> Référence UI/UX : `~/project/AbracadaBati/frontend/src/`

---

## 📍 Position actuelle
```
Phase 1 — Setup & Auth     █████████████████████ 100% — terminé ✅
Phase 2 — CRM Dashboard    █████████████████████ 100% — terminé ✅
Phase 3 — Client Portal    █████████████████████ 100% — terminé ✅
Phase 4 — Ecosystem        █████████████████████ 100% — terminé ✅
Phase 5 — Matching         █████████████████████ 100% — terminé ✅
Phase 6 — Stripe           █████████████████████ 100% — terminé ✅
Phase 7 — Front Public     █████████████████████ 100% — terminé ✅
```

---

## ✅ PHASE 1 — Setup & Auth

| Tâche | Branche | État |
|---|---|---|
| Init Vite + React 18 + TypeScript | `main` | ✅ Terminé |
| TailwindCSS + Shadcn/UI | `main` | ✅ Terminé |
| TanStack Query + Axios | `main` | ✅ Terminé |
| Config `src/lib/axios.ts` | `main` | ✅ Terminé |
| Types TypeScript (`auth.ts` + `crm.ts`) | `main` | ✅ Terminé |
| Login Page + Auth Guard | `feature/auth-login` | ✅ Terminé + testé |

---

## ✅ PHASE 2 — CRM Dashboard

| Page | Branche | État |
|---|---|---|
| CRMLayout + Sidebar + TopBar | `feature/crm-layout` | ✅ Terminé + testé |
| ProspectsPage | `feature/crm-prospects` | ✅ Terminé + testé |
| ClientsPage | `feature/crm-clients` | ✅ Terminé + testé |
| QuotesPage | `feature/crm-quotes` | ✅ Terminé + testé |
| InvoicesPage | `feature/crm-invoices` | ✅ Terminé + testé |
| ChantiersPage | `feature/crm-chantiers` | ✅ Terminé + testé |
| SettingsPage | `feature/crm-settings` | ✅ Terminé + testé |

---

## ✅ PHASE 3 — Client Portal

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Vue publique devis + signature | `src/pages/public/PublicQuoteSignPage.jsx` | `feature/portal-quote` | ✅ Terminé + testé |
| Portail client (dashboard token) | `src/pages/public/ClientPortalPage.jsx` | `feature/portal-quote` | ✅ Terminé + testé |

---

## ✅ PHASE 4 — Ecosystem Social

> ⚠️ L'Ecosystem est **public** — routes sans AuthGuard, fidèle à Emergent.
> Layout séparé du CRM : `EcosystemLayout` avec sa propre navigation.

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| **EcosystemLayout** (header + nav publique) | `src/components/ecosystem/EcosystemLayout.jsx` | `feature/ecosystem-feed` | ✅ Terminé + testé |
| Feed / Posts | `src/pages/ecosystem/social/FeedPage.jsx` | `feature/ecosystem-feed` | ✅ Terminé + testé |
| Profil artisan | `src/pages/ecosystem/social/ProfilePage.jsx` | `feature/ecosystem-profile` | ✅ Terminé + testé |
| Découvrir artisans + follow | `src/pages/ecosystem/social/DiscoverPage.jsx` | `feature/ecosystem-profile` | ✅ Terminé + testé |
| Boutique artisan | `src/pages/ecosystem/marketplace/ShopDetailPage.jsx` | `feature/ecosystem-shops` | ✅ Terminé + testé |
| Listings / Petites annonces | `src/pages/ecosystem/listings/MarketplacePage.jsx` | `feature/ecosystem-listings` | ✅ Terminé + testé |
| Jobs & Events | `src/pages/ecosystem/social/JobsPage.jsx` | `feature/ecosystem-jobs` | ✅ Terminé + testé |

---

## ✅ PHASE 5 — Matching

> **Débloquer après** : Phase 4 complète
> Backend disponible : `/api/matching/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Mes demandes (particulier) | `src/pages/features/CRMBatimentPage.jsx` | `feature/matching-requests` | ✅ Terminé + testé |
| Créer une demande | — | `feature/matching-requests` | ✅ Terminé + testé |
| Demandes disponibles (artisan) | — | `feature/matching-requests` | ✅ Terminé + testé |
| Soumettre un devis artisan | — | `feature/matching-requests` | ✅ Terminé + testé |

---

## 📋 PHASE 6 — Stripe / Abonnement

> **Débloquer après** : Phase 5 complète
> Backend disponible : `/api/subscription/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Page abonnement Pro | `src/pages/client/BillingPage.jsx` | `feature/subscription` | ✅ Terminé + testé |
| Checkout Stripe | — | `feature/subscription` | ✅ Terminé + testé |
| Statut abonnement | — | `feature/subscription` | ✅ Terminé + testé |

---

## 📋 PHASE 7 — Front Public (Landing + Pages marketing)

> **Débloquer après** : Phase 6 complète
> Pages publiques visibles sans compte — vitrine du produit

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| HomePage (centre commercial 6 univers) | `src/pages/HomePage.jsx` | `feature/public-landing` + `fix/homepage-design` | ✅ Terminé + testé + design fidèle Emergent (12 corrections) |
| Landing page (BatiAssist 7 sections) | `src/pages/landing/LandingPage.jsx` | `feature/public-landing` | ✅ Terminé + testé |
| Page tarifs | `src/pages/PricingPage.jsx` | `feature/public-landing` | ✅ Terminé + testé |
| Page À propos | `src/pages/AboutPage.jsx` | `feature/public-landing` | ✅ Terminé + testé |
| Page contact | `src/pages/ContactPage.jsx` | `feature/public-landing` | ✅ Terminé + testé |
| Page inscription | `src/pages/ecosystem/social/RegisterPage.jsx` | `feature/public-landing` | ✅ Terminé + testé |

---

## 🎯 Règle de progression
```
1. Terminer la page/feature sur sa branche feature/
2. Tester visuellement sur mobile + tablet + desktop
3. Vérifier que les données viennent bien de l'API réelle
4. Soumettre à Fanomezantsoa pour validation visuelle
5. Merger vers main après accord
6. Mettre à jour ce fichier (état → ✅ Terminé + testé)
7. Passer à la page suivante
```

> ⚠️ Ne jamais commencer une Phase sans que la précédente soit complète.

---

## 📂 Référence Emergent
- Chemin local : `~/project/AbracadaBati/frontend/src/`
- Pages CRM : `src/pages/client/crm-batiment/`
- Pages publiques : `src/pages/public/`
- Ecosystem : `src/pages/ecosystem/`

---

*Dernière mise à jour : 4 Avril 2026 — HomePage design fidèle à Emergent (12 corrections)*
*Rédigé par : Fanomezantsoa + Claude*
