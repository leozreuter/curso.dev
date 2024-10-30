import database from "infra/database.js";

async function status(request, response) {
  const res = await database.query("SELECT 1+1 as sum;");
  const resp = res.rows;

  console.log(resp);

  response.status(200).json({ chave: "teste éé", resp });
}

export default status;
