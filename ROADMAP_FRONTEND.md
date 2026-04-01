# ROADMAP_FRONTEND.md — AbracadaBati Frontend

> **Lire ce fichier avant chaque nouvelle page ou composant.**
> Il trace l'état exact du développement frontend et indique quoi faire ensuite.
> Référence UI/UX : `~/project/AbracadaBati/frontend/src/pages/client/crm-batiment/`

---

## 📍 Position actuelle
```
Phase 1 — Setup & Auth     █████████████████████ 100% — terminé ✅
Phase 2 — CRM Dashboard    ████████████░░░░░░░░░  60% — en cours
Phase 3 — Client Portal    ░░░░░░░░░░░░░░░░░░░░░   0% — pas commencé
Phase 4 — Ecosystem        ░░░░░░░░░░░░░░░░░░░░░   0% — pas commencé
```

---

## ✅ PHASE 1 — Setup & Auth

| Tâche | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Init Vite + React 18 + TypeScript | — | `main` | ✅ Terminé |
| TailwindCSS + Shadcn/UI | `tailwind.config.js` | `main` | ✅ Terminé |
| TanStack Query + Axios | `src/services/` | `main` | ✅ Terminé |
| Config `src/lib/axios.ts` | — | `main` | ✅ Terminé |
| `.env` VITE_CORE + VITE_BATI | — | `main` | ✅ Terminé |
| Types TypeScript (`auth.ts` + `crm.ts`) | — | `main` | ✅ Terminé |
| **Login Page** | `src/pages/ecosystem/social/LoginPage.jsx` | `feature/auth-login` | ✅ Terminé |
| **Auth Guard** (routes protégées) | `src/App.js` (vérifier logique auth) | `feature/auth-login` | ✅ Terminé |

### Prochaine branche : `feature/crm-layout`

---

## 📋 PHASE 2 — CRM Dashboard

> **Débloquer après** : Phase 1 complète + login fonctionnel

### 2.1 Layout & Navigation

| Tâche | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| CRMLayout (sidebar + topbar) | `src/pages/client/ClientLayout.jsx` | `feature/crm-layout` | ✅ Terminé + testé |
| Sidebar avec navigation CRM | `src/components/layout/EspaceProNav.jsx` | `feature/crm-layout` | ✅ Terminé + testé |
| TopBar (user info + logout) | `src/components/layout/UnifiedHeader.jsx` | `feature/crm-layout` | ✅ Terminé + testé |

### 2.2 Pages CRM

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| **Prospects** | `src/pages/client/crm-batiment/ProspectsPage.jsx` | `feature/crm-prospects` | ✅ Terminé + testé |
| **Clients** | `src/pages/client/crm-batiment/ClientsPage.jsx` | `feature/crm-clients` | ✅ Terminé + testé |
| **Devis** | `src/pages/client/crm-batiment/DevisPage.jsx` | `feature/crm-quotes` | ✅ Terminé + testé |
| **Factures** | `src/pages/client/crm-batiment/FacturesPage.jsx` | `feature/crm-invoices` | 📋 À faire |
| **Chantiers** | `src/pages/client/crm-batiment/ChantiersPage.jsx` | `feature/crm-chantiers` | 📋 À faire |
| **Settings** | `src/pages/client/crm-batiment/` (paramètres) | `feature/crm-settings` | 📋 À faire |

### Détail par page — ce qu'il faut implémenter

#### Prospects
- [x] Liste avec filtres (status, pipeline_stage)
- [x] Formulaire création/édition
- [x] Action : convertir en client
- [x] Statuts visuels (badges colorés)

#### Clients
- [x] Liste avec compteurs (total_quotes, total_invoices, total_revenue)
- [x] Détail client enrichi (onglets : devis, factures, chantiers, notes)
- [x] Formulaire création/édition
- [x] Ajout de notes
- [x] Génération portal token

#### Devis
- [x] Liste avec filtres (status)
- [x] Formulaire création avec lignes dynamiques + calcul auto
- [x] Actions : send, sign (canvas signature), duplicate
- [x] Conversion en facture
- [x] Statuts immutables (accepted/invoiced → pas d'édition)

#### Factures
- [ ] Liste avec filtres (status)
- [ ] Détail avec devis lié
- [ ] Action : mark-paid
- [ ] Action : cancel (bloqué si paid)
- [ ] Affichage amount_paid / amount_due

#### Chantiers
- [ ] Liste standard
- [ ] Vue Kanban pipeline (drag & drop entre stages)
- [ ] Détail enrichi (documents, commentaires, temps, coûts)
- [ ] Indicateur rentabilité (margin%, rentability_level)

#### Settings
- [ ] Formulaire paramètres artisan
- [ ] Logo upload
- [ ] Infos légales (SIRET, TVA, CGV)

---

## 📋 PHASE 3 — Client Portal

> **Débloquer après** : Phase 2 complète

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Vue publique devis (signature) | `src/pages/public/PublicQuoteSignPage.jsx` | `feature/portal-quote` | 📋 À faire |
| Portail client (token) | `src/pages/public/ClientPortalPage.jsx` | `feature/portal-client` | 📋 À faire |

---

## 📋 PHASE 4 — Ecosystem Social

> **Débloquer après** : Phase 3 complète

| Page | Fichier Emergent de référence | Branche | État |
|---|---|---|---|
| Feed / Posts | `src/pages/ecosystem/social/FeedPage.jsx` | `feature/ecosystem-feed` | 📋 À faire |
| Profil artisan | `src/pages/ecosystem/social/ProfilePage.jsx` | `feature/ecosystem-profile` | 📋 À faire |
| Marketplace artisans | `src/pages/ecosystem/marketplace/ArtisansPage.jsx` | `feature/ecosystem-marketplace` | 📋 À faire |
| Jobs & Events | `src/pages/ecosystem/social/JobsPage.jsx` | `feature/ecosystem-jobs` | 📋 À faire |

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
> Le Login doit fonctionner avant de toucher au CRM.
> Le CRM doit être stable avant de toucher au Portal.

---

## 📐 Rappel ordre de priorité par page CRM
```
1. Layout + Sidebar      ← base de tout, à faire en premier
2. Prospects             ← le plus simple, bon point d'entrée
3. Clients               ← dépend des prospects (conversion)
4. Devis                 ← dépend des clients
5. Factures              ← dépend des devis
6. Chantiers             ← dépend des clients + devis
7. Settings              ← indépendant, à faire en dernier
```

---

## 📂 Référence Emergent
- Chemin local : `~/project/AbracadaBati/frontend/src/`
- Pages CRM : `src/pages/client/crm-batiment/`
- Composants UI : `src/components/ui/`
- Layouts : `src/components/layout/`

---

*Dernière mise à jour : 1 Avril 2026 — Devis terminé*
*Rédigé par : Fanomezantsoa + Claude*
