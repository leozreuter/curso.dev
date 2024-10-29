import { Client } from "pg";

async function query(pedido) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();
  const res = await client.query(pedido);
  await client.end();

  return res;
}

export default {
  query: query,
};
