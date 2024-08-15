import styles from "./styles.module.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomDropdown = () => (
  <div className={styles.dropdownContainer}>
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        Category
        <KeyboardArrowDownIcon />
      </button>
      <div className={styles.dropdownContent}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  </div>
);
export default CustomDropdown;
