import { useEffect, useState } from "react";
import Head from "next/head";
import Counter from "./components/counter.js";
import useCountdown from "./hooks/useCount.js";

function Home() {
  const [isClient, setIsClient] = useState(false);
  const countdown = useCountdown("Feb 04, 2024 16:00:00");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Se ainda estiver no servidor, mostrar valores padrão para evitar erro de hidratação
  const [years, mouth, day, hour, minute, second] = isClient
    ? countdown
    : [0, 0, 0, 0, 0, 0];

  return (
    <div className="App">
      <Head>
        <title>Te amo demais JUUUU</title>
      </Head>
      <div className="a" />
      <h1 className="titulo">
        Oi Juu, eu te amo demais. Tu é o amor da minha vida toda! ❤️❤️❤️
      </h1>
      <iframe src={"https://giphy.com/embed/9G0AdBbVrkV3O"}></iframe>
      <div className="counter-box">
        <Counter className="counter" title="Anos" number={years} />
        <h6>=</h6>
        <Counter className="counter" title="Meses" number={mouth} />
        <h6>=</h6>
        <Counter className="counter" title="Dias" number={day} />
        <h6>=</h6>
        <Counter className="counter" title="Horas" number={hour} />
        <h6>=</h6>
        <Counter className="counter" title="Minutos" number={minute} />
        <h6>=</h6>
        <Counter className="counter" title="Segundos" number={second} />
      </div>
    </div>
  );
}

export default Home;
