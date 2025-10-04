import AsyncRetry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database.js";
import migrator from "models/migrator.js";
import user from "models/user.js";
import session from "models/session";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return AsyncRetry(fechtStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fechtStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status != 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("DROP Schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createUser(userObject) {
  const createdUser = await user.create({
    username:
      userObject.username || faker.internet.username().replace(/[-_.]/g, ""),
    email: userObject.email || faker.internet.email(),
    password: userObject.password || "validPassword",
  });
  return createdUser;
}

async function createSession(userId) {
  return await session.create(userId);
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
};

export default orchestrator;
