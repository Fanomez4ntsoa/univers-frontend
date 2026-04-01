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
// Standard
<div className="bg-white border border-gray-200 rounded-xl shadow-sm 
                hover:shadow-md hover:border-gray-300 p-5 
                transition-all duration-200">
```

### Animations standards
```typescript
// Framer Motion — fade up (utilisé sur toutes les pages)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

// Stagger container
const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

Transitions hover : `duration-200 ease-out`

### Responsive — Breakpoints
| Breakpoint | Largeur | Préfixe |
|---|---|---|
| Mobile | < 640px | (défaut) |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 1024px | `lg:` |
| Large | ≥ 1280px | `xl:` |
```tsx
// Patterns responsives standards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
<div className="px-4 sm:px-6 lg:px-8">
<div className="hidden lg:block">  {/* Desktop uniquement */}
<div className="lg:hidden">        {/* Mobile/Tablet uniquement */}
```

### Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
```

### Icônes — Lucide React
```tsx
import { Building2, Wrench, FileText, Users, 
         BarChart3, Calendar, CreditCard } from 'lucide-react'
// Tailles : 16px (sm), 20px (md), 24px (lg)
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
   Accept: application/json

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
Un module frontend = un dossier feature/ autonome.
```
Backend DDD :              Frontend FSD :
app/Modules/CRM/       →   src/features/crm/
  Controllers/         →     components/
  Services/            →     hooks/
  Requests/            →     types/
```

### Structure des dossiers
```
src/
├── features/                    ← tout ce qui est métier
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── types/
│   │       └── auth.ts
│   └── crm/
│       ├── prospects/
│       │   ├── components/
│       │   │   ├── ProspectsList.tsx
│       │   │   ├── ProspectCard.tsx
│       │   │   ├── ProspectForm.tsx
│       │   │   └── ProspectFilters.tsx
│       │   ├── hooks/
│       │   │   └── useProspects.ts
│       │   └── types/
│       │       └── prospect.ts
│       ├── clients/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── types/
│       ├── quotes/
│       ├── invoices/
│       ├── chantiers/
│       └── settings/
├── shared/                      ← partagé entre plusieurs features
│   ├── components/
│   │   ├── StatusBadge.tsx
│   │   ├── EmptyState.tsx
│   │   ├── PageSkeleton.tsx
│   │   └── ConfirmDialog.tsx
│   ├── lib/
│   │   ├── axios.ts
│   │   └── utils.ts
│   └── ui/                      # Shadcn/UI — ne jamais modifier
├── pages/                       ← orchestration uniquement
│   ├── auth/
│   │   └── LoginPage.tsx
│   └── crm/
│       ├── ProspectsPage.tsx
│       ├── ClientsPage.tsx
│       ├── QuotesPage.tsx
│       ├── InvoicesPage.tsx
│       ├── ChantiersPage.tsx
│       └── SettingsPage.tsx
└── App.tsx
```

### Règles strictes — Responsabilité unique

**Page** → orchestration pure, max 50 lignes
```tsx
// ✅ Correct
export default function ProspectsPage() {
  const { data, isLoading } = useProspects()
  if (isLoading) return <PageSkeleton />
  return <ProspectsList data={data ?? []} />
}

// ❌ Incorrect — logique métier dans la page
export default function ProspectsPage() {
  const [prospects, setProspects] = useState([])
  useEffect(() => {
    axios.get('/api/batiment/prospects').then(...)
  }, [])
}
```

**Feature** → autonome, max 200 lignes par fichier
```
features/crm/prospects/ → tout ce qui concerne les prospects
Si un composant est utilisé par 2+ features → il va dans shared/
Une feature n'importe JAMAIS depuis une autre feature directement
```

**Hook** → toute la logique TanStack Query
```typescript
// ✅ Correct — hook typé
export const useProspects = () => {
  return useQuery<Prospect[]>({
    queryKey: ['prospects'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/batiment/prospects')
      return data
    }
  })
}
```

**Composant** → UI pure, props in / JSX out
```tsx
// ✅ Correct
interface ProspectCardProps {
  prospect: Prospect
  onEdit: (id: number) => void
}
export function ProspectCard({ prospect, onEdit }: ProspectCardProps) {
  return <div>...</div>
}

// ❌ Incorrect — appel API dans un composant
export function ProspectCard() {
  const { data } = useQuery(...)  // ← non, ça va dans le hook
}
```

### Ce qui est interdit — Anti fourre-tout
- ❌ Page de plus de 50 lignes sans extraire des composants
- ❌ Appel axios direct dans une Page ou un Composant
- ❌ useQuery / useMutation dans un Composant
- ❌ Import d'une feature depuis une autre feature
- ❌ Logique métier dans une Page
- ❌ Plus de 200 lignes dans un seul fichier

---

## 🔌 API consommée

### Core (port 8000)
```
POST /api/auth/login    → Connexion → { token, user, profile }
POST /api/auth/logout   → Déconnexion
GET  /api/me            → Profil connecté
```

### Bati (port 8001) — Bearer token obligatoire
```
/api/batiment/prospects/*
/api/batiment/clients/*
/api/batiment/quotes/*
/api/batiment/invoices/*
/api/batiment/chantiers/*
/api/batiment/settings/company
```

> Référence complète : voir CLAUDE.md de `abracadabativ2`

---

## 📁 Pages — État d'avancement

### 🔄 À faire (Phase 1 CRM)
- [ ] Login page
- [ ] CRMLayout + Sidebar + TopBar
- [ ] ProspectsPage : liste + formulaire + conversion
- [ ] ClientsPage : liste + détail + notes
- [ ] QuotesPage : liste + création + send/sign
- [ ] InvoicesPage : liste + détail + mark-paid
- [ ] ChantiersPage : liste + kanban pipeline + détail
- [ ] SettingsPage : formulaire paramètres artisan

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
# → http://localhost:5173
```

---

## 🌿 Git Workflow — Règles obligatoires

### Branche principale
- `main` est la branche de production — on n'y pousse jamais directement

### Nomenclature
| Type | Préfixe | Exemple |
|---|---|---|
| Nouvelle page | `feature/` | `feature/crm-prospects` |
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

### Principe
Chaque page terminée doit être testée **visuellement dans le navigateur**
avant de merger vers `main`.

### Checklist minimum par page
- [ ] Affichage correct sur mobile (< 640px)
- [ ] Affichage correct sur tablet (640px - 1024px)
- [ ] Affichage correct sur desktop (> 1024px)
- [ ] Données chargées depuis l'API réelle (pas de mock)
- [ ] États loading / error / empty gérés
- [ ] Actions fonctionnelles (create, update, delete)
- [ ] Pas d'erreur dans la console navigateur
- [ ] Pas d'erreur TypeScript (`npm run build` passe sans erreur)

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
- ❌ Pas d'import entre features — passer par shared/

---

## 📂 Projets locaux

| Projet | Chemin | Rôle |
|---|---|---|
| `abracadaworld-core` | `~/project/abracadaworld-core/` | Auth — port 8000 |
| `abracadabativ2` | `~/project/abracadabativ2/` | API backend — port 8001 |
| `abracadabati-frontend` | `~/project/abracadabati-frontend/` | Ce repo — port 5173 |
| `AbracadaBati` | `~/project/AbracadaBati/` | Référence Emergent |

---

*Dernière mise à jour : 1 Avril 2026 — Architecture FSD ajoutée*
*Rédigé par : Fanomezantsoa + Claude*
