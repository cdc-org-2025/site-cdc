# 🐳 Mapeamento Oficial de Containers Docker & Playbook de Backup (`prod1`)

Este documento consolida o mapeamento exato dos 9 containers ativos no servidor de produção `prod1` (`136.113.22.112`) e o passo a passo para execução do backup.

---

## 📊 1. Mapeamento de Containers Docker no Servidor `prod1`

| ID do Container | Nome Oficial (`Names`) | Imagem (`Image`) | Estado (`Status`) | Porta Exposta | Função no Sistema |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `6b05f9afa6d6` | **`frappe_docker-db-1`** | `mariadb:10.6` | Up (healthy) | `3306/tcp` | 🗄️ **Banco de Dados MariaDB (Estoque/ERPNext)** |
| `ff7fde4bc64d` | **`frappe_docker-frontend-1`** | `frappe/erpnext:v15.88.1` | Up | `8080/tcp` | 🌐 Servidor Web Frontend (Nginx/bench) |
| `3bb8b5fff306` | **`frappe_docker-backend-1`** | `frappe/erpnext:v15.88.1` | Up | — | ⚙️ Backend e Regras de Negócio Python/bench |
| `f93b0d6a4ef6` | **`frappe_docker-websocket-1`** | `frappe/erpnext:v15.88.1` | Up | — | 🔌 WebSockets Socket.io em Tempo Real |
| `b13da1b28349` | **`frappe_docker-scheduler-1`** | `frappe/erpnext:v15.88.1` | Up | — | ⏱️ Agendador de Tarefas em Segundo Plano |
| `2309ad46aae3` | **`frappe_docker-queue-short-1`** | `frappe/erpnext:v15.88.1` | Up | — | 📥 Fila de Processamento Curto |
| `3a6914a24910` | **`frappe_docker-queue-long-1`** | `frappe/erpnext:v15.88.1` | Up | — | 📥 Fila de Processamento Longo |
| `e4925b333921` | **`frappe_docker-redis-queue-1`** | `redis:6.2-alpine` | Up | `6379/tcp` | 🔴 Cache de Filas Redis |
| `b368ede81a16` | **`frappe_docker-redis-cache-1`** | `redis:6.2-alpine` | Up | `6379/tcp` | 🔴 Cache de Sistema Redis |

---

## 🛠️ 2. Entendendo por que o backup deu 0 bytes no Cloud Shell

No Cloud Shell (`gt_transformadigital@cloudshell:~`), você está em uma VM de gerenciamento do Google Cloud. Como o container **`frappe_docker-db-1`** fica dentro da VM **`prod1`**, tentar rodar o comando direto no Cloud Shell cria um arquivo de 0 bytes.

---

## 🚀 3. Passo a Passo para Entrar na VM `prod1` e Gerar o Backup

### Passo A: Conectar na VM `prod1`
No seu terminal do Cloud Shell, digite:
```bash
gcloud compute ssh kleberdev97@prod1 --zone=us-east1-c
```
*(O prompt do terminal mudará de `@cloudshell` para `kleberdev97@prod1:`).*

### Passo B: Gerar o Backup Válido dentro da VM `prod1`
```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

### Passo C: Verificar o Tamanho do Backup
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
*(Desta vez o arquivo terá um tamanho real em Megabytes, ex: `15M` ou `45M`).*
