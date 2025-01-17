import React from "react";
import styles from "./counter.module.css";

export default function Counter({ title, number }) {
  return (
    <div className={styles.counter}>
      <p className={styles["counter-number"]}>{number}</p>
      <p className={styles["counter-title"]}>{title}</p>
    </div>
  );
}
