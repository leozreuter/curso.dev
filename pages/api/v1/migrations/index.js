import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const deafultMigrationsOptions = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    dryRun: false,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  // Caso o metodo seja POST mostra e executa as migrações
  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...deafultMigrationsOptions,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  // Caso for GET, mostra as migrações pendentes
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...deafultMigrationsOptions,
      dryRun: true,
    });

    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  return response.status(405).end();
}
