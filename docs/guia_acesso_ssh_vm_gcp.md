# 🛡️ Guia Passo a Passo: Acesso SSH Seguro à VM `Prod1` (GCP)

Este guia orienta a adição da chave SSH no console da GCP e o primeiro acesso à instância VM `Prod1` sem risco de interrupção dos serviços.

---

## 1. Segurança & Garantia de Não-Interrupção

> [!IMPORTANT]
> **Adicionar uma chave SSH no GCP Console NÃO reinicia a máquina nem afeta os serviços em execução.**  
> O agente do Compute Engine apenas insere a chave pública no arquivo `authorized_keys` do usuário Linux correspondente. É uma operação 100% segura e a quente (hot-add).

---

## 2. Método Recomendado: Adição via Terminal Web do GCP Console (Cloud SSH)

Se ao editar a VM no console o acesso direto via SSH local falhar, você pode adicionar a chave diretamente pelo terminal web do GCP:

1. Na lista de VMs no console da GCP, ao lado da VM `Prod1`, clique no botão **SSH** (Abrir na janela do navegador).
2. Assim que o terminal abrir no navegador, cole o seguinte comando completo de uma linha:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGJ2oNi2SmsGSqewI5f1hFf9g9nVLb1jhe3br9nhyctR kleberdev97@gmail.com" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
```

3. Pressione **Enter**.
4. Pronto! A chave estará registrada em `~/.ssh/authorized_keys` com as permissões corretas (`chmod 600`).

---

## 3. Conectando via Terminal Local (PowerShell)

Após executar o comando acima no terminal web do GCP, abra o PowerShell da sua máquina local e conecte-se:

```bash
ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@136.113.22.112
```

---

## 4. Primeiros Comandos de Inquérito ao Entrar na VM `Prod1`

```bash
# 1. Verificar os containers em execução (se usar Docker)
docker ps

# 2. Verificar o uso de memória e disco
free -h && df -h

# 3. Localizar arquivos de configuração/variáveis
ls -la /opt /var/www /home/$USER
```
