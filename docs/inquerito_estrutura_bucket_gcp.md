# 📂 Inquérito de Estrutura do Bucket GCP (`cdc-site`)

> **Status:** Mapeamento de Pastas do Storage Concluído | Análise de Riscos & Compliance LGPD  
> **Data:** 29 de Julho de 2026  

---

## 📊 1. Mapeamento das 14 Pastas Encontradas no Bucket

Cruzamos a imagem enviada com a estrutura de tabelas do banco de dados relacional (`site_cdc_db`):

| Pasta no Bucket GCP | Tabela Relacionada | Conteúdo Provável | Nível de Prioridade do Inquérito | Justificativa / Risco |
| :--- | :--- | :--- | :--- | :--- |
| **`dados_bancarios/`** | `dados_bancarios` | QRCodes PIX, logos de bancos ou comprovantes | 🔴 **CRÍTICA (Segurança)** | Pode conter dados sensíveis bancários da ONG ou de doadores. |
| **`transparencia/`** | `transparencia` | Relatórios Anuais, Balanços, DREs, PDFs de Prestação de Contas | 🔴 **CRÍTICA (Legal/MROSC)** | Documentos de conformidade pública e compliance jurídico da ONG. |
| **`colaboradores/`** | `lideranca`, `inscricoes_oportunidades` | Fotos de diretoria ou **Currículos (PDF/DOCX)** de candidatos | 🟡 **ALTA (LGPD)** | Candidaturas do "Trabalhe Conosco" podem conter CPF, RG e telefones. |
| **`publicacao/`** | `publicacao`, `publicacao_imagens` | Livros, Cartilhas, Artigos e Relatórios em PDF | 🟡 **ALTA (Conteúdo)** | Acervo intelectual e materiais educativos da instituição. |
| **`editor-images/`** | Notícias/Programas (Rich Text) | Imagens enviadas via Editor HTML (AdminJS) | 🟢 **MÉDIA** | Imagens incorporadas no corpo do texto das matérias. |
| **`testes/`** | Nenhuma (Residual) | Arquivos temporários de desenvolvimento antigo | 🟢 **MÉDIA (Limpeza)** | Arquivos descartáveis para não ocupar espaço desnecessário na VPS. |
| **`banners/`** | `capa` | Imagens do Carrossel da Home | 🔵 **OPERACIONAL** | Mídia visual da interface principal. |
| **`cards/`** | `card_informativo` | Imagens de destaques / cards institucionais | 🔵 **OPERACIONAL** | Mídia visual da interface. |
| **`linha_do_tempos/`** | `linha_do_tempo_imagens` | Fotos históricas da linha do tempo da ONG | 🔵 **OPERACIONAL** | Mídia visual da história da ONG. |
| **`noticias/`** | `noticias`, `noticias_imagens` | Imagens de capa e galerias das notícias | 🔵 **OPERACIONAL** | Mídia visual do portal de notícias. |
| **`organizacao/`** | `organizacao`, `organizacao_imagens` | Fotos de infraestrutura e sobre a ONG | 🔵 **OPERACIONAL** | Mídia visual sobre a ONG. |
| **`parceiros/`** | `parceiro` | Logotipos das empresas e apoiadores | 🔵 **OPERACIONAL** | Mídia visual dos parceiros. |
| **`programa/`** | `programas`, `programa_imagens` | Fotos dos projetos sociais ativos | 🔵 **OPERACIONAL** | Mídia visual dos projetos. |
| **`uploads/`** | Raiz de uploads genericos | Uploads diretos do sistema | 🔵 **OPERACIONAL** | Mídia visual genérica. |

---

## 🚨 2. As 4 Pastas que EXIGEM Inquérito Detalhado Imediato

### 1. `dados_bancarios/` (Prioridade 🔴)
- **O que investigar**: Verificar se além das imagens de logotipos dos bancos há comprovantes de transferências bancárias ou documentos sigilosos armazenados no bucket público da GCP.

### 2. `transparencia/` (Prioridade 🔴)
- **O que investigar**: Validar se todos os **Relatórios Fiscais, DREs e Balanços Patrimoniais em PDF** estão íntegros. A perda destes documentos afeta a transparência pública da ONG perante órgãos reguladores.

### 3. `colaboradores/` (Prioridade 🟡)
- **O que investigar**: Verificar se a pasta contém currículos em PDF/DOCX de candidatos que se aplicaram às vagas. Sob a **LGPD (Lei Geral de Proteção de Dados)**, esses documentos não podem ficar em buckets públicos sem controle de acesso.

### 4. `testes/` (Prioridade 🟢)
- **O que investigar**: Avaliar a quantidade de megabytes/gigabytes dessa pasta para **eliminar resíduos** antes da migração final para a Hostinger VPS.
