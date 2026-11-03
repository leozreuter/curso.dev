import styles from "./counter.module.css";

export default function Counter({ title, number }) {
  return (
    <div key={number} className={`${styles.counter} ${styles.blink}`}>
      <p className={styles["counter-number"]}>{number}</p>
      <p className={styles["counter-title"]}>{title}</p>
    </div>
  );
}
