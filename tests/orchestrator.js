import AsyncRetry from "async-retry";
import database from "infra/database.js";

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

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
