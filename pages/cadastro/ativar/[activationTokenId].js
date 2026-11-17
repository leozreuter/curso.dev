import DefaultLayout from "interface/DefaultLayout";
import { Stack, Spinner, Label, Avatar, Banner, Link } from "@primer/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivationUserPage() {
  return (
    <DefaultLayout
      metadata={{
        title: "Ativar cadastro",
      }}
      contentWidth="medium"
    >
      <Stack align="center">
        <Avatar
          size={96}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD04Q1Sdz1Q0psE592kc0wU7VNVErN_RYgDoPNDuWgQQ&s"
        />
        <div style={{ width: "100%" }}>
          <ActivationUser />
        </div>
      </Stack>
    </DefaultLayout>
  );
}

function ActivationUser() {
  const router = useRouter();
  const activationTokenId = router.query.activationTokenId;

  const [errorMessage, setErrorMessage] = useState(null);
  const [activationStatus, setActivationStatus] = useState("loading");

  useEffect(() => {
    if (!activationTokenId) {
      return;
    }

    sendActivationRequest();

    async function sendActivationRequest() {
      try {
        const response = await fetch(
          `/api/v1/activations/${activationTokenId}`,
          {
            method: "PATCH",
            signal: AbortSignal.timeout(5000),
          },
        );
        const responseBody = await response.json();

        if (response.status === 200) {
          setActivationStatus("success");
          return;
        }

        setActivationStatus("failure");
        setErrorMessage(`${responseBody.message} ${responseBody.action}`);
      } catch (error) {
        setActivationStatus("failure");

        if (error.name === "TimeoutError") {
          setErrorMessage("O servidor demorou para responder.");
        } else {
          setErrorMessage("Um erro interno não esperado aconteceu.");
        }
      }
    }
  }, [activationTokenId]);

  return (
    <>
      {activationStatus === "loading" && (
        <Stack
          align="center"
          justify="center"
          direction="horizontal"
          gap="condensed"
        >
          <Label size="large" variant="accent">
            <Spinner size="small" style={{ marginRight: 8 }} />
            <span>Validando o token de ativação...</span>
          </Label>
        </Stack>
      )}

      {activationStatus === "success" && (
        <>
          <Stack
            align="center"
            justify="center"
            direction="horizontal"
            gap="condensed"
          >
            <Label size="large" variant="success">
              <span>
                Sua conta está ativa e você já pode{" "}
                <Link
                  href="/login"
                  style={{
                    color: "var(--fgColor-success)",
                  }}
                >
                  <b>realizar login!</b>
                </Link>
              </span>
            </Label>
          </Stack>
        </>
      )}

      {activationStatus === "failure" && (
        <>
          <Banner variant="critical" title="Erro na ativação da sua conta!">
            <Banner.Description>{errorMessage}</Banner.Description>
          </Banner>
        </>
      )}
    </>
  );
}
