# 🛡️ Guia de Execução via Terminal Web da GCP (Instância `Prod1`)

Como o acesso ao terminal web do navegador (Cloud SSH) já está ativo na VM `Prod1` (`136.113.22.112`), podemos realizar todas as operações de auditoria, backup e extração de dados diretamente por ele com privilégios `sudo`.

---

## 📋 Roteiro de Comandos para Executar no Terminal Web da GCP

### 1. Backup Completo do Banco MariaDB (`estoque.cdc.org.br`)

Gera um dump completo em arquivo `.sql` de todos os dados do ERPNext direto do container MariaDB:

```bash
sudo docker exec frappe_docker-db-1 mariadb-dump -u root -p$(sudo docker exec frappe_docker-db-1 printenv MYSQL_ROOT_PASSWORD) --all-databases > ~/backup_mariadb_estoque_$(date +%Y%m%d).sql
```

Verificar se o arquivo de backup foi gerado com sucesso:
```bash
ls -lh ~/backup_mariadb_estoque_*.sql
```

---

### 2. Localizar Arquivos de Configuração e Segredos (`.env`)

Busca todos os arquivos de ambiente e chaves ocultas no servidor:

```bash
sudo find /home /opt /var/www -maxdepth 3 \( -name ".env*" -o -name "*chave*.json" \) 2>/dev/null
```

---

### 3. Verificar Configurações do Proxy Caddy & Domínios

```bash
sudo cat /etc/caddy/Caddyfile
```

---

### 4. Verificar Espaço em Disco e Memória Livre

```bash
df -h && free -h
```
