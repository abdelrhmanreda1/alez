import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [token, setToken] = useState(Cookies.get("token") || null);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
