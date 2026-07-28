# 🛡️ Guia de Conexão na VM `prod1` via Cloud Shell

No Google Cloud, os nomes de instâncias na CLI `gcloud` são obrigatoriamente grafados em letras minúsculas (`prod1` em vez de `Prod1`).

---

## 📋 Opções de Conexão no Cloud Shell (`@cloudshell`)

### Opção A (Direta pelo IP):
```bash
ssh 136.113.22.112
```

### Opção B (Via gcloud CLI com nome em minúsculas):
```bash
gcloud compute ssh prod1 --zone=southamerica-east1-a
```

---

## 🚀 Execução do Backup dentro da VM `prod1`

Assim que o prompt do terminal alterar para `prod1` (`@prod1`), execute o backup do banco de dados:

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

E confirme a criação do arquivo `.sql`:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
