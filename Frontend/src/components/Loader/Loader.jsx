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



const Loader2 = () => {
  return (
    <div className={styles.loader2}>
      <span className={styles.l}>T</span>
      <span className={styles.o}>r</span>
      <span className={styles.a}>a</span>
      <span className={styles.d}>n</span>
      <span className={styles.i}>s</span>
      <span className={styles.n}>l</span>
      <span className={styles.g}>a</span>
      <span className={styles.g}>t</span>
      <span className={styles.g}>i</span>
      <span className={styles.g}>n</span>
      <span className={styles.d1}>g</span>
      <span className={styles.d2}>.</span>
      <span className={styles.d2}>.</span>
      <span className={styles.d2}>.</span>
    </div>
  );
};

const Loader4= () => {
  return (
    <div className={styles.card}>
      {/* <div className={`${styles.card__skeleton} ${styles.card__title}`}></div> */}
      <div className={`${styles.card__skeleton} ${styles.card__description}`}></div>
    </div>
  );
};
const Loader3= () => {
  return (
      <div className={`${styles.card__skeleton} ${styles.card__title}`}></div>
  );
};

const Loader5 =()=>{
  return(
    <div className={styles.loader5Container}>
<div className={styles.loader5}></div>
</div>
  )
}

export {Loader2,Loader3,Loader4,Loader5};
export default Loader;