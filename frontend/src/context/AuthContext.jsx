import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Au démarrage : si un token existe, on récupère l'utilisateur
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setChargement(false); return; }
    authService.me()
      .then((res) => setUser(res.data))
      .catch(() => { localStorage.removeItem('token'); })
      .finally(() => setChargement(false));
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user ?? res.data);
    return res.data.user;
  };

  const register = async (data) => {
    const res = await authService.register(data);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user ?? res.data);
    return res.data.user;
  };

  const logout = async () => {
    try { await authService.logout(); } catch { /* on ignore */ }
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, chargement, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}