import React, { useEffect, useState } from "react";
import styles from "./counter.module.css";

export default function Counter({ title, number }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Ativar o efeito de "piscar" quando o valor mudar
    setIsBlinking(true);
    const timer = setTimeout(() => setIsBlinking(false), 300); // Duração do "piscar"
    return () => clearTimeout(timer); // Limpar o timer para evitar problemas
  }, [number]); // Reexecuta quando `number` muda

  return (
    <div className={`${styles.counter} ${isBlinking ? styles.blink : ""}`}>
      <p className={styles["counter-number"]}>{number}</p>
      <p className={styles["counter-title"]}>{title}</p>
    </div>
  );
}
