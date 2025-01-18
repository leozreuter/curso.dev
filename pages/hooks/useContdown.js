import { useState, useEffect } from "react";

export default function useCountdown(targetDate, onComplete) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      if (onComplete) onComplete(); // Dispara o callback ao zerar
      return [0, 0, 0, 0];
    }

    const day = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hour = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minute = Math.floor((difference / 1000 / 60) % 60);
    const second = Math.floor((difference / 1000) % 60);

    return [day, hour, minute, second];
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
