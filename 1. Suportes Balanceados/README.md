# 1. Suportes Balanceados


### Proposta
Escreva uma função que receba uma string de colchetes como entrada e determine se a ordem dos parênteses é válida. Um colchete é considerado qualquer um dos seguintes caracteres: (, ), {, }, [, ou ].

Dizemos que uma sequência de colchetes é válida se as seguintes condições forem atendidas:

- Não contém colchetes sem correspondência.
- O subconjunto de colchetes dentro dos limites de um par de colchetes correspondente é também um par de colchetes.

Exemplos:
- `(){}[]` é válido
- `[{()}](){}` é válido
- `[]{()` não é válido
- `[{)]` não é válido

---

### Solução

Foi desenvolvida uma lógica de validação de uma string utilizando uma stack (um array) de controle. O algoritmo itera por cada caractere da string, e, quando encontra um caractere de abertura (`(`, `{` ou `[`), adiciona esse caractere à pilha, e, quando encontra um caractere de fechamento (`)`, `}` ou `]`), verifica se o último caractere da pilha é o caractere de abertura correspondente ao caractere de fechamento encontrado. Se o último caractere da pilha conferir, este é removido da pilha, caso contrário o algoritmo acusa string inválida. Ao término do algoritmo, após iterar sobre todos os caracteres da string, se a pilha estiver vazia (length = 0), a string é considerava válida, pois não há caracteres de abertura ou fechamento sem correspondente. Caso contrário (length > 0), a string é considerada inválida pois possui um ou mais caracteres de abertura e/ou fechamento sem correspondente.

O algoritmo foi implementado em JavaScript, TypeScript e PHP.