# 📋 Plano de Execução & Migração Segura (GCP ➔ Hostinger)
## Repositório: `site-cdc` | Versão: 1.0 (Definitiva)

---

## 🎯 Objetivo Principal

Realizar a transição estruturada e segura do **site-cdc** e de todos os seus serviços acoplados (Frontend Next.js, Backend Express, Painel AdminJS e PostgreSQL) da Google Cloud Platform para a infraestrutura Hostinger VPS, corrigindo vulnerabilidades de segurança e garantindo total independência operacional em relação à equipe anterior.

---

## 🛠️ Fase 1: Higienização de Segurança & Blindagem do Repositório (EM ANDAMENTO)

### Ações de Blindagem:
- [x] Localização da chave GCP exposta (`painel-admin/config/chave.json`).
- [x] Documentação do incidente em `docs/auditoria_seguranca_gcp.md`.
- [ ] Sanitização do arquivo `chave.json` substituindo por `chave.example.json`.
- [ ] Atualização do `.gitignore` para bloquear credenciais e chaves RSA.
- [ ] Refatoração dos providers de upload (`GCPProvider.js` e `UploadService.js`) para suportar armazenamento local em disco (volume Docker) durante a transição para a Hostinger.

---

## 📦 Fase 2: Dockerização & Padronização de Ambientes

### Ações de Infraestrutura:
- [x] Criação do `docker-compose.yml` para orquestração unificada (PostgreSQL 16, Backend, AdminJS, Frontend Next.js).
- [x] Criação do `frontend/Dockerfile` multi-stage otimizado.
- [x] Ajuste do `frontend/next.config.js` com `output: 'standalone'`.
- [x] Criação do modelo de variáveis [.env.example](file:///c:/Códigos/site-cdc/.env.example).
- [ ] Teste de inicialização local com `docker compose up -d`.

---

## 💾 Fase 3: Inventário & Extração de Dados da GCP

Como a equipe antiga não deixou documentação de acesso, realizaremos o resgate de dados:
1. **Banco de Dados PostgreSQL (GCP Cloud SQL)**:
   - Gerar exportação em arquivo `.sql` (`pg_dump`) via console da GCP ou conexão remota autorizada.
2. **Mídias e Arquivos (GCP Storage Bucket `cdc-site`)**:
   - Baixar todos os assets e uploads armazenados no bucket da GCP (`gsutil` / `gcloud storage`).
   - Transferir os arquivos para a pasta local `./uploads` que será montada no volume Docker.

---

## 🖥️ Fase 4: Provisionamento da Hostinger VPS & Homologação

1. **Servidor Alvo**: Hostinger VPS KVM (Ubuntu 24.04 LTS).
2. **Instalação**: Docker, Docker Compose, Git, Nginx e Certbot (Let's Encrypt SSL).
3. **Deploy de Homologação (Staging)**:
   - Subir a aplicação via `docker compose up -d`.
   - Restaurar o dump do banco PostgreSQL.
   - Testar rotas da API, formulários do site e login Google OAuth no AdminJS.

---

## 🚀 Fase 5: Virada de Chave (Cutover), CI/CD & Descomissionamento GCP

1. **Apontamento de DNS**: Alterar os registros A e CNAME no provedor de domínio para o IP público da Hostinger VPS.
2. **SSL Gratuito**: Emitir certificados HTTPS via Certbot/Nginx.
3. **Pipeline CI/CD**: Ativar o workflow [.github/workflows/deploy_hostinger.yml](file:///c:/Códigos/site-cdc/.github/workflows/deploy_hostinger.yml) para deploys automáticos via SSH.
4. **Descomissionamento GCP**: Realizar snapshot de segurança da GCP e desligar instâncias no Cloud Run e Cloud SQL para cancelar faturamento.

---

## 📊 Matriz de Responsabilidades & Protocolo de Decisão

- **Decisões Técnicas**: Executadas autonomamente em "Modo Turbo" pela IA Antigravity.
- **Registro de Progresso**: Todas as etapas e evidências são mantidas em `task.md` e na pasta `docs/`.
- **Commits**: Versionados e enviados diretamente para o repositório GitHub via SSH.
