import styles from "./styles.module.css";
function Breakingcard(){
return(
    <div className={styles.breakingcard}>
        <h1>International peace talk reach historic Agreement</h1>
        <p>July 23, 2024</p>
    </div>
)
}

function BreakingNews() {
  return (
    <>
    <div className={styles.breakingContainer}>
      <div className={styles.breakingHead}>
        <h1>
          <i>🛜</i> Breaking News
        </h1>
      </div>
      <div className={styles.breakingcardContainer}>
        <Breakingcard />
        <Breakingcard />
        <Breakingcard />
      </div>
    </div>
    <hr className={styles.hrline}/>
    </>
  );
}

export default BreakingNews;
