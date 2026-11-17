import { Button, FormControl, TextInput, Stack, Heading } from "@primer/react";
import { useState } from "react";
import DefaultLayout from "interface/DefaultLayout";

export default function RegisterPage() {
  return (
    <DefaultLayout
      metadata={{
        title: "Cadastre-se",
        description: "Crie sua conta de forma gratuita",
      }}
      contentWidth="small"
    >
      <Stack gap="spacious">
        <Heading>Cadastro</Heading>
        <RegisterForm />
      </Stack>
    </DefaultLayout>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const requestBody = { username, email, password };

    const respose = await fetch("api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (respose.status === 201) {
      location.href = "cadastro/confirmar";
    } else {
      const responseBody = await respose.json();
      alert(responseBody.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="normal">
        <FormControl required>
          <FormControl.Label>Nome do usuário</FormControl.Label>
          <TextInput
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            block
          />
        </FormControl>
        <FormControl required>
          <FormControl.Label>Email</FormControl.Label>
          <TextInput
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            block
          />
        </FormControl>
        <FormControl required>
          <FormControl.Label>Senha</FormControl.Label>
          <TextInput
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            block
          />
        </FormControl>
        <Stack.Item>
          <Button variant="primary" type="submit">
            Criar cadastro
          </Button>
        </Stack.Item>
      </Stack>
    </form>
  );
}
