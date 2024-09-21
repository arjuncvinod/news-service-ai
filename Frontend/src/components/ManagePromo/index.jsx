import { useEffect, useState } from 'react';
import { db } from "../../services/firebase";
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import styles from './index.module.css'; // Adjust the path as necessary

const ManagePromoContent = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromoContent = async () => {
      const querySnapshot = await getDocs(collection(db, 'promos'));
      const promoData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPromos(promoData);
    };

    fetchPromoContent();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const promoDocRef = doc(db, 'promos', id); // Fix the collection name
    await updateDoc(promoDocRef, { status });
  };

  return (
    <div className={styles.manageContainer}>
      <h2 className={styles.manageHeading}>Manage Promotional Content</h2>
      <div className={styles.cardContainer}>
      {promos.length === 0 ? (
        <p>No promotional content to review.</p>
      ) : (
        promos.map((promo) => (
          <div key={promo.id} className={styles.promoCard}>
            <h3 className={styles.promoTitle}>{promo.title}</h3>
            <p className={styles.promoContent}>{promo.content}</p>
            <p className={styles.promoDate}><b>Date:</b> {promo.date}</p>
            <img src={promo.imageUrl} alt={promo.title} className={styles.promoImage} />
            <p className={styles.statusLabel}>Status: {promo.status}</p>
            {promo.status === 'pending' && (
              <div className={styles.actionButtons}>
                <button 
                  className={styles.button} 
                  onClick={() => handleStatusUpdate(promo.id, 'approved')}
                >
                  Approve
                </button>
                <button 
                  className={styles.button} 
                  onClick={() => handleStatusUpdate(promo.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default ManagePromoContent;
