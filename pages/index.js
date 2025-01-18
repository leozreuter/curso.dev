import React, { useEffect, useState } from "react";
import Head from "next/head";
import background from "./src/assets/background.jpg";
import backgroundMobile from "./src/assets/back-acabou-mobile.png";
import backgroundAcabou from "./src/assets/backgroundAcabou.png";
import favicon from "./src/assets/favicon.png"
import Counter from "./components/counter.js"
import useCountdown from "./hooks/useContdown.js"
import confetti from "canvas-confetti";

function Home() {
  var acabou = false;
  useEffect(() => {
    setIsClient(true); // Define que estamos no cliente
  }, []);

  const [isClient, setIsClient] = useState(false);
  const [day, hour, minute, second] = useCountdown("Jan 19, 2025 12:00:00", handleComplete);

  function handleComplete() {
    acabou =  true;
    // Certifica que estamos no cliente antes de executar o confetti
    if (typeof window !== "undefined") {
      const delay = 1000; // Tempo de atraso em milissegundos (2 segundos)
  
      setTimeout(() => {
        confetti({
          particleCount: 50, // Reduzido para melhorar desempenho
          spread: 100,
          origin: { y: 0.6 },
        });
  
        // Prolonga o efeito com menos partículas
        const duration = 6 * 1000;
        const end = Date.now() + duration;
  
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
          }
          confetti({
            particleCount: 25,
            angle: 60,
            spread: 90,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 25,
            angle: 120,
            spread: 90,
            origin: { x: 1 },
          });
        }, 500);
      }, delay); // Atraso antes de iniciar o efeito de confetes
    }
  }

  // Renderiza apenas no cliente
  if (!isClient) {
    return null; // Não renderiza nada no servidor
  }

  function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches; // Detecta dispositivos com largura até 767px
  }

  const mobile = isMobile();
  let backgroundImage;
  if (acabou) {
    backgroundImage = mobile ? backgroundMobile : backgroundAcabou;
  } else {
    backgroundImage = background;
  }

  return (   
      <div className="App" style={{ backgroundImage: `url(${backgroundImage.src})`}}>
        <Head>
          <title>Te amo demais JUUUU</title>
          {/* Favicon */}
          <link rel="icon" href= {favicon.src}/>
        </Head>

        <div style={{ position: "absolute", width: "100vw", height: "100vh", background: "rgba(255, 255, 255, 0)", backdropFilter: "blur(3px)" }}/>
        
        <h1 className="titulo">
          Oi Juu, eu te amo demais. Tu é o amor da minha vida toda! ❤️❤️❤️
        </h1>
        <iframe
          className="GIF"
          src={"https://giphy.com/embed/9G0AdBbVrkV3O"}
          alt="teste..."
        ></iframe>
        <div className="camporee">
          <h1>Tempo até a Jujuba voltar do Camporee 🏕️</h1>
          <div className="counter-box">
            <Counter className="counter" title="Dias" number={day}/> 
            <Counter className="counter" title="Horas" number={hour}/> 
            <Counter className="counter" title="Minutos" number={minute}/> 
            <Counter className="counter" title="Segundos" number={second}/> 
          </div>
        </div>
      </div>
  );
}

export default Home;
