import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard/index';
import Home from './pages/Home/Home';
import "./App.css"

const App = () => {
  return (
    <Router>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
