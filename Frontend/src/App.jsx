import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { auth } from './services/firebase'; // Ensure this import is correct
import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard/index';
import Home from './pages/Home/Home';
import NewHome from "./pages/Home/index"
import Loader from './components/Loader/Loader';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user); // Convert user to a boolean
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <Loader/>
  }

  return (
    <Router>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />
          <Route
            path="/newhome"
            element={<NewHome />}

            />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

