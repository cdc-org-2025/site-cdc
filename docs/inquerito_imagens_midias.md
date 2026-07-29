# 🖼️ Inquérito de Imagens e Mídias (`site-cdc`)

> **Status:** Diagnóstico de Mídias Concluído | Mapeamento no Banco Confirmado  
> **Data:** 29 de Julho de 2026  

---

## 📊 1. Levantamento de Imagens no Banco de Dados (`backup_site_cdc_20260729.sql`)

No banco de dados restaurado (`site_cdc_db`), foram identificadas **142 referências de imagens** distribuídas entre os componentes visuais do site:

| Componente / Seção Visuai | Tabela no Banco | Quantidade de Imagens | Exemplo de Caminho no Banco |
| :--- | :--- | :--- | :--- |
| **Carrossel Principal (Home)** | `capa` | **9 imagens** | `banners/18-IMG_7339_(1).jpg` |
| **Cards de Notícias** | `noticias` | **48 imagens** | `noticias/115-WhatsApp_Image_2025-01-23...jpeg` |
| **Cards de Programas / Projetos** | `programa_imagens` | **49 imagens** | `programa/58-WhatsApp_Image_2025-01-23...jpg` |
| **Logos de Parceiros** | `parceiro` | **19 logos** | `parceiros/6-logo_(3)_(1).png` |
| **Linha do Tempo Histórica** | `linha_do_tempo_imagens` | **14 imagens** | `linha_do_tempo/14-foto.jpg` |
| **Seções Institucionais** | `organizacao_imagens` | **3 imagens** | `organizacao/3-foto.jpg` |
| **TOTAL GERAL NO BANCO** | — | **142 Imagens** | — |

---

## 🔍 2. Auditoria dos Arquivos Físicos no Laboratório Local

- **Arquivos no Banco de Dados (`.sql`)**: Todas as **142 imagens** estão 100% inseridas, cadastradas e vinculadas aos cards, notícias e carrosséis da base de dados local.
- **Arquivos Físicos na Pasta `./uploads` Local**: **0 arquivos**.

### Por que os arquivos físicos de imagem não vêm no `.sql`?
O banco de dados relacional (`postgres-cdc`) armazena os metadados, textos e caminhos lógicos das imagens. Os arquivos binários das imagens (`.jpg`, `.png`, `.webp`) ficam guardados no bucket do Google Cloud Storage chamado **`cdc-site`** (`gs://cdc-site`).

---

## 📥 3. Roteiro para Baixar todas as 142 Imagens Físicas da GCP

Para que todas as imagens apareçam nos cards e no carrossel do seu laboratório local, execute os seguintes comandos no seu **GCP Cloud Shell**:

### Passo A (No Cloud Shell do GCP):
```bash
# 1. Criar um arquivo zip com todas as imagens do bucket cdc-site:
gcloud storage cp -r gs://cdc-site ~/uploads_cdc_backup

# 2. Compactar a pasta de imagens:
cd ~
zip -r uploads_site_cdc.zip uploads_cdc_backup/
```

### Passo B (Download para o Windows):
1. No menu superior do Cloud Shell, clique em **⋮ (Mais)** ➔ **Fazer Download de Arquivo**.
2. Digite o nome do arquivo: `uploads_site_cdc.zip`.
3. Descompacte o conteúdo do arquivo `.zip` dentro da pasta local:
   `C:\Códigos\site-cdc\uploads\`

Assim que os arquivos forem descompactados na pasta `./uploads`, todas as imagens serão exibidas instantaneamente no carrossel e nos cards do seu site em `http://localhost:3000`!
