# 🛡️ Guia de Dump do Banco PostgreSQL `postgres-cdc` sem Pedir Senha

Este guia descreve como contornar o pedido de senha do `pg_dumpall` no Cloud SQL utilizando o comando nativo `gcloud sql export` ou definindo uma nova senha para o usuário `postgres` sem interromper a aplicação.

---

## 📋 Método 1: Exportação Nativa via GCP (Sem Pedir Senha)

Como o `gcloud sql export` roda com as credenciais do próprio Google Cloud Shell, ele não exige a senha do usuário do banco:

### 1. Criar um bucket temporário no Cloud Storage (São Paulo):
```bash
gcloud storage buckets create gs://cdc-backup-temp-$(date +%s) --location=southamerica-east1
```

### 2. Conceder permissão de escrita para a Service Account do Cloud SQL:
```bash
# Obter o e-mail da Service Account do Cloud SQL:
SA_EMAIL=$(gcloud sql instances describe postgres-cdc --format="value(serviceAccountEmailAddress)")

# Dar permissão no bucket:
gcloud storage buckets add-iam-policy-binding gs://cdc-backup-temp-* --member="serviceAccount:$SA_EMAIL" --role="roles/storage.objectAdmin"
```

### 3. Exportar a base `postgres`:
```bash
gcloud sql export sql postgres-cdc gs://cdc-backup-temp-*/backup_site_cdc_20260729.sql --database=postgres
```

### 4. Copiar o arquivo `.sql` do bucket para o Cloud Shell:
```bash
gcloud storage cp gs://cdc-backup-temp-*/backup_site_cdc_20260729.sql ~/backup_site_cdc_20260729.sql
```

---

## 📋 Método 2: Definir Senha do Usuário `postgres` (Não reinicia o banco!)

Você pode definir uma senha para o usuário `postgres` via CLI sem afetar a produção:

```bash
# 1. Definir a senha nova:
gcloud sql users set-password postgres --instance=postgres-cdc --password=MinhaSenhaCDC2026!

# 2. Executar o pg_dumpall (informando a senha definida):
pg_dumpall -h 127.0.0.1 -p 5433 -U postgres > ~/backup_site_cdc_20260729.sql
```
