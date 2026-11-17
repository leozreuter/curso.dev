import Head from "next/head";
import useCountdown from "hooks/useCount.js";
import NumberFlow from "@number-flow/react";
import { useState } from "react";

function Home() {
  const [mode, setMode] = useState("breakdown");
  const { years, months, days, hours, minutes, seconds } = useCountdown(
    "Feb 04, 2024 16:00:00",
    mode,
  );

  const isDec = mode === "decimal";

  // [valor, rótulo, casas decimais, completar com zero]
  const units = [
    [years, years === 1 ? "ano" : "anos", isDec ? 2 : 0],
    [months, months === 1 ? "mês" : "meses", isDec ? 1 : 0],
    [Math.floor(days), Math.floor(days) === 1 ? "dia" : "dias", 0],
    [Math.floor(hours), "horas", 0, !isDec],
    [Math.floor(minutes), "min", 0, !isDec],
    [seconds, "seg", 0, !isDec],
  ];

  return (
    <div className="App">
      <Head>
        <title>Te amo demais JUUUU</title>
      </Head>

      <h1 className="titulo">
        Oi Juu, eu te amo demais.
        <br />
        Tu é o amor da minha vida toda! ❤️
      </h1>

      <div className="gif-wrap">
        <iframe src="https://giphy.com/embed/9G0AdBbVrkV3O" />
      </div>

      <section className="counter">
        <p className="counter-label">Juntos há</p>
        <div className="counter-grid">
          {" "}
          {units.map(([value, label, decimals, pad], i) => (
            <div className="unit" key={i}>
              <NumberFlow
                className="unit-value"
                value={value}
                locales="pt-BR"
                format={{
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                  ...(pad && { minimumIntegerDigits: 2 }),
                }}
              />
              <span className="unit-label">{label}</span>
            </div>
          ))}
        </div>
        <p className="counter-footer">e contando... 💕</p>
        <button
          className="toggle-btn"
          onClick={() =>
            setMode((m) => (m === "decimal" ? "breakdown" : "decimal"))
          }
        >
          {isDec ? "💕 Ver em anos/meses/dias" : "✨ Ver em totais"}
        </button>
      </section>
    </div>
  );
}

export default Home;
