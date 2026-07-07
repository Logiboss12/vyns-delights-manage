import { useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [envoi, setEnvoi] = useState(false);

  const destination = location.state?.from || '/';

  const soumettre = async (e) => {
    e.preventDefault();
    setEnvoi(true);
    try {
      await login({ email, password });
      navigate(destination);
    } catch (err) {
      const msg = err.response?.data?.message || 'Identifiants incorrects.';
      toast.current?.show({ severity: 'error', summary: 'Échec de connexion', detail: msg, life: 3500 });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast ref={toast} />
      <form className="auth-card" onSubmit={soumettre}>
        <h2 className="auth-card__title">Connexion</h2>
        <p className="auth-card__subtitle">Accédez à votre compte VYN'S DELIGHTS</p>

        <label className="auth-field">
          <span>Email</span>
          <InputText type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com" required />
        </label>

        <label className="auth-field">
          <span>Mot de passe</span>
          <Password value={password} onChange={(e) => setPassword(e.target.value)}
            feedback={false} toggleMask placeholder="Votre mot de passe" inputStyle={{ width: '100%' }}
            style={{ width: '100%' }} required />
        </label>

        <Button type="submit" label="Se connecter" icon="pi pi-sign-in"
          loading={envoi} className="auth-submit" />

        <p className="auth-switch">
          Pas de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}