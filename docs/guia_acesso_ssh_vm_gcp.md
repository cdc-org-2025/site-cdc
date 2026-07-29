# 🛡️ Guia de Conexão na VM GCP (`34.151.249.199`)

Este guia orienta a localização e o acesso à VM oficial do projeto com o IP atualizado **`34.151.249.199`**.

---

## 📋 Como Conectar na VM Oficial (`34.151.249.199`)

### 🔹 Passo 1: No Cloud Shell (`@cloudshell`), identifique a VM correspondente ao IP
```bash
gcloud compute instances list --format="table(name,zone,status,EXTERNAL_IP)"
```

Este comando listará a tabela com o nome exato da VM e sua zona (ex: `site-vm`, `prod-site` ou `site-cdc`).

---

### 🔹 Passo 2: Conectar via gcloud SSH
Após obter o nome e a zona da VM na tabela:

```bash
gcloud compute ssh NOME_DA_VM --zone=ZONA_DA_VM
```

---

### 🔹 Passo 3: Conexão Direta por IP (No PowerShell Local)
Garantindo que a porta 22 esteja aberta e a chave esteja salva na VM:

```powershell
ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@34.151.249.199
```
