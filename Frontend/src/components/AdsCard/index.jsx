import styles from "./index.module.css"
export default function AdsCard() {
  return (
    <div className={styles.adsCard} >
    <img src="https://img.freepik.com/free-photo/beautiful-mountains-landscape_23-2150787976.jpg?t=st=1725189424~exp=1725193024~hmac=45e80a77801e48a16e66ddcf345d80c67c484f6b338d83ab2e9ac81eb82b360e&w=1380" alt="" /> 
    <h3>Your ads</h3>
    <h1>Do you want to advertise here?</h1>
    </div>
  )
}
