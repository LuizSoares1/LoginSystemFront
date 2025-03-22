import React, { createContext, useState, useMemo, JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ChangePassword from "./pages/changePassword";
import UsersList from "./pages/userList";
import "./styles/main.sass";

export const AuthContext = createContext<{
  token: string | null;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}>({
  token: null,
  userRole: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

const ProtectedRoute: React.FC<{ children: JSX.Element; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { token, userRole } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && userRole !== "Admin") return <Navigate to="/home" />;
  return children;
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = (newToken: string, role: string) => {
    setToken(newToken);
    setUserRole(role);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
  };

  const authValue = useMemo(() => ({ token, userRole, login, logout }), [token, userRole]);

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <main className="container">
          <div className="container-form">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute adminOnly>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;