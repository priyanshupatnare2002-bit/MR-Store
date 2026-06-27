import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user2 = users.find((u) => u.email === email && u.password === password);
    if (user2) {
      const loggedInUser = { id: user2.id, email: user2.email, name: user2.name };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };
  const register = async (email, password, name) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    const loggedInUser = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
