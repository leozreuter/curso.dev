import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Te amo demais JUUUU</title>
      </Head>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/906/1/261/holiday-valentine-s-day-couple-heart-love-hd-wallpaper-preview.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0)", // Semi-transparent background
            backdropFilter: "blur(3px)", // Apply the blur effect
          }}
        />
        <h1 style={{ textAlign: "center", zIndex: "1", height: "50px" }}>
          Oi Juu, eu te amo demais. Tu é o amor da minha vida toda! ❤️❤️❤️
        </h1>
        <iframe
          src={"https://giphy.com/embed/9G0AdBbVrkV3O"}
          alt="teste..."
          style={{
            border: "none",
            height: "60vh",
            zIndex: "1",
            borderRadius: "50px",
          }}
        ></iframe>
      </div>
    </>
  );
}

export default Home;
