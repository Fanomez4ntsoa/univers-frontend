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
Phase 4 — Ecosystem        ░░░░░░░░░░░░░░░░░░░░░   0% — pas commencé
Phase 5 — Matching         ░░░░░░░░░░░░░░░░░░░░░   0% — pas commencé
Phase 6 — Stripe           ░░░░░░░░░░░░░░░░░░░░░   0% — pas commencé
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

## 📋 PHASE 3 — Client Portal

> **Débloquer après** : Phase 2 complète ✅
> Backend disponible : `GET|POST /api/portal/{token}/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Vue publique devis + signature | `src/pages/public/PublicQuoteSignPage.jsx` | `feature/portal-quote` | ✅ Terminé + testé |
| Portail client (dashboard token) | `src/pages/public/ClientPortalPage.jsx` | `feature/portal-quote` | ✅ Terminé + testé |

### Ce qu'il faut implémenter :
- Page publique accessible via `portal_token` (pas de login requis)
- Afficher les devis du client + statuts
- Canvas signature pour signer un devis
- Afficher les factures du client

### Prochaine branche : `feature/portal-quote`

---

## 📋 PHASE 4 — Ecosystem Social

> **Débloquer après** : Phase 3 complète
> Backend disponible : `/api/ecosystem/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Feed / Posts | `src/pages/ecosystem/social/FeedPage.jsx` | `feature/ecosystem-feed` | 📋 À faire |
| Créer un post | `src/pages/ecosystem/social/CreatePostPage.jsx` | `feature/ecosystem-feed` | 📋 À faire |
| Profil artisan | `src/pages/ecosystem/social/ProfilePage.jsx` | `feature/ecosystem-profile` | 📋 À faire |
| Découvrir artisans + follow | `src/pages/ecosystem/social/DiscoverPage.jsx` | `feature/ecosystem-profile` | 📋 À faire |
| Boutique artisan | `src/pages/ecosystem/marketplace/ShopDetailPage.jsx` | `feature/ecosystem-shops` | 📋 À faire |
| Listings / Petites annonces | `src/pages/ecosystem/listings/MarketplacePage.jsx` | `feature/ecosystem-listings` | 📋 À faire |
| Jobs & Events | `src/pages/ecosystem/social/JobsPage.jsx` | `feature/ecosystem-jobs` | 📋 À faire |

---

## 📋 PHASE 5 — Matching

> **Débloquer après** : Phase 4 complète
> Backend disponible : `/api/matching/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Mes demandes (particulier) | `src/pages/features/CRMBatimentPage.jsx` | `feature/matching-requests` | 📋 À faire |
| Créer une demande | — | `feature/matching-requests` | 📋 À faire |
| Demandes disponibles (artisan) | — | `feature/matching-available` | 📋 À faire |
| Soumettre un devis artisan | — | `feature/matching-available` | 📋 À faire |

---

## 📋 PHASE 6 — Stripe / Abonnement

> **Débloquer après** : Phase 5 complète
> Backend disponible : `/api/subscription/*`

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Page abonnement Pro | `src/pages/client/BillingPage.jsx` | `feature/subscription` | 📋 À faire |
| Checkout Stripe | — | `feature/subscription` | 📋 À faire |
| Statut abonnement | — | `feature/subscription` | 📋 À faire |

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

*Dernière mise à jour : 2 Avril 2026 — Phase 3 Client Portal terminée*
*Rédigé par : Fanomezantsoa + Claude*
