import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "CursoDev <sender@curso.dev>",
      to: "reciver@curso.dev",
      subject: "First email send",
      text: "First email send body",
    });
    await email.send({
      from: "CursoDev <sender@curso.dev>",
      to: "reciver@curso.dev",
      subject: "Last email send",
      text: "Last email send body",
    });

    const lastEmailObject = await orchestrator.getLastEmail();
    console.log(lastEmailObject);
    expect(lastEmailObject.From.Address).toBe("sender@curso.dev");
    expect(lastEmailObject.To[0].Address).toBe("reciver@curso.dev");
    expect(lastEmailObject.Subject).toBe("Last email send");
    expect(lastEmailObject.Text).toBe("Last email send body\r\n");
  });
});
