# 🚀 Guia de Exportação Nativa do PostgreSQL (`postgres-cdc`) via GCS

Este documento detalha o procedimento de **Exportação Nativa Direta do Banco de Dados PostgreSQL** utilizando o bucket exato criado no Cloud Storage.

---

## 📋 Passo a Passo de Execução no Cloud Shell (`@cloudshell`)

### 1. Criar a variável com o nome do bucket recém-criado:
```bash
BUCKET_NAME="cdc-temp-backup-1785337279"
```

### 2. Conceder Permissão de Escrita para a Service Account do Cloud SQL:
```bash
gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME --member="serviceAccount:$(gcloud sql instances describe postgres-cdc --format='value(serviceAccountEmailAddress)')" --role="roles/storage.objectAdmin"
```

### 3. Executar a Exportação Nativa do Banco `postgres`:
```bash
gcloud sql export sql postgres-cdc gs://$BUCKET_NAME/backup_site_cdc_20260729.sql --database=postgres
```

### 4. Copiar o Backup do Bucket para o Cloud Shell:
```bash
gcloud storage cp gs://$BUCKET_NAME/backup_site_cdc_20260729.sql ~/backup_site_cdc_20260729.sql
```

### 5. Verificar o Tamanho do Backup Gerado:
```bash
ls -lh ~/backup_site_cdc_20260729.sql
```
