# ❓ FAQ & Dúvidas Frequentes: Reinício do Cloud SQL (`postgres-cdc`)

---

## 1. Qual o impacto de reiniciar o banco de dados Cloud SQL?

### Impactos de um Reinício (Restart):
- **Indisponibilidade Temporária (Downtime)**: O site (`cdc.org.br`), a API Backend e o Painel Admin ficarão indisponíveis por cerca de **1 a 3 minutos** enquanto o PostgreSQL é reinicializado.
- **Conexões Encerradas**: Todas as conexões ativas do Cloud Run serão encerradas e reestabelecidas automaticamente assim que o banco voltar a ficar `RUNNABLE`.
- **Integridade dos Dados**: **Nenhum dado é perdido.** O PostgreSQL realiza o flush do Write-Ahead Log (WAL) com segurança durante a reinicialização graciosa.

> [!IMPORTANT]
> **Definir a senha do usuário `postgres` NÃO requer reinício do banco!**  
> O comando `gcloud sql users set-password` aplica a alteração de senha na memória em menos de 2 segundos, **sem qualquer queda de serviço ou downtime no site**.

---

## 2. O IP público (`35.198.13.35`) é resetado ao reiniciar?

### Resposta: **NÃO. O IP NÃO muda!**

No GCP Cloud SQL, o IP público atribuído à instância (`35.198.13.35`) é um **IP Estático Reservado** associado ao recurso. Ele permanece o mesmo durante:
- Reinicializações manuais (`restart`).
- Janelas de manutenção automática da GCP.
- Alterações de senhas, memória ou CPU.
- Paradas e inicializações.

 O IP público só deixaria de existir caso a instância inteira fosse deletada permanentemente no console da GCP.
