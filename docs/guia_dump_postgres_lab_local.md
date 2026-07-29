# 🚀 Guia de Exportação Nativa do PostgreSQL (`postgres-cdc`) via GCS

Este documento detalha o procedimento escolhido para a **Exportação Nativa Direta do Banco de Dados PostgreSQL** do site `cdc.org.br` sem alterar senhas nem causar qualquer downtime na aplicação.

---

## 📋 Passo a Passo de Execução no Cloud Shell (`@cloudshell`)

### 1. Criar o Bucket Temporário no Cloud Storage (São Paulo):
```bash
gcloud storage buckets create gs://cdc-temp-backup-$(date +%s) --location=southamerica-east1
```

### 2. Conceder Permissão de Escrita para o Cloud SQL:
```bash
gcloud storage buckets add-iam-policy-binding gs://cdc-temp-backup-* --member="serviceAccount:$(gcloud sql instances describe postgres-cdc --format='value(serviceAccountEmailAddress)')" --role="roles/storage.objectAdmin"
```

### 3. Executar a Exportação Nativa do Banco `postgres`:
```bash
gcloud sql export sql postgres-cdc gs://cdc-temp-backup-*/backup_site_cdc_20260729.sql --database=postgres
```

### 4. Copiar o Backup do Bucket para o Cloud Shell:
```bash
gcloud storage cp gs://cdc-temp-backup-*/backup_site_cdc_20260729.sql ~/backup_site_cdc_20260729.sql
```

### 5. Verificar o Tamanho do Backup Gerado:
```bash
ls -lh ~/backup_site_cdc_20260729.sql
```

---

## 📥 Como Baixar o Arquivo para o Computador Local

1. No menu superior direito do **Cloud Shell** (navegador), clique em **⋮ (Mais)** ➔ **Fazer Download de Arquivo**.
2. Digite o nome do arquivo: `backup_site_cdc_20260729.sql`.
3. Clique em **Download**.
