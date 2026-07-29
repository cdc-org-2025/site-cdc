# 🛡️ Guia de Dump do Banco de Dados PostgreSQL & Montagem do Lab Local

Este guia orienta o procedimento passo a passo para extrair o backup em formato `.sql` do banco de dados do **Site (`cdc.org.br`)** direto do Cloud Shell e importá-lo no seu ambiente de laboratório local com máxima segurança.

---

## 📋 PASSO 1: No Cloud Shell do Google Cloud (`@cloudshell`)

### 1. Listar a instância de banco de dados do Cloud SQL:
Execute o comando abaixo para identificar o nome exato da instância PostgreSQL do site:

```bash
gcloud sql instances list
```

---

### 2. Exportar o Dump do Banco PostgreSQL

#### Opção A (Via Comando `gcloud sql export`):
```bash
# Substitua INSTANCIA pelo nome exibido no Passo 1 e BANCO pelo nome do banco (ex: site_cdc ou ong-cdc)
gcloud sql export sql INSTANCIA gs://backup_temp_cdc/backup_site_cdc_$(date +%Y%m%d).sql --database=BANCO
```

#### Opção B (Via Cloud SQL Auth Proxy + `pg_dump` no Cloud Shell):
O Cloud Shell já possui o `cloud-sql-proxy` nativo. Execute:

```bash
# 1. Obter a Connection Name da instância:
CONNECTION_NAME=$(gcloud sql instances describe INSTANCIA --format="value(connectionName)")

# 2. Iniciar o proxy em segundo plano:
cloud-sql-proxy $CONNECTION_NAME --port 5433 &

# 3. Gerar o dump PostgreSQL:
pg_dump -h 127.0.0.1 -p 5433 -U cdc_user -d site_cdc_db > ~/backup_site_cdc_$(date +%Y%m%d).sql
```

---

## 📥 PASSO 2: Baixar o Arquivo `.sql` para a Sua Máquina Local

O Google Cloud Shell possui uma função nativa de download sem necessidade de comandos complexos:

1. No canto superior direito da janela do **Cloud Shell**, clique no ícone de **Três Pontos (⋮)** ou no botão **Mais**.
2. Clique na opção **Fazer Download de Arquivo** (Download file).
3. No campo do caminho, digite: `backup_site_cdc_20260729.sql` (ou o nome do arquivo gerado no Passo 1).
4. Clique em **Download**. O arquivo será salvo diretamente na pasta de Downloads do seu computador!

---

## 🐳 PASSO 3: Importar o Backup no Laboratório Local (Docker)

Após o download ser concluído na sua máquina Windows:

1. Mova o arquivo `.sql` baixado para a pasta do repositório: `C:\Códigos\site-cdc\backup_site_cdc.sql`.
2. Garanta que o container PostgreSQL local esteja em execução (`docker compose up -d postgres`).
3. Execute o comando de restauração no terminal local (PowerShell):

```powershell
docker exec -i site_cdc_postgres psql -U cdc_user -d site_cdc_db < C:\Códigos\site-cdc\backup_site_cdc.sql
```
