import Head from "next/head";
import { PageLayout, Header, Text } from "@primer/react";

export default function DefaultLayout({ children, metadata = {} }) {
  return (
    <>
      <Head>
        <title>{ metadata.title ? `${metadata.title} · Marca` : `Marce`}</title>
        { metadata.description && (
          <meta name="description" content={metadata.description}/>
        ) }
      </Head>

      <Header>
        <Header.Item full>
          <Header.Link href="/">Link</Header.Link>
        </Header.Item>
      </Header>

      <PageLayout>
        <PageLayout.Content>{children}</PageLayout.Content>
        <PageLayout.Footer divider="line">
          <Text size="small">© {new Date().getFullYear()} Marca </Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
