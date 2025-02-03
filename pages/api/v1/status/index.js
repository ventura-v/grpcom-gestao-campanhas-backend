const database = require("../../../../infra/database")

async function status(req, res) {
    const updatedAt = new Date().toISOString()

    // Query para pegar a versão do banco de dados
    const databaseVersionResult = await database.query("SHOW server_version;")
    const databaseVersionValue = databaseVersionResult.rows[0].server_version

    // Query para pegar a quantidade máxima de conexões
    const databaseMaxConnectionsResult = await database.query("SHOW max_connections;")
    const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections

    // Query para pegar a quantidade de conexões ativas
    const databaseName = process.env.POSTGRES_DB
    const databaseOpenedConnectionsResult = await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName],
    })
    const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count

    res.status(200).json({
        updated_at: updatedAt,
        dependecies: {
            database: {
                version: databaseVersionValue,
                max_connections: +databaseMaxConnectionsValue,
                opened_connections: databaseOpenedConnectionsValue,
            },
        },
    })
}

module.exports = status