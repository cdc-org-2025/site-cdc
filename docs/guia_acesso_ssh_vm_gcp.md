# 🛡️ Guia de Conexão com Usuário Específico (`kleberdev97@`)

A chave pública salva na GCP Console (`kleberdev97@gmail.com`) está vinculada ao usuário Linux **`kleberdev97`**.

Por isso, ao conectar via SSH, é **obrigatório incluir o nome de usuário `kleberdev97@`** antes do IP. Caso contrário, o cliente SSH usará por padrão o usuário `gt_transformadigital` e retornará `Permission denied (publickey)`.

---

## 📋 Comandos Corretos de Conexão (Especificando o Usuário)

### No PowerShell (Sua Máquina Local):
```powershell
ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@136.113.22.112
```

### No Cloud Shell (Navegador GCP):
```bash
ssh kleberdev97@136.113.22.112
```

Ou usando o comando `gcloud` com o usuário explícito e a zona `us-east1-c`:
```bash
gcloud compute ssh kleberdev97@prod1 --zone=us-east1-c
```

---

## 🚀 Comando de Backup após Conectar (`kleberdev97@prod1`)

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

Verificar backup criado:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
