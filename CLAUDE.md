# CLAUDE.md — AbracadaBati Frontend

> **Lire aussi : ROADMAP_FRONTEND.md** — contient l'état d'avancement complet du développement frontend. À consulter avant chaque nouvelle page ou composant.

> **Lis ce fichier entièrement avant de faire quoi que ce soit.**
> Il contient toutes les décisions d'architecture, les règles du projet,
> et le contexte nécessaire pour travailler correctement.

---

## 🧠 Règle fondamentale — À ne jamais oublier

**Avant de créer ou modifier quoi que ce soit :**

1. **Vérifier d'abord** ce que le projet Emergent (`AbracadaBati`) a déjà fait
2. **Extraire** ce qui est pertinent (pages, composants, structure)
3. **Adapter** à notre stack Vite + React + TypeScript + TanStack Query
4. **Enrichir** seulement si nécessaire

> Ne jamais inventer un composant, une page, ou une structure sans avoir
> vérifié si elle existe déjà dans le projet Emergent de référence
> (`~/project/AbracadaBati/frontend/src/`).

---

## 📌 Contexte du projet

### Vision
Frontend CRM de l'univers AbracadaBati — tableau de bord artisan.
```
abracadaworld-core        (auth — port 8000)
abracadabativ2            (API backend — port 8001)
abracadabati-frontend     (ce repo — port 5173)
```

### Projet de référence : `AbracadaBati` frontend
- Chemin local : `~/project/AbracadaBati/frontend/src/`
- Pages CRM de référence : `src/pages/client/crm-batiment/`
- Stack Emergent : Create React App + TailwindCSS + Shadcn/UI
- **C'est la référence UI/UX** — on copie et adapte, on n'invente pas

---

## ✅ Stack technique

| Couche | Technologie |
|---|---|
| Framework | Vite + React 18 + **TypeScript** |
| Architecture | **Feature-Sliced Design (FSD)** |
| Styling | TailwindCSS + Shadcn/UI |
| Animations | Framer Motion |
| Icônes | Lucide React |
| Routing | React Router v6 |
| Appels API | TanStack Query + Axios |
| Notifications | Sonner (toast) |
| Auth | JWT stocké localStorage |
| Port local | 5173 |
| Déploiement | Vercel |

---

## 🎨 Design System

### Palette de couleurs
| Nom | Hex | Usage |
|---|---|---|
| Bleu Professionnel | `#1E40AF` | CTA principaux, headers, liens actifs |
| Orange Chantier | `#F97316` | Accents, badges urgents, boutons secondaires |
| Bleu Accent | `#3B82F6` | Hover, focus, éléments interactifs |
| Gris Foncé | `#1E293B` | Texte principal |
| Gris Clair | `#F8FAFC` | Fonds de page |
| Vert Succès | `#10B981` | Validations, statuts positifs |
| Rouge Erreur | `#EF4444` | Erreurs, alertes |
| Warning | `#F59E0B` | Avertissements |

### Typographie
- **Police** : Inter (Google Fonts) — fallback : `-apple-system, BlinkMacSystemFont, sans-serif`

| Élément | Taille | Poids |
|---|---|---|
| H1 | 24px - 32px | 700 |
| H2 | 18px - 20px | 600 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| XS | 12px | 500 |

### Espacements
| Token | Valeur | Classe Tailwind |
|---|---|---|
| xs | 8px | `p-2` |
| sm | 16px | `p-4` |
| md | 24px | `p-6` |
| lg | 32px | `p-8` |
| xl | 48px | `p-12` |

### Border Radius
| Élément | Classe |
|---|---|
| Boutons | `rounded-lg` |
| Cards | `rounded-xl` |
| Modals | `rounded-2xl` |
| Badges | `rounded-full` |
| Inputs | `rounded-xl` |

### Boutons
| Variante | Background | Texte |
|---|---|---|
| Primary | `#1E40AF` | blanc |
| Secondary | `#F97316` | blanc |
| Outline | transparent | `#1E40AF` |
| Ghost | transparent | gray-700 |

Hauteur standard : `h-11` (44px)

### Cards
```tsx
<div className="bg-white border border-gray-200 rounded-xl shadow-sm 
                hover:shadow-md hover:border-gray-300 p-5 
                transition-all duration-200">
```

### Animations standards
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}
const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

Transitions hover : `duration-200 ease-out`

### ⚠️ Règles CSS — Tailwind v4
- Tous les styles globaux doivent être dans `@layer base` pour être écrasables par les classes utilitaires
- Ne jamais mettre de `display: flex/block` en style inline sur un élément avec des classes responsive `md:hidden` / `hidden md:block`
- Pour les classes CSS custom — toujours vérifier `~/project/AbracadaBati/frontend/src/index.css` d'Emergent

### Responsive — Breakpoints
| Breakpoint | Largeur | Préfixe |
|---|---|---|
| Mobile | < 640px | (défaut) |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 1024px | `lg:` |
| Large | ≥ 1280px | `xl:` |

### Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
```

### Tone of voice — Tutoiement obligatoire
- ✅ "Crée ton compte" / "Tes chantiers" / "Connecte-toi"
- ❌ "Créez votre compte" / "Vos chantiers" / "Connectez-vous"

---

## 🔐 Authentification

### Flux complet
```
1. POST http://localhost:8000/api/auth/login
   ← reçoit { token, user, profile }
2. localStorage.setItem('token', token)
3. Chaque requête vers abracadabativ2 :
   Authorization: Bearer <token>
4. Si 401 → vider localStorage → rediriger /login
```

### src/lib/axios.ts
```typescript
import axios from 'axios'

export const coreAPI = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
})

export const batiAPI = axios.create({
  baseURL: import.meta.env.VITE_BATI_API_URL,
})

batiAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

batiAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🏗️ Architecture — Feature-Sliced Design (FSD)

### Philosophie
Même logique que le backend DDD — chaque domaine métier est isolé.

### Structure des dossiers
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   ├── crm/
│   │   ├── prospects/
│   │   ├── clients/
│   │   ├── quotes/
│   │   ├── invoices/
│   │   ├── chantiers/
│   │   └── settings/
│   ├── portal/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   ├── ecosystem/
│   │   ├── feed/
│   │   ├── shops/
│   │   ├── listings/
│   │   ├── jobs/
│   │   └── social/
│   ├── matching/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   └── subscription/
│       ├── components/
│       ├── hooks/
│       └── types/
├── shared/
│   ├── components/
│   ├── lib/
│   └── ui/
├── pages/
│   ├── auth/
│   ├── crm/
│   ├── portal/
│   ├── ecosystem/
│   ├── matching/
│   └── subscription/
└── App.tsx
```

### Les 3 layouts — distinction importante
Fidèle à Emergent, le projet a 3 espaces distincts :
```
CRMLayout        → /prospects, /clients, /quotes...
                   Protégé par AuthGuard
                   Sidebar CRM + TopBar

EcosystemLayout  → /feed, /discover, /shops, /listings, /jobs
                   PUBLIC — sans AuthGuard
                   Header bleu + navigation Ecosystem
                   Actions sensibles → vérifier token en interne

Public           → /login, /portal/:token
                   Sans layout
```

> ⚠️ L'Ecosystem est public — accessible sans être connecté.
> Les actions (like, commenter, poster) vérifient `localStorage.getItem('token')`
> en interne. Si absent → toast "Connecte-toi pour effectuer cette action"

### Règles strictes
- **Page** → orchestration pure, max 50 lignes
- **Hook** → toute la logique TanStack Query
- **Composant** → UI pure, props in / JSX out
- **Feature** → autonome, max 200 lignes par fichier
- Une feature n'importe **jamais** depuis une autre feature

### Ce qui est interdit
- ❌ Page de plus de 50 lignes sans extraire des composants
- ❌ Appel axios direct dans une Page ou un Composant
- ❌ useQuery / useMutation dans un Composant
- ❌ Import d'une feature depuis une autre feature
- ❌ Logique métier dans une Page
- ❌ Plus de 200 lignes dans un seul fichier

### Helper partagé — requireAuth
`src/shared/lib/requireAuth.ts` — à utiliser pour toutes les actions sensibles dans l'Ecosystem.
Vérifie le token en interne. Si absent → toast erreur. Ne redirige pas.
```typescript
import { toast } from 'sonner'
export const requireAuth = (action: () => void): void => {
  if (!localStorage.getItem('token')) {
    toast.error('Connecte-toi pour effectuer cette action')
    return
  }
  action()
}
```

---

## 🔌 API consommée

### Mode démo
- `IS_DEMO = false ✅` dans `src/shared/lib/config.ts` — badges "TEST" désactivés
- **Mettre à `false` en production** avant le déploiement

### Core (port 8000)
```
POST /api/auth/login    → { token, user, profile }
POST /api/auth/logout
GET  /api/me
```

### Bati (port 8001) — Bearer token obligatoire
```
/api/batiment/*         → CRM (prospects, clients, quotes, invoices, chantiers, settings)
/api/portal/{token}/*   → Client Portal (public)
/api/ecosystem/*        → Ecosystem Social (GET = public, POST/PUT/DELETE = auth)
/api/matching/*         → Matching
/api/subscription/*     → Stripe
/api/stripe/webhook     → Webhook (public)
```

> Référence complète des endpoints : voir CLAUDE.md de `abracadabativ2`

---

## 📁 Pages — État d'avancement

### ✅ Terminé
- Login + Auth Guard *(testé navigateur)*
- CRMLayout + Sidebar + TopBar *(testé navigateur)*
- ProspectsPage *(testé navigateur)*
- ClientsPage *(testé navigateur)*
- QuotesPage *(testé navigateur)*
- InvoicesPage *(testé navigateur)*
- ChantiersPage *(testé navigateur)*
- SettingsPage *(testé navigateur)*
- Vue publique devis + signature *(testé navigateur)*
- Portail client dashboard *(testé navigateur)*
- EcosystemLayout *(testé navigateur)*
- FeedPage — posts + likes + commentaires *(testé navigateur)*
- DiscoverPage — grille artisans + follow *(testé navigateur)*
- ProfilePage — profil public artisan *(testé navigateur)*
- ShopsPage + ShopDetailPage + MyShopPage *(testé navigateur)*
- ListingsPage + ListingDetailPage + MyListingsPage *(testé navigateur)*
- JobsPage + JobDetailPage + EventDetailPage *(testé navigateur)*
- MyRequestsPage + RequestDetailPage + AvailablePage + MyQuotesPage *(testé navigateur)*
- SubscriptionPage — abonnement Pro + checkout Stripe *(testé navigateur)*
- HomePage — centre commercial 6 univers *(testé navigateur)*
- LandingPage — BatiAssist 7 sections *(testé navigateur)*
- PricingPage + AboutPage + ContactPage + RegisterPage *(testé navigateur)*

### 🔄 À faire
- Aucune phase restante — toutes les phases terminées

---

## ⚙️ Configuration locale

### .env
```env
VITE_CORE_API_URL=http://localhost:8000
VITE_BATI_API_URL=http://localhost:8001
```

### Lancer le projet
```bash
cd ~/project/abracadabati-frontend
npm run dev
```

---

## 🌿 Git Workflow — Règles obligatoires

### Branche principale
- `main` est la branche de production — on n'y pousse jamais directement

### Nomenclature
| Type | Préfixe | Exemple |
|---|---|---|
| Nouvelle page | `feature/` | `feature/portal-client` |
| Correction bug | `fix/` | `fix/login-redirect` |
| UI/Style | `ui/` | `ui/sidebar-layout` |
| Documentation | `docs/` | `docs/update-claude-md` |

### Cycle de vie
```bash
git checkout main && git pull
git checkout -b feature/nom-de-la-page
git commit -m "[FEAT]: description claire"
# → tests visuels validés
# → Fanomezantsoa valide
# → merge vers main après accord
```

### Conflits
- Claude **ne résout jamais un conflit seul**
- Signaler + expliquer + proposer → **Fanomezantsoa valide**

---

## 🧪 Testing — Règles obligatoires

### Checklist minimum par page
- [ ] Affichage correct sur mobile (< 640px)
- [ ] Affichage correct sur tablet (640px - 1024px)
- [ ] Affichage correct sur desktop (> 1024px)
- [ ] Données chargées depuis l'API réelle
- [ ] États loading / error / empty gérés
- [ ] Actions fonctionnelles
- [ ] Pas d'erreur console navigateur
- [ ] `npm run build` passe sans erreur TypeScript

---

## 🚫 Ce qu'on ne fait PAS

- ❌ Pas d'appels API directs dans les composants
- ❌ Pas de données mockées en production
- ❌ Pas de CSS custom si Tailwind suffit
- ❌ Pas de création sans vérifier Emergent d'abord
- ❌ Pas de merge sans validation de Fanomezantsoa
- ❌ Pas de `Vous/Votre` — tutoiement obligatoire
- ❌ Pas de modification des fichiers `src/shared/ui/`
- ❌ Pas de `any` en TypeScript — typer ou `unknown`
- ❌ Pas de fichiers `.jsx` ou `.js` — tout en `.tsx` et `.ts`
- ❌ Pas de logique métier dans les Pages
- ❌ Pas d'import entre features — passer par `shared/`

---

## 📂 Projets locaux

| Projet | Chemin | Rôle |
|---|---|---|
| `abracadaworld-core` | `~/project/abracadaworld-core/` | Auth — port 8000 |
| `abracadabativ2` | `~/project/abracadabativ2/` | API backend — port 8001 |
| `abracadabati-frontend` | `~/project/abracadabati-frontend/` | Ce repo — port 5173 |
| `AbracadaBati` | `~/project/AbracadaBati/` | Référence Emergent |

---

*Dernière mise à jour : 25 Avril 2026 — IS_DEMO passé à false*
*Rédigé par : Fanomezantsoa + Claude*
