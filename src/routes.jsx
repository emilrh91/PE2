import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Venues } from './pages/Venues';
import { VenueDetails } from './pages/VenueDetails';
import { ManageVenues } from './pages/ManageVenues';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { NavbarComponent } from './components/NavbarComponent';
import { FooterComponent } from './components/FooterComponent';
import { LoginModal } from './components/LoginModal';

export function RoutesComponent() {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [userRole, setUserRoleState] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <>
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedInState}
        setUserRole={setUserRoleState}
        handleShowLogin={handleShowLogin}
      />
      <Routes>
        <Route
          path="/venue/:venueId"
          element={
            <VenueDetails
              isLoggedIn={isLoggedIn}
              handleShowLogin={handleShowLogin}
            />
          }
        />
        <Route path="/venues" element={<Venues />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-venues" element={<ManageVenues />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<LoginModal setIsLoggedIn={setIsLoggedInState} setUserRole={setUserRoleState} isModal={false} />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
      <FooterComponent 
        isLoggedIn={isLoggedIn}
        handleShowLogin={handleShowLogin}
      />
      <LoginModal show={showLogin} handleClose={handleCloseLogin} setIsLoggedIn={setIsLoggedInState} setUserRole={setUserRoleState} />
    </>
  );
}
