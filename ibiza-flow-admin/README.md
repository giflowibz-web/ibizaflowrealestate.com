# Ibiza Flow Admin

Panel de administración independiente para Ibiza Flow Real Estate.

---

## Deploy en Vercel (recomendado — 5 minutos)

### 1. Sube el código a GitHub

Crea un repo nuevo en GitHub y sube solo la carpeta `ibiza-flow-admin`:

```bash
cd ibiza-flow-admin
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/ibiza-flow-admin.git
git push -u origin main
```

### 2. Conecta a Vercel

1. Ve a [vercel.com](https://vercel.com) → **New Project**
2. Importa el repo `ibiza-flow-admin`
3. En la sección **Environment Variables**, añade:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Anon Key de Supabase |
| `ANTHROPIC_API_KEY` | Tu API Key de Anthropic (para generar descripciones) |

4. Click **Deploy** — listo en ~2 minutos

---

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# Edita .env.local con tus credenciales reales
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura

```
ibiza-flow-admin/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Sidebar de navegación
│   │   ├── properties/         # Lista y formulario de propiedades
│   │   └── portal-sync/        # Sincronización con portales
│   └── api/
│       └── generate-description/  # IA para generar descripciones
├── lib/
│   ├── supabase.ts             # Cliente Supabase
│   └── types.ts                # Tipos TypeScript
└── .env.example                # Variables de entorno necesarias
```
