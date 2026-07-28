# 🛠️ Guia de Solução de Problemas (Troubleshooting)

Este documento registra soluções para erros comuns de infraestrutura, SSH e ambiente do projeto **site-cdc**.

---

## 🔒 1. Erro de Permissões no Arquivo de Chave SSH (`UNPROTECTED PRIVATE KEY FILE`)

### **Sintoma / Erro:**
```text
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions for 'C:\Users\kleber.fanini\.ssh\id_ed25519' are too open.
Load key "C:\Users\kleber.fanini\.ssh\id_ed25519": bad permissions
kleberdev97@136.113.22.112: Permission denied (publickey).
```

### **Causa:**
No Windows, o cliente OpenSSH recusa chaves privadas cujo arquivo de licença de acesso (ACL do NTFS) permita leitura por outros usuários ou grupos da máquina além do dono.

### **Solução no PowerShell:**
Execute os dois comandos abaixo no PowerShell para remover a herança de permissões e conceder controle exclusivo ao seu usuário:

```powershell
# 1. Remover herança de permissões de outros usuários
icacls "$env:USERPROFILE\.ssh\id_ed25519" /inheritance:r

# 2. Conceder controle total exclusivo ao usuário atual
icacls "$env:USERPROFILE\.ssh\id_ed25519" /grant:r "$($env:USERNAME):(F)"
```

Após executar estes comandos, a conexão `ssh -i C:\Users\kleber.fanini\.ssh\id_ed25519 kleberdev97@136.113.22.112` funcionará sem erros.
