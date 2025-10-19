import AsyncRetry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database.js";
import migrator from "models/migrator.js";
import user from "models/user.js";
import session from "models/session";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

async function waitForAllServices() {
  await waitForWebServer();
  await waitForEmailServer();

  async function waitForEmailServer() {
    return AsyncRetry(fechtEmailPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fechtEmailPage() {
      const response = await fetch(emailHttpUrl);

      if (response.status != 200) {
        throw Error();
      }
    }
  }

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

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/api/v1/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListRespose = await fetch(`${emailHttpUrl}/api/v1/messages`, {
    method: "GET",
  });
  const emailListBody = await emailListRespose.json();
  const lastEmailItem = emailListBody.messages.shift();
  const lastEmail = await fetch(
    `${emailHttpUrl}/api/v1/message/${lastEmailItem.ID}`,
  );
  const lastEmailBody = await lastEmail.json();

  return lastEmailBody;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
};

export default orchestrator;
