import DefaultLayout from "interface/DefaultLayout";
import useSWR from "swr";

import { PulseIcon, PlugIcon, DatabaseIcon } from "@primer/octicons-react";
import { Heading, Stack, Banner } from "@primer/react";
import { Card } from "@primer/react/experimental";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <DefaultLayout>
      <Stack>
        <Heading>Status</Heading>
        <DatabaseData />
        <UpdatedAt />
      </Stack>
    </DefaultLayout>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updateAtText = "Carregando ...";

  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-br");
  }
  return (
    <Banner layout="compact" hideTitle title="Info">
      <Banner.Description>
        <b>Última atualização: </b>
        {updateAtText}
      </Banner.Description>
    </Banner>
  );
}

function DatabaseData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return;
  }

  const database = data.dependecies.database;
  const dbOpenedConnections = database.opened_connections ?? 0;
  const dbMaxConnection = database.max_connections;
  const dbVersion = database.version ?? "-";

  return (
    <Stack>
      <Heading as="h2" variant="medium">
        Database
      </Heading>
      <Stack direction={{ narrow: "vertical", regular: "horizontal" }}>
        <Stack.Item grow>
          <Card>
            <Card.Icon icon={PlugIcon} />
            <Card.Heading>Conexões Máximas</Card.Heading>
            <Card.Description>{dbMaxConnection}</Card.Description>
            <Card.Metadata>Conexões disponíveis nesse instante</Card.Metadata>
          </Card>
        </Stack.Item>
        <Stack.Item grow>
          <Card>
            <Card.Icon icon={PulseIcon} />
            <Card.Heading>Conexões abertas</Card.Heading>
            <Card.Description>{dbOpenedConnections}</Card.Description>
            <Card.Metadata>Conexões utilizadas nesse instante</Card.Metadata>
          </Card>
        </Stack.Item>
        <Stack.Item grow>
          <Card>
            <Card.Icon icon={DatabaseIcon} />
            <Card.Heading>Versão PostgreSQL</Card.Heading>
            <Card.Description>{dbVersion}</Card.Description>
            <Card.Metadata>Versão em execução</Card.Metadata>
          </Card>
        </Stack.Item>
      </Stack>
    </Stack>
  );
}
