import { useEffect, useState } from 'react';
import { db } from "../../services/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import styles from './index.module.css'; // Adjust the path as necessary

const ManagePromoContent = () => {
  const [promos, setPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null); // State for the selected promo
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch promo content function
  const fetchPromoContent = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'promos'));
    const promoData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPromos(promoData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPromoContent(); // Fetch promos when the component mounts
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const promoDocRef = doc(db, 'promos', id);
    await updateDoc(promoDocRef, { status });

    // Update the specific promo's status locally without re-fetching all promos
    setPromos((prevPromos) =>
      prevPromos.map((promo) =>
        promo.id === id ? { ...promo, status } : promo
      )
    );
    setIsModalOpen(false); // Close the modal after updating
  };

  const handleDelete = async (id) => {
    const promoDocRef = doc(db, 'promos', id);
    await deleteDoc(promoDocRef);

    // Remove the specific promo from state without re-fetching all promos
    setPromos((prevPromos) => prevPromos.filter((promo) => promo.id !== id));
    setIsModalOpen(false); // Close the modal after deleting
  };

  const openModal = (promo) => {
    setSelectedPromo(promo); // Set the selected promo
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedPromo(null); // Clear the selected promo
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.manageContainer}>
      <h2 className={styles.manageHeading}>Manage Promotional Content</h2>
      <div className={styles.cardContainer}>
        {promos.length === 0 ? (
          <p>No promotional content to review.</p>
        ) : (
          promos.map((promo) => (
            <div 
              key={promo.id} 
              className={styles.promoCard} 
              onClick={() => openModal(promo)} // Open modal on card click
            >
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              {/* Show a short description instead of the full content */}
              <p className={styles.promoContent}>
                {promo.content.length > 50 ? `${promo.content.substring(0, 50)}...` : promo.content}
              </p>
              <p className={styles.promoDate}><b>Date:</b> {promo.submittedDate}</p>
              <img src={promo.imageUrl} alt={promo.title} className={styles.promoImage} />
              <p className={styles.statusLabel}>Status: {promo.status}</p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedPromo && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <img src={selectedPromo.imageUrl} alt={selectedPromo.title} className={styles.modalImage} />
            <h2 className={styles.modalTitle}>{selectedPromo.title}</h2>
            <p className={styles.modalDate}><b>Submitted By</b> {selectedPromo.submittedBy}</p>
            <p className={styles.modalDate}><b>Submitted Date:</b> {selectedPromo.submittedDate}</p>
            <p className={styles.modalDate}><b>Expiry Date:</b> {selectedPromo.expiryDate}</p>
            <p className={styles.modalContentText}>{selectedPromo.content}</p>

            {/* Action buttons based on promo status */}
            <div className={styles.actionButtons}>
              {selectedPromo.status === 'approved' && (
                <button 
                  className={`${styles.button} ${styles.disapproveButton}`} 
                  onClick={() => handleStatusUpdate(selectedPromo.id, 'pending')}
                >
                  Disapprove
                </button>
              )}

              {selectedPromo.status === 'rejected' && (
                <>
                  <button 
                    className={`${styles.button} ${styles.approveButton}`} 
                    onClick={() => handleStatusUpdate(selectedPromo.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className={`${styles.button} ${styles.deleteButton}`} 
                    onClick={() => handleDelete(selectedPromo.id)}
                  >
                    Delete
                  </button>
                </>
              )}

              {selectedPromo.status === 'pending' && (
                <>
                  <button 
                    className={`${styles.button} ${styles.approveButton}`} 
                    onClick={() => handleStatusUpdate(selectedPromo.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className={`${styles.button} ${styles.rejectButton}`} 
                    onClick={() => handleStatusUpdate(selectedPromo.id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>

            <button className={styles.closeButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePromoContent;
