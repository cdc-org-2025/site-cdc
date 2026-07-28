# 🛡️ Guia de Conexão: Local (PowerShell) vs Cloud Shell (GCP Browser)

Este guia esclarece por que a chave `id_ed25519` está armazenada no seu computador local e como utilizar cada terminal corretamente.

---

## 🔍 Onde está a sua Chave SSH `id_ed25519`?

- A sua chave privada `id_ed25519` foi criada na sua **máquina local (Windows)** em `C:\Users\kleber.fanini\.ssh\id_ed25519`.
- O **Cloud Shell** (navegador do GCP) é uma máquina virtual à parte no Google e não possui o arquivo `id_ed25519` da sua máquina local.

---

## 📋 Como Conectar em Cada Ambiente

### 1. Na sua máquina local (PowerShell):
Como a chave `id_ed25519` está nesta máquina, rode:

```powershell
ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@136.113.22.112
```

---

### 2. No Cloud Shell (Navegador GCP):
Como o Cloud Shell utiliza o gerenciador automático de chaves do `gcloud`, rode:

```bash
gcloud compute ssh kleberdev97@prod1 --zone=us-east1-c
```

*(Ao executar este comando, o `gcloud` criará automaticamente o par de chaves do Cloud Shell para o usuário `kleberdev97` e realizará a conexão direta).*

---

## 🚀 Executando o Backup do Banco MariaDB

Após se conectar (prompt `@prod1`):

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

E verifique o backup criado:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
