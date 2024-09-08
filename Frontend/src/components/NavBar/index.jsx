import styles from "./index.module.css";

import logo from "../../assets/Home/logo.svg";

// import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CustomDropdown from "../Dropdown";
import LogoutButton from "../Logout/Logout";

function NavBar() {
  return (
    <nav id={styles.nav}>
      <div className={styles.navRow1}>
        <div className={styles.buttonContainer}>
          {/* <button>
            Subscribe <EmailIcon className={styles.mailIcon} />
          </button> */}
          <LogoutButton/>
        </div>
        <a href="/" className={styles.logoContainer}>
          <img src={logo} alt="" />
          <h1>
            ew <span>s</span>cad<span>e</span>{" "}
          </h1>
        </a>
        <div className={styles.socialContainer}>
          <div className={styles.socials}>
            <i className={styles.icon}>
              <FacebookIcon />
            </i>
            <i className={styles.icon}>
              <InstagramIcon />
            </i>
            <i className={styles.icon}>
              <XIcon />
            </i>
            <i className={styles.icon}>
              <YouTubeIcon />
            </i>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.navRow2}>
        <div className={styles.menuContainer}>
          <MenuIcon />
        </div>
        <div className={styles.categoriesContainer}>
       
        <CustomDropdown category={"India"}/>
        <CustomDropdown category={"Kerala"}/>
        <CustomDropdown category={"Education"} />
        <CustomDropdown category={"Lifestyle"}/>
        <CustomDropdown category={"Politics"}/>
        </div>
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
              <SearchIcon className={styles.searchIcon}/> <input type="text" placeholder="Search"/>
            </div>
        </div>
      </div>
      <hr />
    </nav>
  );
}

export default NavBar;
