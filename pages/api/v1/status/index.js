import database from "infra/database.js";

async function status(request, response) {
  const dateNow = new Date().toISOString();

  //Faz a query e recebe as informações de versão
  const databaseVersionResponse = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResponse.rows[0].server_version;

  //Faz a query e recebe as informações de max_connections depois de tratar
  const databaseMaxConnectionsResponse = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResponse.rows[0].max_connections;

  //Faz a query e recebe as informações de connections ativas
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpendConnectionsResponse = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const userConnectionsRows = databaseOpendConnectionsResponse.rows[0].count;

  response.status(200).json({
    updated_at: dateNow,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opend_connections: userConnectionsRows,
      },
    },
  });
}

export default status;
