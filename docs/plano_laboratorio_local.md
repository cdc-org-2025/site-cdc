# 🎯 Plano de Backup & Laboratório Local: Site Institucional (`cdc.org.br`)

> **Status:** Backup do Banco PostgreSQL Concluído com Sucesso!  
> **Data:** 29 de Julho de 2026  
> **Arquivo Gerado:** `backup_site_cdc_20260729.sql` (**322 KB**)  

---

## 📊 1. Status dos Backups do Sistema

| Componente | Origem / Servidor | Arquivo de Backup Gerado | Tamanho | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Banco PostgreSQL (Site CDC / AdminJS)** | GCP Cloud SQL (`postgres-cdc`) | `backup_site_cdc_20260729.sql` | **322 KB** | ✅ **Gerado com Sucesso** |
| **Banco MariaDB (Estoque / ERPNext)** | VM GCP (`prod1`) | `backup_estoque.sql` | **124 MB** | ✅ Gerado com Sucesso |

---

## 📥 2. Roteiro de Importação no Laboratório Local (Docker)

### Passo A: Baixar o arquivo do Cloud Shell
No menu superior do Cloud Shell (navegador):
1. Clique em **⋮ (Mais)** ➔ **Fazer Download de Arquivo**.
2. Digite: `backup_site_cdc_20260729.sql`.

### Passo B: Subir o PostgreSQL Local
No PowerShell da sua máquina local:
```powershell
cd C:\Códigos\site-cdc
docker compose up -d postgres
```

### Passo C: Importar os Dados no Container Local
```powershell
docker exec -i site_cdc_postgres psql -U cdc_user -d site_cdc_db < $env:USERPROFILE\Downloads\backup_site_cdc_20260729.sql
```
