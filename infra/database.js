import { Client } from "pg";

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.PROSTGRES_PORT,
        user: process.env.PROSTGRES_USER,
        database: process.env.PROSTGRES_DB,
        password: process.env.PROSTGRES_PASSWORD,
    })
    await client.connect()
    const result = await client.query(queryObject)
    client.end()

    return result
}

export default {
    query
}