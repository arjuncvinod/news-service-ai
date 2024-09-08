import { Route, Routes, Link } from 'react-router-dom';
import ManageUsers from '../../components/ManageUsers';
import ManageNews from '../../components/MangeNews';
import LogoutButton from '../../components/Logout/Logout';
import styles from "./dashboard.module.css"

function AdminDashboard() {
  return (
    <><LogoutButton/>
    <div className={styles.admindashboard}>
    
      <nav className={styles.sidebar}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
          <li><Link to="/admin/manage-news">Manage News</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-news" element={<ManageNews />} />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
