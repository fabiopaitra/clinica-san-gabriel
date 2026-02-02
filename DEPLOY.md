# Deploy - Clínica San Gabriel

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
3. Nome: `clinica-media`

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
