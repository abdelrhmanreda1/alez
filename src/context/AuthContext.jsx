import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [token, setToken] = useState(Cookies.get("token") || null);

  // ✅ login: خزن اليوزر + التوكن في state + cookies
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    Cookies.set("token", tokenValue, { expires: 7 });
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });

    console.log("✅ Token saved:", tokenValue);
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
