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
      email: "rflow@curso.dev",
      password: createdUser.password,
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
    expect(activatedUser.features).toEqual(["create:session"]);
  });
  test("Login", () => {});
  test("Get user", () => {});
});
