import React from "react";
import './index.css'; // Importando CSS global (opcional)

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
