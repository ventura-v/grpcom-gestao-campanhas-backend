test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)

    const responseBody = await response.json()

    //verificando se o valor passado para a data é válido
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

    //verificando a versão do banco de dados
    expect(responseBody.dependecies.database.version).toEqual("17.2")

    //verificando a quantidade máxima de conexões
    expect(responseBody.dependecies.database.max_connections).toEqual(100)

    //verificando se a quantidade de conexões ativas é igual a 1 (se for maior, provavelmente é algum vazamento)  
    expect(responseBody.dependecies.database.opened_connections).toEqual(1)
})