import { Client } from "pg";

async function query(pedido) {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(pedido);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    sll: getSSLValue(),
  });

  await client.connect();

  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
