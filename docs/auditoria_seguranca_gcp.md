# 🚨 Relatório de Auditoria de Segurança & Resposta a Incidentes (GCP)
## Repositório: `site-cdc` | Data: 28 de Julho de 2026

---

## 1. Origem do Alerta GCP & Causa Raiz Identificada

Recebemos a notificação de segurança do Google Cloud Platform:
> *"Dear Developer, We detected and will disable a publicly exposed service account authentication credential associated with the following Google Cloud Platform account"*

### 🔍 Causa Raiz Localizada no Código:
Durante o inquérito de auditoria no repositório, identificamos o arquivo:
- **Caminho:** `painel-admin/config/chave.json`

O arquivo contendo a **chave privada RSA completa** da conta de serviço `427143287446-compute@developer.gserviceaccount.com` (Projeto GCP: `cdc-org`) foi commitado em texto plano no repositório Git.

```json
{
  "type": "service_account",
  "project_id": "cdc-org",
  "private_key_id": "fb1f9aa8d51508d5cd3c449c5179f7a6d0b5fde1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSk...",
  "client_email": "427143287446-compute@developer.gserviceaccount.com"
}
```

---

## 2. Diagnóstico de Impacto & Riscos

1. **Desativação Automática pelo GCP**: O Google detectou a exposição pública do arquivo `chave.json` e revogou/desabilitou a chave automaticamente para proteger a conta `cdc-org`.
2. **Impacto no Serviço Atual**: Como a chave foi revogada pelo Google, chamadas para upload de imagens via GCP Storage no `painel-admin` que dependiam de `config/chave.json` falharão com erro de autenticação.
3. **Ausência da Equipe Anterior**: Como a equipe anterior foi desligada sem documentação, o uso de chaves hardcoded nos diretórios do projeto era uma prática recorrente e insegura.

---

## 3. Plano de Remediação Imediata & Higienização

### 🛡️ Ação 1: Sanitização do Repositório (Remoção da Chave Exposta)
- Substituir o conteúdo de `painel-admin/config/chave.json` por um arquivo de exemplo sanitizado ([chave.example.json](file:///c:/Códigos/site-cdc/painel-admin/config/chave.example.json)) sem segredos reais.
- Adicionar regras estritas no `.gitignore` para bloquear `*.json` de credenciais e pastas de configuração com segredos.

### 🛡️ Ação 2: Desvinculação do Código de Arquivos Físicos de Chave
- Alterar o `painel-admin/config/GCPProvider.js` e o `backend/src/services/UploadService.js` para ler credenciais via variáveis de ambiente (`process.env.GCP_PRIVATE_KEY` / `process.env.GCP_CLIENT_EMAIL`) ou adaptar para o Provedor de Armazenamento Local/S3 durante a migração Hostinger.

### 🛡️ Ação 3: Revogação Definitiva no Console GCP
- Acessar o **Google Cloud Console ➔ IAM & Admin ➔ Service Accounts**.
- Confirmar a exclusão da chave comprometida (`fb1f9aa8d515...`).
- Garantir que nenhuma outra chave esteja exposta.

---

## 4. Política de Segurança para o Desenvolvimento Futuro

1. **Zero Credenciais no Git**: Nenhuma senha, token ou chave RSA JSON poderá ser commitada no repositório.
2. **Uso Exclusivo de `.env`**: Todas as credenciais serão injetadas via variáveis de ambiente.
3. **Varredura Pré-Commit (Pre-Commit Hooks)**: Utilizar `.gitignore` e ferramentas de linting para barrar arquivos de chave.
