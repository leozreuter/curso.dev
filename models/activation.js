import email from "infra/email.js";

async function sendEmailToUser(user) {
  await email.send({
    from: "CursoDev <noreply@curso.dev>",
    to: user.email,
    subject: "Ative seu cadastro!",
    text: `${user.username}, ative sua conta clicando no link abaixo:
    
https://...

Atenciosamente,
Equipe Curso.dev`,
  });
}

const activation = {
  sendEmailToUser,
};

export default activation;
