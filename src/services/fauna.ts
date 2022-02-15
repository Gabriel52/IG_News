import { Client } from 'faunadb'

// Não fazer as requisições do banco no lado do cliente
//apenas no lado do servidor
export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
    domain: "db.us.fauna.com"
})
