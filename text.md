# Explicações

## FAUNA DB
* Utilizado par aplicações principalmente que utilizam serveless
	* Todas as operações são feitas atráves de "HTTP" (faz a requisição, escuta a requisição e fecha o servidor)
	* Protocolo que não precisa manter uma conexão aberta a todo instante
	* Diferente do postgres e mongo que precisam estabelecer uma conexão ativa

* Ambiente que não fica rodando 24 horas utiliza apenas uma conexão
* Agora o Next que roda em ambiente serveles, por  mais que o o postgres reutilize a conexao,
se torna um processo custoso para o banco de dados em si.

## Bancos que não precisam estabelecer um pull de conexão aberto
* FaunaDB - HTTP
* DynamoDB - AWS


## Comando para inicializar o stripe-cli
Ficar escutando o endpoint: stripe listen --forward-to localhost:3000/api/webhooks