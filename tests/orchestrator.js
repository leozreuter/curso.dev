import AsyncRetry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return AsyncRetry(fechtStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fechtStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/statuss");

      if (response.status != 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};
