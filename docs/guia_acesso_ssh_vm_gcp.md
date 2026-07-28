# 🛡️ Guia de Diagnóstico de Erros de Conexão no Cloud Shell

Este documento explica os motivos dos erros de conexão SSH ocorridos no Cloud Shell e como resolvê-los de forma definitiva.

---

## 🔍 Explicação Técnica dos Motivos

### Motivo do Erro 1 (`Permission denied (publickey)` no `ssh 136.113.22.112`):
- Ao rodar `ssh 136.113.22.112` direto no Cloud Shell, o SSH tenta logar como `gt_transformadigital` (o usuário do Cloud Shell).
- A VM de produção não possui a chave SSH pública do Cloud Shell cadastrada para o usuário `gt_transformadigital`.

### Motivo do Erro 2 (`resource ... was not found` no `gcloud compute ssh`):
- A VM `Prod1` está alocada na zona **`us-east1-c`** (Estados Unidos), e não em `southamerica-east1-a`.

---

## 📋 Solução Definitiva (Em 2 Passos no Cloud Shell)

### Passo 1: Listar as instâncias para obter a zona exata
```bash
gcloud compute instances list
```

### Passo 2: Conectar na VM informando a zona correta (`us-east1-c`)
```bash
gcloud compute ssh prod1 --zone=us-east1-c
```
*(O `gcloud` irá gerar e injetar temporariamente uma chave válida e conectar automaticamente).*

---

## 🚀 Executando o Backup dentro da VM `prod1`

Após se conectar (quando o prompt exibir `gt_transformadigital@prod1:`):

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

Confirmar a geração do arquivo:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
