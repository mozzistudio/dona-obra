# Doña Obra 👷‍♀️

Chatbot estimateur de services pour la maison au Panama. Doña Obra est votre vecina de confiance qui connaît tous les meilleurs prestataires de services de la ville.

## 🎯 Concept

Application web Next.js qui simule un chatbot WhatsApp permettant à un utilisateur de :
1. Décrire son besoin (texte + photos)
2. Recevoir une estimation de prix automatique via IA (Claude)
3. Recevoir des recommandations de prestataires

## 🛠 Stack Technique

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (base de données)
- **Claude API** (Anthropic) - via Vercel AI SDK
- **Vercel AI SDK** pour le streaming

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Éditer .env.local avec vos clés API
```

## 🗄 Configuration Supabase

### 1. Créer les tables

Exécutez le fichier de migration dans le SQL Editor de Supabase :

```bash
supabase/migrations/001_initial_schema.sql
```

Ou directement dans votre dashboard Supabase : https://supabase.com/dashboard/project/qzfioaiafroyxpcsrupf

### 2. Insérer les données de seed

Exécutez le fichier seed dans le SQL Editor :

```bash
supabase/seed.sql
```

Cela créera 15+ prestataires avec leurs avis.

## 🔑 Variables d'environnement

Créez un fichier `.env.local` avec :

```env
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qzfioaiafroyxpcsrupf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Où trouver les clés :

- **ANTHROPIC_API_KEY** : https://console.anthropic.com/
- **Supabase keys** : Dashboard Supabase → Settings → API

## 🚀 Lancer l'application

```bash
# Mode développement
npm run dev

# Build de production
npm run build
npm start
```

L'app sera disponible sur http://localhost:3000

## 📱 Utilisation

1. Ouvrez l'application
2. Doña Obra vous accueille avec son message de bienvenue
3. Décrivez votre besoin (vous pouvez ajouter des photos)
4. Doña Obra analyse et vous donne une estimation de prix
5. Elle vous recommande 3 prestataires pertinents
6. Cliquez sur "Ver más" pour voir les détails d'un prestataire
7. Cliquez sur "Contactar" pour obtenir les coordonnées (WhatsApp, téléphone)

## 🎨 Personnalité de Doña Obra

Doña Obra est une panameña de 48 ans qui connaît tous les bons maestros de la ville. Elle parle avec :
- Des expressions locales ("dimelo", "tranqui", "ese man es bueno")
- De l'honnêteté directe sur les prix
- Des références personnelles aux prestataires
- Des emojis stratégiques 👷‍♀️ 💪 🔧

## 📂 Structure du projet

```
/src
  /app
    /api/chat          → API route pour Claude
    layout.tsx         → Layout principal
    page.tsx           → Page unique (le chatbot)
    globals.css        → Styles globaux
  /components
    Chat.tsx           → Composant principal
    MessageBubble.tsx  → Bulle de message
    ChatInput.tsx      → Zone de saisie
    EstimationCard.tsx → Card d'estimation
    ProviderCard.tsx   → Card de prestataire
    ProviderCarousel.tsx → Carrousel de prestataires
    ProviderModal.tsx  → Modal détails prestataire
    ContactModal.tsx   → Modal de contact
    TypingIndicator.tsx → Indicateur de saisie
    ImagePreview.tsx   → Prévisualisation d'images
  /lib
    types.ts           → Types TypeScript
    supabase.ts        → Client Supabase
    providers.ts       → Fonctions prestataires
    conversations.ts   → Fonctions conversations
/supabase
  /migrations          → Migrations SQL
  seed.sql            → Données de seed
```

## 🚢 Déploiement sur Vercel

```bash
# Push sur GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Déployer sur Vercel
vercel
```

N'oubliez pas de configurer les variables d'environnement dans les settings Vercel.

## 📝 Notes

- L'app ne requiert pas d'authentification (MVP)
- Les conversations sont sauvegardées dans Supabase
- Les images sont envoyées en base64 à Claude (pas de storage pour le MVP)
- Mobile-first, optimisé pour les petits écrans

## 🤝 Contribuer

Pour l'instant, c'est un MVP. Les contributions ne sont pas encore ouvertes.

## 📄 Licence

Propriétaire - Mozzi Studio
