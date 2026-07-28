# 🔍 Playbook do Inquérito de Produção (`prod1` — `136.113.22.112`)

Este documento serve como o manual oficial de execução do inquérito de auditoria, diagnóstico de serviços e backup na máquina virtual de produção `prod1`.

---

## 📋 Sequência de Comandos do Inquérito

### 🔹 Fase 1: Mapeamento de Containers Docker & Backup do MariaDB

#### 1. Listar todos os containers ativos e parados:
```bash
sudo docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
```

#### 2. Gerar Backup Completo do Banco MariaDB (ERPNext / Estoque):
```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

#### 3. Verificar a criação e o tamanho do arquivo `.sql`:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```

---

### 🔹 Fase 2: Mapeamento de Domínios, SSL e Proxy Reverso

#### 4. Exibir as rotas e domínios no arquivo Caddyfile:
```bash
sudo cat /etc/caddy/Caddyfile
```

---

### 🔹 Fase 3: Varredura de Segredos, Chaves `.json` e Arquivos `.env`

#### 5. Localizar arquivos de configuração ocultos e credenciais no servidor:
```bash
sudo find /home /opt /var/www -maxdepth 4 \( -name ".env*" -o -name "*chave*.json" -o -name "*credential*.json" \) 2>/dev/null
```

---

### 🔹 Fase 4: Diagnóstico de Recursos de Hardware

#### 6. Verificar uso de RAM e espaço em disco:
```bash
free -h && df -h
```
