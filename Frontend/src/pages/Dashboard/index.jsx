import { Route, Routes, Link } from 'react-router-dom';
import ManageUsers from '../../components/ManageUsers';
import ManageNews from '../../components/MangeNews';
import LogoutButton from '../../components/Logout/Logout';
import styles from "./dashboard.module.css"
import axios from 'axios';
import toast from "react-hot-toast"
import ManagePromoContent from '../../components/ManagePromo';
function AdminDashboard() {

  const fetchNews = async () => {
    const toastId = toast.loading("Fetching news...");
  
    try {
     await axios.post("http://localhost:3000/news/save");     
      toast.success("News fetched successfully");
      toast.dismiss(toastId);
    } catch (error) {
      toast.update(toastId, { render: "Error fetching news", type: "error", isLoading: false });
    }
  };


  return (
    <><LogoutButton/>
    <div className={styles.admindashboard}>
    
      <nav className={styles.sidebar}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
          <li><Link to="/admin/manage-news">Manage News</Link></li>
          <li><Link to="/admin/manage-promo">Manage promo</Link></li>
          <li onClick={fetchNews}><a>Generate News</a></li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-news" element={<ManageNews />} />
          <Route path="/manage-promo" element={<ManagePromoContent />} />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
