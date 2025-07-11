import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updateAtText = "Carregando ...";

  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-br");
  }
  return <div>Última atualização: {updateAtText}</div>;
}

function DatabaseData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseData = "Carregando ...";

  if (!isLoading && data) {
    databaseData = (
      <div>
        <p>Versão: {data.dependecies.database.version}</p>
        <p>Conexões Máximas: {data.dependecies.database.max_connections}</p>
        <p>Conexões Abertas: {data.dependecies.database.opend_connections}</p>
      </div>
    );
  }

  console.log(data);
  return (
    <div>
      <h1>Database Information:</h1>
      <pre>{databaseData}</pre>
    </div>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseData />
    </>
  );
}
