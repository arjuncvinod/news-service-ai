// import styles from "./styles.module.css"
import NavBar from "../../components/NavBar"
import BreakingNews from "../../components/BreakingNews"
import TopNews from "../../components/TopNews"
import AdsCard from "../../components/AdsCard"
import CategorySection from "../../components/CategorySection"
function NewHome() {
  return (
    <>
      <NavBar />
      <BreakingNews />
      <TopNews />
      <AdsCard />
      <CategorySection />
      <CategorySection />

    </>
  )
}

export default NewHome