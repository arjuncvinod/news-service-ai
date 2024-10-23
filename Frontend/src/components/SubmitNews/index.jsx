import { useState } from 'react';
import { db, storage } from '../../services/firebase'; // Ensure correct import for Firestore and Storage services
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import styles from './index.module.css'; // Import CSS module

const SubmitNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Store the selected image file in state
    }
  };

  const validateForm = () => {
    if (!title.trim() || !content.trim() || !description.trim() || !category.trim()) {
      setError('All fields must be filled out.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (!validateForm()) return;

    setUploading(true);
    const todayDate = getTodayDate(); // Set today's date as object ID

    try {
      let imageUrl = null;

      // Upload image if provided
      if (image) {
        const imageRef = ref(storage, `news_images/${todayDate}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef); // Get the download URL after upload
      }

      // Prepare the news object to submit
      const newsData = {
        title: title.trim(),
        content: content.trim(),
        urlToImage: imageUrl || null, // Store the image URL (if uploaded)
        description: description.trim(),
        category: category.trim(),
        publishedAt: todayDate, // Use today's date as publishedAt
      };

      // Update the document for today's date (if exists), or create a new one
      const docRef = doc(db, 'news', todayDate); // Use today's date as the document ID
      await updateDoc(docRef, {
        articles: arrayUnion(newsData) // Push the new article into the "articles" array
      });

      alert('News submitted successfully!');
    } catch (error) {
      console.error('Error submitting news:', error);
      setError('Failed to submit news. Please try again later.');
    } finally {
      setUploading(false);
      // Reset form fields
      setTitle('');
      setContent('');
      setImage(null);
      setDescription('');
      setCategory('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Submit Custom News</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={uploading}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={uploading}
            className={styles.formTextarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.formLabel}>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
            className={styles.formFileInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={uploading}
            className={styles.formTextarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.formLabel}>Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={uploading}
            className={styles.formInput}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="submit" disabled={uploading} className={styles.submitButton}>
          {uploading ? 'Submitting...' : 'Submit News'}
        </button>
      </form>
    </div>
  );
};

export default SubmitNews;
