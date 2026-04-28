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

## 📋 PHASE 7 — Front Public (Design fidèle à Emergent)

> Protocole : pour chaque page/composant →
> lire Emergent JSX + index.css → comparer → corriger → valider 3 breakpoints → commiter

### 7.1 Layout Public
| Composant | Branche | État |
|---|---|---|
| TopBanner | `fix/homepage-design` | ✅ Terminé |
| PublicHeader (desktop/tablet/mobile) | `fix/homepage-design` | ✅ Terminé |
| Nav secondaire responsive | `fix/homepage-design` | ✅ Terminé |
| Hamburger menu mobile | `fix/homepage-design` | ✅ Terminé |
| MobileBottomNav (tabbar) | `fix/homepage-design` | ✅ Terminé |
| PublicFooter (dark theme) | `fix/homepage-design` | ✅ Terminé |

### 7.2 HomePage — Sections
| Section | Branche | État |
|---|---|---|
| HeroSection (3 versions responsive) | `fix/homepage-design` | ✅ Terminé |
| UniversSection (grille 2x3 mobile) | `fix/homepage-design` | ✅ Terminé |
| BestArtisansSection | `fix/homepage-design` | ✅ Terminé |
| WhySellSection | `fix/homepage-design` | ✅ Terminé |
| FounderCTASection (mobile only) | `fix/homepage-design` | ✅ Terminé |
| VentesFlashSection | `fix/homepage-design` | ✅ Terminé |
| ProduitsSection | `fix/homepage-design` | ✅ Terminé |
| WhyBuySection | `fix/homepage-design` | ✅ Terminé |
| NewsletterSection | `fix/homepage-design` | ✅ Terminé |

### 7.3 Pages depuis Header
| Page | Route | Branche | État |
|---|---|---|---|
| Page Publier (modal multi-étapes) | `/publier` | | ⏭️ Complexe — reporté |
| Page Devenir Fondateur (marketing) | `/offre-fondateur` | | ⏭️ 618 lignes — reporté |
| Page Espace Pro Fondateur (Stripe) | `/espace-pro/fondateur` | | ⏭️ 986 lignes — reporté |
| Page Connexion | `/login` | `fix/login-page` | ✅ Terminé + testé |
| Page Inscription | `/register` | `fix/register-page` | ✅ Terminé + testé |

### 7.4 Pages depuis Navigation principale

> ⚠️ **Note architecture** : toutes les pages publiques (`/artisans`, `/produits`, `/annonces`...)
> doivent être sous `PublicLayout` — pas `EcosystemLayout`.
> `EcosystemLayout` est réservé au réseau social (`/feed`, `/discover`, `/shops`, `/listings`, `/jobs`)

| Page | Route | Branche | État |
|---|---|---|---|
| Page Artisans | `/artisans` | `fix/page-artisans` | ✅ Terminé + testé + données API réelles |
| Page Marketplace | `/produits` | `fix/page-marketplace` | ✅ Terminé + testé (v1 — évolution prévue) |
| Page Particuliers/Annonces | `/annonces` | `fix/page-annonces` | ✅ Terminé + testé |
| Page Réseau Social (Feed) | `/reseau` | `fix/page-reseau` | ✅ Terminé + testé |
| Page Emploi | `/emploi` | `fix/page-emploi` | ✅ Terminé + testé |
| Page Réseau Pros | `/reseau-pros` | | 📋 À faire |
| Page Espace Pro | `/espace-pro` | | 📋 À vérifier |

### 7.5 Pages depuis Univers (HomePage cards)
| Page | Route | Branche | État |
|---|---|---|---|
| Page Artisans (univers) | `/artisans` | | 📋 Même que 7.4 |
| Page Marketplace (univers) | `/produits` | | 📋 Même que 7.4 |
| Page Particuliers (univers) | `/annonces` | | 📋 Même que 7.4 |
| Page Réseau Social (univers) | `/reseau` | | 📋 Même que 7.4 |
| Page Emploi (univers) | `/emploi` | | 📋 Même que 7.4 |
| Page Réseau Pros (univers) | `/reseau-pros` | | 📋 Même que 7.4 |

### 7.6 Pages depuis CTA Hero
| Page | Route | Branche | État |
|---|---|---|---|
| Page décrire un projet | `/matching/requests` | | 📋 À vérifier |
| Page trouver un artisan | `/artisans` | | 📋 Même que 7.4 |
| Page Marketplace acheter | `/produits` | | 📋 Même que 7.4 |

### 7.7 Pages publiques marketing
| Page | Route | Branche | État |
|---|---|---|---|
| LandingPage BatiAssist | `/landing` | | 📋 À vérifier |
| PricingPage | `/tarifs` | | 📋 À vérifier |
| AboutPage | `/a-propos` | | 📋 À vérifier |
| ContactPage | `/contact` | | 📋 À vérifier |

---

## 🔄 PHASE SUIVANTE — Pages manquantes (rapport 2026-04-28)

### 🔴 Tier 1 — CRM core manquant (priorité absolue)
| Page | Référence Emergent | État | Priorité |
|---|---|---|---|
| CRMDashboard | pages/client/crm-batiment/CRMDashboard.jsx | 📋 À faire | 🔴 |
| CommercialPipeline (kanban) | pages/client/crm-batiment/CommercialPipeline.jsx | 📋 À faire | 🔴 |
| ProduitsPage (catalogue) | pages/client/crm-batiment/ProduitsPage.jsx | 📋 À faire | 🔴 |
| PrestationsPage | pages/client/crm-batiment/PrestationsPage.jsx | 📋 À faire | 🔴 |
| PlanningPage (calendrier chantiers) | pages/client/crm-batiment/PlanningPage.jsx | 📋 À faire | 🔴 |

⚠️ Restructurer la Sidebar en groupes (CRM / Boutique / Matching / Compte)
AVANT d'ajouter ces pages — sinon la nav déborde.

### 🔴 Tier 2 — Boutique Pro éclatée
| Page | Référence Emergent | État | Priorité |
|---|---|---|---|
| BoutiqueDashboard | pages/client/boutique/BoutiqueDashboard.jsx | 📋 À faire | 🔴 |
| BoutiqueDesignPage | pages/client/boutique/BoutiqueDesignPage.jsx | 📋 À faire | 🔴 |
| BoutiqueMediasPage | pages/client/boutique/BoutiqueMediasPage.jsx | 📋 À faire | 🔴 |
| BoutiqueAvisPage | pages/client/boutique/BoutiqueAvisPage.jsx | 📋 À faire | 🔴 |

### 🟠 Tier 3 — Intégration pages Romain (AbracadaBati)
| Page | Référence | État | Note |
|---|---|---|---|
| BoutiquePage espacepro | pages/espacepro/BoutiquePage.jsx | 📋 À faire | Pose bases sidebar restructurée |
| MembresFondateursPage | pages/espacepro/MembresFondateursPage.jsx | 📋 À faire | Page commerciale clé |
| FounderBadge + TrustBadge | components/badges/ | 📋 À faire | À afficher sur ProfilePage, ShopDetailPage |
| VerificationAppointmentPage | pages/ecosystem/social/VerificationAppointmentPage.jsx | 📋 À faire | Couplé à /subscription |

### 🟡 Tier 4 — CRM périphérique
| Page | Référence Emergent | État |
|---|---|---|
| RentabilitePage + Dashboard | crm-batiment/RentabilitePage.jsx | 📋 À faire |
| DocumentsPage (GED) | crm-batiment/DocumentsPage.jsx | 📋 À faire |
| TicketsSAVPage | crm-batiment/TicketsSAVPage.jsx | 📋 À faire |
| CompteRenduChantierPage | crm-batiment/CompteRenduChantierPage.jsx | 📋 À faire |
| BatiAssistHomePage | crm-batiment/BatiAssistHomePage.jsx | 📋 À faire |

### ⚪ Hors scope pour l'instant
- MonCercleConfiancePage (cockpit-particulier — pas dans la mission)
- Marketing Pro + AI Vendor (après CRM complet)
- Pages publiques marketing (FAQ, Blog, BatiAssist*)

---

## ▶️ Reprise
Prochain chantier : Restructurer la Sidebar en groupes
(CRM / Boutique / Matching / Compte) AVANT toute nouvelle page.
Référence : BoutiquePage.jsx + EspaceProSectionsNav.jsx dans AbracadaBati.
Ensuite : CRMDashboard → CommercialPipeline → ProduitsPage → PrestationsPage → PlanningPage

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

*Dernière mise à jour : 2026-04-28 — pages manquantes priorisées Tier 1→4 (rapport comparaison Emergent)*
*Rédigé par : Fanomezantsoa + Claude*
