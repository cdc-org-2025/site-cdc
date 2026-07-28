# 📖 Diretrizes de Documentação & Governança (CDC Receitas & Site CDC)

Este documento define as normas, princípios e padrões operacionais para a criação, manutenção e evolução da documentação, automações e receitas do repositório.

---

## 1. Objetivos da Documentação

- **Preservação de Conhecimento**: Evitar a perda de padrões, scripts e prompts valiosos acumulados ao longo do tempo pela equipe.
- **Portabilidade & Reuso**: Garantir que qualquer colaborador possa copiar e colar receitas para novos projetos com zero atrito de configuração.
- **Segurança por Padrão**: Impedir a exposição involuntária de senhas, tokens ou webhooks reais.

---

## 2. Padrão de Tom de Voz: Modelo Híbrido

Adotamos o **Modelo Híbrido de Escrita (Corporativo Amigável)**:

- **Seções Conceituais / Introdução**: Usar tom acolhedor, contextual e empático. Explicar o "porquê" de cada receita ou padrão existir.
- **Passo a Passo / Procedimentos**: Usar tom direto, procedimental e altamente escaneável (listas numeradas, negritos em botões e tabelas).

---

## 3. Automação Idempotente de Issues via GitHub Actions

No repositório, as tarefas principais e melhorias futuras são cadastradas automaticamente no GitHub via o workflow `.github/workflows/automatizar_issues.yml`.

### Como Funciona a Automação:
1. **Gatilho**: Disparado em todo `push` para a branch `main` e via acionamento manual (`workflow_dispatch`).
2. **Ambiente & Autenticação**: Executado em `ubuntu-latest` utilizando a variável `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.
3. **Idempotência (`create_issue_if_not_exists`)**:
   Antes de criar qualquer tarefa, o script executa uma consulta usando o GitHub CLI (`gh issue list --search "\"$title\" in:title"`). Se a issue já existir, a criação é omitida, evitando duplicações em commits consecutivos.
4. **Estrutura das Issues**:
   - Título com identificador claro (`[FEAT]`, `[CONFIG]`, `[ARCH]`, `[BUG]`, `[DOCS]`, `[MIGRACAO]`).
   - Rótulos adequados (`enhancement`, `documentation`, `bug`).
   - Descrição rica com links relativos para `docs/` e caixa de verificação para Critérios de Aceite (`- [ ]`).

---

## 4. Visualização Gráfica de Branches e Histórico (Git Graph)

Para manter a transparência, rastreabilidade e facilitar o entendimento visual das branches do repositório por toda a equipe, padronizamos dois métodos de visualização gráfica do Git:

### A. Visualização Gráfica via Terminal (Git Graph CLI)
Execute o comando abaixo ou configure o alias oficial no seu Git:

```bash
# Comando direto no terminal:
git log --graph --oneline --all --decorate

# Criar alias permanente 'git graph':
git config --global alias.graph "log --graph --oneline --all --decorate"

# Uso diário:
git graph
```

### B. Diagrama de Branches em Markdown (Mermaid gitGraph)
Nos arquivos de documentação (`README.md`, `estrategia_execucao.md`), utilize blocos `mermaid` com sintaxe `gitGraph` para ilustrar o fluxo de branches.

---

## 5. Estrutura Oficial do Repositório

```text
site-cdc/
├── README.md                          # Painel principal com mapa visual Mermaid e índice
├── docker-compose.yml                 # Orquestração local/servidor Docker
├── .github/
│   └── workflows/
│       ├── automatizar_issues.yml     # Workflow de automação de Issues idempotente
│       └── deploy_hostinger.yml       # Deploy automático SSH Hostinger VPS
├── docs/                              # Governança, infraestrutura e sustentação
│   ├── diretrizes_documentacao.md     # Este documento (Regras editoriais, Git Graph e ADRs)
│   └── inquerito_migracao_gcp_hostinger.md # Diagnóstico de viabilidade GCP ➔ Hostinger
├── frontend/                          # Aplicação Next.js 14
├── backend/                           # API Express REST
└── painel-admin/                      # Painel AdminJS 7
```

---

## 6. Regras de Segurança & Sanitização

- NUNCA suba arquivos `.env` reais, certificados `.pem` ou senhas no Git.
- Todos os arquivos de receita e configuração devem utilizar variáveis de ambiente ou placeholders explícitos.
- Utilize o `.gitignore` oficial do repositório para evitar inclusões acidentais.

---

## 7. Registro de Decisões de Arquitetura (ADR)

| ID | Data | Decisão | Motivo | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-001** | 2026-07-21 | Adição de subpastas `infra/`, `prompts/` e `api/` | Organização modular por tipo de recurso reutilizável. | Aprovado |
| **ADR-002** | 2026-07-21 | Adoção do modelo de arquivos na pasta `docs/` | Padronização de governança DevOps da empresa. | Aprovado |
| **ADR-003** | 2026-07-24 | Automação Idempotente de Issues via GitHub Actions | Garantir o cadastro e rastreabilidade automatizada de tarefas no GitHub sem duplicações. | Aprovado |
| **ADR-004** | 2026-07-28 | Padronização de Visualização Gráfica de Branches (`git graph` / Mermaid) | Facilitar a auditoria e entendimento visual da evolução das branches da equipe. | Aprovado |
| **ADR-005** | 2026-07-28 | Migração GCP Cloud Run/Cloud SQL ➔ Hostinger VPS (Docker) | Redução de custos e consolidação em container único com Nginx + Postgres. | Aprovado |
