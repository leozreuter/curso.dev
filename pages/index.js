import Head from "next/head";
import background from "./src/assets/background.jpg";
import favicon from "./src/assets/favicon.png"
import Counter from "./components/counter.js"
import useContdown from "./hooks/useContdown.js"

function Home() {
  const [day, hour, minute, second] = useContdown("Jan 19, 2025 11:00:00");

  return (      
      <div className="App" style={{ backgroundImage: `url(${background.src})` }}>
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
