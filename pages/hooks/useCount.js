import { useState, useEffect } from "react";

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date().getTime() - new Date(targetDate).getTime();

    const formatNumber = (num) => {
      return num % 1 === 0
        ? num.toLocaleString("pt-BR") // Número inteiro, sem casas decimais
        : num.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }); // Número decimal com 2 casas
    };

    const years = formatNumber(
      difference / (1000 * 60 * 60 * 24 * 365),
    ).replace(".", ",");
    const mouth = formatNumber(difference / (1000 * 60 * 60 * 24 * 30)).replace(
      ".",
      ",",
    );
    const day = formatNumber(difference / (1000 * 60 * 60 * 24)).replace(
      ".",
      ",",
    );
    const hour = (difference / (1000 * 60 * 60)).toFixed(2).replace(".", ",");
    const minute = formatNumber(Math.floor(difference / 1000 / 60));
    const second = formatNumber(Math.floor(difference / 1000));

    return [years, mouth, day, hour, minute, second];
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
