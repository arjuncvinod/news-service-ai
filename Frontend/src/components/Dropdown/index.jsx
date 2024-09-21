/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomDropdown = ({category}) => (
  <div className={styles.dropdownContainer}>
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <a href={`/news/category/${category}`}>{category}</a>
        {/* <KeyboardArrowDownIcon /> */}
      </button>
      {/* <div className={styles.dropdownContent}>
        <a href="#">India</a>
        <a href="#">Kerala</a>
        <a href="#">Education</a>
      </div> */}
    </div>
  </div>
);
export default CustomDropdown;
