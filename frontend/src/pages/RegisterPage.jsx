import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    password: '', password_confirmation: '',
  });
  const [envoi, setEnvoi] = useState(false);

  const maj = (champ) => (e) =>
    setForm((f) => ({ ...f, [champ]: e.target ? e.target.value : e.value }));

  const soumettre = async (e) => {
    e.preventDefault();
    setEnvoi(true);
    try {
      await register(form);
      toast.current?.show({ severity: 'success', summary: 'Bienvenue !', detail: 'Compte créé avec succès.', life: 2500 });
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      const erreurs = err.response?.data?.errors;
      const msg = erreurs ? Object.values(erreurs)[0][0]
        : (err.response?.data?.message || "L'inscription a échoué.");
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: msg, life: 4000 });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast ref={toast} />
      <form className="auth-card" onSubmit={soumettre}>
        <h2 className="auth-card__title">Créer un compte</h2>
        <p className="auth-card__subtitle">Rejoignez VYN'S DELIGHTS en un instant</p>

        <label className="auth-field">
          <span>Nom complet</span>
          <InputText value={form.name} onChange={maj('name')} placeholder="Votre nom" required />
        </label>
        <label className="auth-field">
          <span>Email</span>
          <InputText type="email" value={form.email} onChange={maj('email')} placeholder="vous@exemple.com" required />
        </label>
        <div className="auth-row">
          <label className="auth-field">
            <span>Téléphone</span>
            <InputText value={form.phone} onChange={maj('phone')} placeholder="690 00 00 00" />
          </label>
          <label className="auth-field">
            <span>Adresse</span>
            <InputText value={form.address} onChange={maj('address')} placeholder="Quartier, Bertoua" />
          </label>
        </div>
        <label className="auth-field">
          <span>Mot de passe</span>
          <Password value={form.password} onChange={maj('password')} toggleMask
            placeholder="Au moins 8 caractères" inputStyle={{ width: '100%' }} style={{ width: '100%' }}
            promptLabel="Choisissez un mot de passe" weakLabel="Faible" mediumLabel="Moyen" strongLabel="Fort" required />
        </label>
        <label className="auth-field">
          <span>Confirmer le mot de passe</span>
          <Password value={form.password_confirmation} onChange={maj('password_confirmation')}
            feedback={false} toggleMask placeholder="Retapez le mot de passe"
            inputStyle={{ width: '100%' }} style={{ width: '100%' }} required />
        </label>

        <Button type="submit" label="Créer mon compte" icon="pi pi-user-plus"
          loading={envoi} className="auth-submit" />

        <p className="auth-switch">
          Déjà inscrit ? <Link to="/connexion">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}