import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "{$request.method}" not allowed`,
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const deafultMigrationsOptions = {
      dbClient: dbClient,
      dir: resolve("infra", "migrations"),
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

      return response.status(200).json(pendingMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
