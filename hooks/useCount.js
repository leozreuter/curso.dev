import { useState, useEffect } from "react";

function calculateTimeLeft(targetDate) {
  const start = new Date(targetDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // dias do mês anterior ao atual
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

function calculateDecimal(targetDate) {
  const now = new Date();
  const diffMs = now - new Date(targetDate);
  const t = calculateTimeLeft(targetDate);

  // fração do mês atual, usando a mesma base de dias do cálculo original
  const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  const fracMonth =
    (t.days + t.hours / 24 + t.minutes / 1440 + t.seconds / 86400) /
    daysInMonth;

  const totalMonths = t.years * 12 + t.months + fracMonth;

  return {
    years: totalMonths / 12,
    months: totalMonths,
    days: diffMs / 86400000,
    hours: diffMs / 3600000,
    minutes: diffMs / 60000,
    seconds: Math.floor(diffMs / 1000),
  };
}

export default function useCountdown(targetDate, mode = "decimal") {
  const calc = mode === "decimal" ? calculateDecimal : calculateTimeLeft;
  const [timeLeft, setTimeLeft] = useState(() => calc(targetDate));

  useEffect(() => {
    setTimeLeft(calc(targetDate)); // atualiza na hora ao trocar o modo
    const timer = setInterval(() => setTimeLeft(calc(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate, mode]);

  return timeLeft;
}
