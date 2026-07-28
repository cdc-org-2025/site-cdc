# 🛡️ Guia Passo a Passo: Acesso SSH Seguro à VM `Prod1` (GCP)

Este guia orienta a adição da chave SSH no console da GCP e o primeiro acesso à instância VM `Prod1` sem risco de interrupção dos serviços.

---

## 1. Segurança & Garantia de Não-Interrupção

> [!IMPORTANT]
> **Adicionar uma chave SSH no GCP Console NÃO reinicia a máquina nem afeta os serviços em execução.**  
> O agente do Compute Engine apenas insere a chave pública no arquivo `authorized_keys` do usuário Linux correspondente. É uma operação 100% segura e a quente (hot-add).

---

## 2. Passo a Passo no Console GCP (Instância `Prod1`)

1. No console do Google Cloud, acesse: **Compute Engine ➔ Instâncias de VM**.
2. Clique no nome da VM: **`Prod1`**.
3. No menu superior, clique em **Editar** (ícone de lápis ✏️).
4. Role a página até a seção **Chaves SSH** (SSH Keys).
5. Clique no botão **Adicionar Item** (+ Add Item).
6. Cole a **chave pública SSH** gerada previamente:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGJ2oNi2SmsGSqewI5f1hFf9g9nVLb1jhe3br9nhyctR kleberdev97@gmail.com
```

7. Observe que o GCP identificará o usuário Linux (ex: `kleberdev97` ou `kleberdev97_gmail_com`).
8. Role até o final da página e clique em **Salvar** (Save).
9. Aguarde alguns segundos até o aviso de alteração concluída.

---

## 3. Conectando via Terminal Local

Após salvar no GCP Console, execute o comando no terminal (substituindo `<IP_DA_VM>` pelo IP público que você copiou):

```bash
ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@<IP_DA_VM>
```

*(Se o usuário criado na VM pelo GCP for `kleberdev97_gmail_com` ou outro nome indicado na tela de edição do GCP, use o nome exato exibido ao lado da chave).*

---

## 4. Primeiros Comandos de Inquérito ao Entrar na VM `Prod1`

Assim que se conectar à máquina, execute estes 4 comandos seguros de diagnóstico:

```bash
# 1. Verificar os containers em execução (se usar Docker)
docker ps

# 2. Verificar processos Node.js / PM2 (se usar PM2)
pm2 list || ps aux | grep node

# 3. Verificar o uso de memória e disco
free -h && df -h

# 4. Localizar arquivos de configuração/variáveis
ls -la /opt /var/www /home/$USER
```
