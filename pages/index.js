function Home() {
  return (
    <>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/906/1/261/holiday-valentine-s-day-couple-heart-love-hd-wallpaper-preview.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          WebkitBackdropFilter: "revert",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Oi Juu, eu te amo demais. Tu é o amor da minha vida toda! ❤️❤️❤️
        </h1>
        <iframe
          src={"https://giphy.com/embed/9G0AdBbVrkV3O"}
          alt="teste..."
          style={{ border: "none", width: "720px", height: "60vh" }}
        ></iframe>
      </div>
    </>
  );
}

export default Home;
