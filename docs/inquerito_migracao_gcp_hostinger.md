# 📋 Inquérito de Viabilidade & Plano de Migração (GCP ➔ Hostinger)
## Repositório: `site-cdc` (`cdc-org-2025/site-cdc`)

> **Status:** Instância de Banco PostgreSQL Auditada (`postgres-cdc`)  
> **Data:** 29 de Julho de 2026  
> **Banco Cloud SQL:** `postgres-cdc` (PostgreSQL 16 | IP: `35.198.13.35` | Região: `southamerica-east1-c`)  

---

## 1. Mapeamento dos Recursos GCP do Site (`cdc.org.br`)

```mermaid
graph TD
    User([Usuários / Navegador]) -->|HTTPS| Frontend[Frontend Next.js: cdc.org.br]
    Admin([Administradores]) -->|AdminJS| CloudRunAdmin[Painel AdminJS]
    Frontend -->|REST API| CloudRunBE[Backend Express REST API]
    
    CloudRunBE -->|PostgreSQL 16| CloudSQL[(GCP Cloud SQL: postgres-cdc - 35.198.13.35)]
    CloudRunAdmin -->|PostgreSQL 16| CloudSQL
```

### Inventário de Banco de Dados GCP:
- **Instância Cloud SQL**: `postgres-cdc`
- **Versão**: PostgreSQL 16
- **IP Público**: `35.198.13.35`
- **Localização**: `southamerica-east1-c` (São Paulo)
- **Status**: `RUNNABLE` (Ativo)

---

## 2. Estratégia de Migração para a Hostinger VPS

```mermaid
graph TD
    subgraph "Hostinger VPS KVM (Ubuntu 24.04 + Docker Compose)"
        Nginx[Nginx Reverse Proxy + SSL Let's Encrypt]
        
        Nginx -->|cdc.org.br| FEContainer[Frontend Next.js]
        Nginx -->|api.cdc.org.br| BEContainer[Backend Express API]
        Nginx -->|admin.cdc.org.br| AdminContainer[Painel AdminJS]
        
        BEContainer --> PostgresDB[(Docker Container: PostgreSQL 16)]
        AdminContainer --> PostgresDB
    end
```

---

## 3. Roteiro Atualizado de Execução

- [x] **Instância Cloud SQL Localizada**: `postgres-cdc` (PostgreSQL 16 - `35.198.13.35`).
- [ ] **Dump do Banco PostgreSQL (`postgres-cdc`)**: Gerar backup `.sql` e baixar para o laboratório local.
- [ ] **Importação no Lab Local**: Subir o container `site_cdc_postgres` e restaurar o dump.
- [ ] **Deploy na Hostinger VPS**: Subir os serviços em produção na nova hospedagem.
