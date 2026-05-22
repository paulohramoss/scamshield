# ScamShield — Detector Inteligente de Golpes Digitais

Aplicação web que usa inteligência artificial (Google Gemini) para detectar golpes digitais, phishing, engenharia social e fraudes financeiras a partir de mensagens, links e descrições de situações suspeitas.

## Stack

- **Next.js 15** com App Router
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI**
- **Supabase** (autenticação + banco de dados)
- **Google Gemini API** (análise inteligente)
- **Zod** (validação)
- **React Hook Form**
- **Lucide React** (ícones)
- **Sonner** (notificações)

## Funcionalidades

- Análise de mensagens, links e contextos suspeitos via IA
- Score de risco de 0 a 100 com nível (Baixo risco / Atenção / Alto risco / Golpe provável)
- Explicação em linguagem simples
- Lista de sinais de alerta (red flags)
- Orientações do que fazer e não fazer
- Sugestão de resposta segura
- Histórico de análises (usuários autenticados)
- Exemplos educativos de golpes comuns
- Guia "O que fazer se caí em golpe"
- Rate limiting básico por IP
- Autenticação com Supabase (e-mail e senha)

## Instalação

### 1. Clone e instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
# Supabase (obtenha em supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Google Gemini AI (obtenha em aistudio.google.com)
GEMINI_API_KEY=sua-chave-gemini
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Configure o banco de dados Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor**
3. Execute o arquivo `supabase/schema.sql`

### 4. Execute o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Configuração do Supabase

Execute o SQL em `supabase/schema.sql` no SQL Editor do Supabase.
Isso criará a tabela `scam_analyses`, índices e políticas RLS.

A aplicação funciona **sem Supabase** para análises. Sem as variáveis configuradas, o histórico é desabilitado mas as análises funcionam normalmente.

## Configuração do Gemini

1. Acesse [aistudio.google.com](https://aistudio.google.com)
2. Crie uma API Key
3. Adicione ao `.env.local` como `GEMINI_API_KEY`

## Estrutura do projeto

```
/app
  page.tsx                    — Landing page
  /analisar/page.tsx          — Página de análise
  /historico/page.tsx         — Histórico (requer auth)
  /login/page.tsx             — Login
  /cadastro/page.tsx          — Cadastro
  /exemplos/page.tsx          — Exemplos de golpes
  /sobre/page.tsx             — Sobre o projeto
  /cai-em-golpe/page.tsx      — Guia pós-golpe
  /api/analyze/route.ts       — API de análise (Gemini)

/components
  /layout                     — Header, Footer
  /analyzer                   — Formulário, resultados, badges
  /auth                       — Formulário de auth
  /history                    — Tabela de histórico

/lib
  gemini.ts                   — Integração Gemini
  risk.ts                     — Utilitários de risco
  validations.ts              — Schemas Zod
  /supabase                   — Clientes Supabase

/types/analysis.ts            — Tipos TypeScript
/supabase/schema.sql          — SQL do banco de dados
```

## Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint
```
