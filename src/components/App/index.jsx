import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutesComponent } from '../../routes';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const venueManager = localStorage.getItem("venueManager");
    setIsLoggedIn(!!token);
    setUserRole(venueManager === "true" ? 'venueManager' : 'user');
  }, []);

  return (
    <Router>
      <RoutesComponent 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
      />
    </Router>
  );
}
