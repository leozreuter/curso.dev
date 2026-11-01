import orchestrator from "tests/orchestrator.js";
import activation from "models/activation.js";
import webserver from "infra/webserver.js";
import user from "models/user.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: User registration flow: (all succesfull)", () => {
  let createdUser;
  let activationTokenId;
  let sessionResponseBody;
  test("Create user account", async () => {
    const createdUserResponse = await fetch(
      "http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: "RegistrationFlow",
          email: "rflow@curso.dev",
          password: "password",
        }),
      },
    );

    createdUser = await createdUserResponse.json();

    expect(createdUser).toEqual({
      id: createdUser.id,
      username: "RegistrationFlow",
      features: ["read:activation_token"],
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at,
    });
  });

  test("Recieve activation email", async () => {
    const lastEmail = await orchestrator.getLastEmail();
    activationTokenId = orchestrator.extractUUID(lastEmail.Text);

    expect(lastEmail.From.Address).toEqual("noreply@curso.dev");
    expect(lastEmail.To[0].Address).toBe("rflow@curso.dev");
    expect(lastEmail.Subject).toBe("Ative seu cadastro!");
    expect(lastEmail.Text).toContain("RegistrationFlow");
    expect(lastEmail.Text).toContain(
      `${webserver.origin}/cadastro/ativar/${activationTokenId}`,
    );

    const activationObject =
      await activation.findOneValidById(activationTokenId);
    expect(activationObject.user_id).toEqual(createdUser.id);
    expect(activationObject.used_at).toBe(null);
  });
  test("Activate account", async () => {
    const activationResponse = await fetch(
      `${webserver.origin}/api/v1/activations/${activationTokenId}`,
      {
        method: "PATCH",
      },
    );

    expect(activationResponse.status).toBe(200);
    const activationResponseBody = await activationResponse.json();
    expect(Date.parse(activationResponseBody.used_at)).not.toBeNaN();

    const activatedUser = await user.findOneByUsername("RegistrationFlow");
    expect(activatedUser.features).toEqual([
      "create:session",
      "read:session",
      "update:user",
    ]);
  });
  test("Login", async () => {
    const sessionResponse = await fetch(`${webserver.origin}/api/v1/sessions`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: "rflow@curso.dev",
        password: "password",
      }),
    });
    expect(sessionResponse.status).toBe(201);
    sessionResponseBody = await sessionResponse.json();
    expect(sessionResponseBody.user_id).toEqual(createdUser.id);
  });
  test("Get user", async () => {
    const response = await fetch("http://localhost:3000/api/v1/user", {
      method: "GET",
      headers: { Cookie: `session_id=${sessionResponseBody.token}` },
    });
    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody).toEqual({
      id: createdUser.id,
      username: createdUser.username,
      email: "rflow@curso.dev",
      features: ["create:session", "read:session", "update:user"],
      created_at: createdUser.created_at,
      updated_at: responseBody.updated_at,
    });
  });
});
