import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout(setIsLoggedIn) {
  const navigate = useNavigate();

  return useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("venueManager");
    setIsLoggedIn(false);
    navigate("/");
  }, [navigate, setIsLoggedIn]);
}
