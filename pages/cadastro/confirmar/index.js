import DefaultLayout from "interface/DefaultLayout";
import { Banner, Stack, Link } from "@primer/react";
import { InlineMessage } from "@primer/react/experimental";

export default function ConfirmRegisterPage() {
  return (
    <DefaultLayout
      metadata={{
        title: "Confirme seu cadastro",
      }}
      contentWidth="medium"
    >
      <Stack gap="condensed">
        <Banner
          title="A sua conta foi criada! Agora você precisa verificar seu email."
          variant="warning"
        >
          <Banner.Description>
            Clique no link de confirmação que foi enviado para sua caixa de
            email. <br />
            Isso confirma que você é um ser humano real com um endereço de email
            legítimo. <br />
            Se por algum motivo não conseguir ativar a sua conta, fale com a
            nossa equipe:{" "}
            <Link href="mailto:suporte@reustware.com.br" muted inline>
              suporte@reustware.com.br
            </Link>
          </Banner.Description>
        </Banner>
        <InlineMessage size="small" variant="unvailable">
          Não encontrou? Veja a caixa de spam.
        </InlineMessage>
      </Stack>
    </DefaultLayout>
  );
}
