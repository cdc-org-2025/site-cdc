

## ✍🏻 Padronização de commits 

- Cada commit deve ter uma mensagem de commit clara e concisa.
- A mensagem não deve iniciar com letra maiuscula.
- A mensagem de commit não pode ser maior que 100 caracteres ou menor que 10.
- Formato correto: -type-(scope): -subject-(message)
- exemplo: docs: atualiza o README com link para a nova documentação

type:
    
    feat     Adição de funcionalidade.
    fix      Correção de defeito.
    docs     Mudança em documentação.
    style    Mudança de formatação ou estilo, que não afeta a execução do código (espaço, tabulação, etc).
    refactor Mudança na organização do código, que não afeta o comportamento existente.
    test     Adição ou mudança de um teste.
    chore    Adição ou mudança em script de build, que não afeta o código de produção.
    perf     Mudança de código para melhoria de desempenho.
    ci       Mudança de configuração de integração contínua.
    build    Mudança em arquivos de build ou em dependências externas.
    temp     Commit temporário, que não deve ser incluído no CHANGELOG.
    
    scope:
        Opcional, pode ser qualquer coisa que especifique o escopo da mudança.
        Exemplos: subpacote, workspace, módulo, componente, página.

    subject:
        Breve resumo da mudança, escrito no tempo verbal presente. Começa com letra minúscula e não há ponto final.