# Deploy - Clínica San Gabriel

## 0. Banco de dados (Vercel Postgres) e agendamentos

Para o agendamento de consultas e o painel admin funcionarem:

1. No Vercel Dashboard → seu projeto → **Storage** → **Create Database** → **Postgres** (ou use a migração do Vercel Postgres para Neon, se indicado).
2. Conecte o banco ao projeto; o Vercel define automaticamente `POSTGRES_URL` (e variáveis relacionadas).
3. Rode as migrações (localmente com `POSTGRES_URL` no `.env.local`, ou no build):
   ```bash
   npm run db:push
   ```
   Ou gere e aplique migrações: `npm run db:generate` e depois `npm run db:migrate`.
4. Crie o primeiro usuário admin (uma vez):
   ```bash
   ADMIN_SEED_USERNAME=seu_usuario ADMIN_SEED_PASSWORD=sua_senha_segura npm run db:seed-admin
   ```
   Ou defina `ADMIN_SEED_USERNAME` e `ADMIN_SEED_PASSWORD` no `.env.local` e rode `npm run db:seed-admin`.
5. Variáveis de ambiente obrigatórias para produção:
   - **AUTH_SECRET**: gere com `openssl rand -base64 32` e configure no Vercel (Settings → Environment Variables).
6. (Opcional) Limite de taxa no agendamento: crie um Redis no [Upstash](https://upstash.com) e defina **UPSTASH_REDIS_REST_URL** e **UPSTASH_REDIS_REST_TOKEN** no Vercel. Sem isso, o agendamento funciona sem rate limit por IP.

## 1. Fazer login na Vercel

```bash
vercel login
```

Siga o link no navegador para autenticar.

## 2. Deploy

```bash
vercel --prod
```

Na primeira vez, escolha seu time/account e confirme o projeto.

## 3. Configurar o vídeo do hero (Vercel Blob CDN)

O vídeo (70MB) não está no repositório. Hospede no Vercel Blob:

### 3.1 Criar Blob Store

1. Acesse [Vercel Dashboard](https://vercel.com) → seu projeto
2. Aba **Storage** → **Create Database** → **Blob**
3. Nome: `clinica-san-gabriel-blob`

### 3.2 Upload do vídeo

Com o `BLOB_READ_WRITE_TOKEN` configurado (automático após criar o store):

```bash
vercel blob put public/clinica-san-gabriel.mp4
```

O comando retorna uma URL como:
`https://xxxxx.public.blob.vercel-storage.com/clinica-san-gabriel-xxxxx.mp4`

### 3.3 Adicionar variável de ambiente

1. Vercel Dashboard → Projeto → **Settings** → **Environment Variables**
2. Adicione:
   - **Name:** `NEXT_PUBLIC_HERO_VIDEO_URL`
   - **Value:** (cole a URL do passo anterior)
   - **Environment:** Production, Preview, Development

3. **Redeploy** para aplicar a variável.

## 4. Conectar ao GitHub (deploy automático)

1. Vercel Dashboard → Projeto → **Settings** → **Git**
2. Conecte o repositório `clinica-san-gabriel`
3. A cada push na `main`, o deploy será automático.

## 5. QA / Preview (deploy só para teste)

Para testar novas funcionalidades (ex.: agendamento) **sem** alterar produção:

- **Produção**: deploy a partir do branch configurado como "Production Branch" (geralmente `main`).
- **Preview**: um deploy por push em qualquer outro branch e por pull request. URL tipo `clinica-san-gabriel-git-qa-<team>.vercel.app`.

### Workflow (recomendado: feature branch)

Use um **branch por funcionalidade**; o Preview dessa branch (ou do PR) é o ambiente de QA.

1. Crie o branch da feature: `git checkout -b feature/agendamento` (ou outro nome, ex. `feature/nome-da-feature`).
2. Commit e push: `git push -u origin feature/agendamento`.
3. No Vercel → **Deployments** → o push gera um deploy de Preview para esse branch. Abra a URL de Preview para testar. Se abrir um PR para `main`, o PR também ganha uma URL de Preview.
4. Quando QA estiver aprovado, faça merge do branch (ou do PR) em `main` para liberar em produção. Um único merge.

**Alternativa (branch `qa` fixo):** Se preferir uma única URL de QA estável, crie um branch `qa`, faça merge dos PRs em `qa` (em vez de em `main`) e teste no Preview do `qa`. Quando estiver pronto para produção, faça merge de `qa` em `main`. Exige manter `qa` alinhado com `main` e dois merges por release.

### Variáveis de ambiente para Preview

Em **Settings → Environment Variables**, defina para cada variável em qual **Environment** ela vale (Production, Preview, Development). Para o agendamento funcionar em Preview:

- **POSTGRES_URL** – Para Preview você pode usar o mesmo banco de produção (rápido, mas dados compartilhados) ou um banco separado (recomendado para QA isolado). Se for banco separado: crie outro Postgres (ex. Vercel Postgres "clinica-san-gabriel-qa") e adicione `POSTGRES_URL` com a URL do QA e marque **Preview** como ambiente. Assim o deploy de Preview usa só esse banco.
- **AUTH_SECRET** – Use um **segredo diferente** para Preview (ex. gere com `openssl rand -base64 32`) e adicione com Environment = **Preview** apenas, para sessões de QA não valerem em produção.

Opcional: **UPSTASH_REDIS_REST_URL** / **UPSTASH_REDIS_REST_TOKEN** para rate limit em Preview (pode ser o mesmo Redis ou outro).

### Banco separado para QA (recomendado)

1. Crie um segundo Postgres (outro store no Vercel ou projeto Neon para QA).
2. No Vercel, mantenha `POSTGRES_URL` de produção só em **Production**. Adicione outra entrada `POSTGRES_URL` com a URL do banco QA e marque **Preview**.
3. Rode migrações e seed contra o banco QA (local com a URL QA no `.env.local`): `npm run db:push` e `npm run db:seed-admin`.
