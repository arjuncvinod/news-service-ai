import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; // Adjust the path based on your project structure
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function AdsCard() {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // New state for closing animation

  useEffect(() => {
    const fetchApprovedAds = async () => {
      try {
        const q = query(
          collection(db, "promos"),
          where("status", "==", "approved")
        );
        const querySnapshot = await getDocs(q);
        const approvedAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter ads by expiry date
        const validAds = approvedAds.filter(ad => {
          const expiryDate = new Date(ad.expiryDate); // Convert string to Date
          return expiryDate > new Date(); // Check if the ad is still valid
        });

        // Choose a random ad from valid ads if available
        if (validAds.length > 0) {
          const randomAd = validAds[Math.floor(Math.random() * validAds.length)];
          setAds([randomAd]); // Set ads to only the randomly selected ad
        } else {
          setAds([]); // Clear ads if none are valid
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchApprovedAds();
  }, [db]);

  const openModal = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true); // Trigger closing animation
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedAd(null);
      setIsClosing(false); // Reset closing state
    }, 200); // Match this duration to the closing animation duration
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains(styles.modal)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className={styles.adsContainer}>
      {ads.length > 0 ? (
        ads.map((ad) => (
          <div
            key={ad.id}
            className={styles.adsCard}
            onClick={() => openModal(ad)}
          >
            <img src={ad.imageUrl} alt={ad.title} />
            <h3>{ad.title}</h3>
            <p>{ad.content.split(" ").slice(0, 10).join(" ")}...</p>
          </div>
        ))
      ) : (
        <div className={styles.adsCard}>
          <img
            src="https://img.freepik.com/free-photo/beautiful-mountains-landscape_23-2150787976.jpg?t=st=1725189424~exp=1725193024~hmac=45e80a77801e48a16e66ddcf345d80c67c484f6b338d83ab2e9ac81eb82b360e&w=1380"
            alt=""
          />
          <h3>Your ads</h3>
          <h1>
            Do you want to advertise?{" "}
            <Link to={"/submit-promo"}>click here</Link>
          </h1>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modal} onClick={handleBackdropClick}>
          <div
            className={`${styles.modalContent} ${
              isClosing ? styles.closing : ""
            }`}
          >
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <div className={styles.modalBody}>
              <img src={selectedAd.imageUrl} alt={selectedAd.title} />
              <h2>{selectedAd.title}</h2>
              <p>{selectedAd.content}</p>
              <p>
                Do you want to advertise? click <a href="/submit-promo">here</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
