import styles from "./styles.module.css";
function Loader() {
  return (
      <div className={styles.typing_indicator}>
        <div className={styles.typing_circle}></div>
        <div className={styles.typing_circle}></div>
        <div className={styles.typing_circle}></div>
        <div className={styles.typing_shadow}></div>
        <div className={styles.typing_shadow}></div>
        <div className={styles.typing_shadow}></div>
      </div>
  );
}

export default Loader;
