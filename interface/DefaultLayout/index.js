import Head from "next/head";
import { PageLayout, Header, Text } from "@primer/react";
import styles from "./index.module.css";

const contentWidthClasses = {
  small: styles.smallContent,
  xsmall: styles.xsmallContent,
};

export default function DefaultLayout({
  children,
  metadata = {},
  contentWidth,
}) {
  const extraContentClassesName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>{metadata.title ? `${metadata.title} · Marca` : `Marca`}</title>
        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>

      <Header>
        <Header.Item full>
          <Header.Link href="/">Home</Header.Link>
        </Header.Item>
      </Header>

      <PageLayout>
        <PageLayout.Content
          className={extraContentClassesName}
          width={contentWidth}
        >
          {children}
        </PageLayout.Content>
        <PageLayout.Footer divider="line">
          <Text size="small">© {new Date().getFullYear()} Marca </Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
