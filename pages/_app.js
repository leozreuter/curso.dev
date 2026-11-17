import React from "react";
import "./index.css"; // Importando CSS global (opcional)

import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/base/motion/motion.css";
import { BaseStyles, ThemeProvider } from "@primer/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  );
}
