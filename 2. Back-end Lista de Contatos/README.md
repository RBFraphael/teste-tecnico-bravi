# 2. Back-end Lista de Contatos


### Proposta
Crie uma API REST que armazenará pessoas e seus contatos. Uma pessoa pode ter vários contatos como: telefone, e-mail ou whatsapp. A API deve permitir criar, atualizar, obter e excluir as pessoas e os contatos.

---

### Solução

Back-end desenvolvido em formato de API Rest, utlizando o Repository Pattern comumente conhecido no ecossistema Laravel. Foram utilizados recursos nativos da framework (como models, seeders, migrations, controllers etc) para desenvolvimento da maioria das funcionalidades, e utilizado o pacote complementar [tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth) para gerenciamento de autenticação com tokens JWT.

Feito o clone do repositório, é necessário executar o comando `php artisan jwt:secret` para gerar a chave de segurança dos tokens JWT, assim como o comando `php artisan migrate:fresh --seed` para, após devida configuração, construir o banco de dados com suas tabelas e relacionamentos, e pré-popular com o usuário de testes.

Foi utilizado banco de dados SQLite **somente para fins de praticidade, facilitando a validação do teste técnico sem a necessidade de configurar um banco de dados real**, sendo altamente recomendada a utilização de um banco de dados relacional (como MySQL ou PostgreSQL) ao hospedar a aplicação em um servidor real.

A aplicação está hospedada no link https://api.bravi.rbfraphael.com.br/ para fins de teste.

Foi disponibilizada uma collection para a aplicação [Postman](https://www.postman.com/) com todos os endpoints disponíveis e exemplos de uso.