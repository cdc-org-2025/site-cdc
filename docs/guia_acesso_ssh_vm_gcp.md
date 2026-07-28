# 🛡️ Guia de Diferenciação: Cloud Shell vs VM `Prod1`

Ao utilizar o terminal do Google Cloud, é importante entender a diferença entre o **Google Cloud Shell** e a **VM de Produção `Prod1`**:

- **`cloudshell`** (`gt_transformadigital@cloudshell`): É o terminal temporário de gerenciamento do Google Cloud. Os containers Docker do site **não** ficam aqui.
- **`Prod1`** (`gt_transformadigital@prod1` ou `kleberdev97@prod1`): É a máquina virtual real (`136.113.22.112`) onde o ERPNext, MariaDB e Caddy estão rodando em containers Docker.

---

## 📋 Como Conectar na VM `Prod1` a partir do Cloud Shell

Se você está na tela do **Cloud Shell** (`@cloudshell`), execute este comando para saltar direto para a VM `Prod1`:

```bash
gcloud compute ssh Prod1
```

*(Se o GCP perguntar a zona, pressione Enter ou confirme a zona padronizada, ex: `southamerica-east1-a`).*

---

## 🚀 Comandos para Executar Dentro da VM `Prod1` (`@prod1`)

Assim que o prompt mudar para `@prod1`, execute o comando de backup:

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

E confirme a criação do arquivo de backup:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```
