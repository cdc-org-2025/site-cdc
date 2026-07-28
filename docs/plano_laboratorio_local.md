# 🧪 Plano de Backup & Montagem do Laboratório Local (Lab CDC)

Este documento estabelece o roteiro para transformar os backups extraídos do servidor de produção `prod1` em um **Laboratório Local Dockerizado** para testes, auditoria e desenvolvimento sem depender da GCP.

---

## 📊 1. Status dos Backups do Sistema

| Componente | Origem / Servidor | Arquivo de Backup Gerado | Tamanho | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Banco MariaDB (Estoque / ERPNext)** | `prod1` (`frappe_docker-db-1`) | `/home/kleberdev97/backup_estoque.sql` | **124 MB** | ✅ **Gerado com Sucesso** |
| **Banco PostgreSQL (Site CDC / AdminJS)** | GCP Cloud SQL / Container | `backup_site_cdc.sql` | ~10 MB | ⏳ Em Andamento |
| **Mídias & Imagens de Upload** | `prod1` (`sites/frontend/public/files`) | `uploads_estoque.tar.gz` | ~50 MB | ⏳ Em Andamento |

---

## 🧠 2. Mapeamento das Regras de Negócio do Sistema (`estoque.cdc.org.br`)

O sistema de estoque utiliza a arquitetura padrão do **ERPNext v15 (Frappe Framework)**. As regras de negócio e estruturas de dados centrais estão concentradas nas seguintes entidades:

1. **Catálogo de Produtos (`tabItem`)**:
   - Contém os itens, insumos e patrimônios da ONG CDC, divididos por grupos (`item_group`) e unidades de medida (`stock_uom`).
2. **Locais de Armazenamento (`tabWarehouse`)**:
   - Define a estrutura hierárquica dos almoxarifados e pontos de distribuição do CDC.
3. **Movimentações de Estoque (`tabStock Entry`)**:
   - Registra saídas, doações, entradas e transferências entre almoxarifados.
4. **Livro de Razão de Estoque (`tabStock Ledger Entry`)**:
   - Tabela de auditoria imutável que registra cada movimento físico com data, hora, saldo anterior e saldo resultante.

---

## 🛠️ 3. Como Restaurar o Backup no Laboratório Local (Docker)

Com o arquivo `backup_estoque.sql` de 124 MB gerado na VM:

### Passo A: Baixar o backup da VM para a máquina local (PowerShell)
```powershell
scp -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@136.113.22.112:/home/kleberdev97/backup_estoque.sql C:\Códigos\site-cdc\backup_estoque.sql
```

### Passo B: Restaurar no container MariaDB local
```bash
docker exec -i site_cdc_postgres mariadb -u root -p<SENHA> < backup_estoque.sql
```
