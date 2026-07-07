import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { count } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const userMenu = useRef(null);

  // Liens principaux (centre du menu)
  const items = [
    { label: 'Accueil', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Catalogue', icon: 'pi pi-book', command: () => navigate('/catalogue') },
  ];
  if (isAuthenticated) {
    items.push({ label: 'Mes commandes', icon: 'pi pi-list', command: () => navigate('/mes-commandes') });
    if (isAdmin) items.push({ label: 'Admin', icon: 'pi pi-cog', command: () => navigate('/admin') });
  }

  // Logo (gauche)
  const start = <Link to="/" className="vyns-logo">VYN'S DELIGHTS</Link>;

  const initiales = (nom) =>
    nom.split(' ').map((m) => m[0]).join('').slice(0, 2).toUpperCase();

  // Menu déroulant de l'avatar
  const userMenuItems = [
    { template: () => (
      <div className="vyns-user__header">
        <Avatar label={initiales(user.name)} shape="circle" className="vyns-avatar" />
        <div>
          <div className="vyns-user__fullname">{user.name}</div>
          <div className="vyns-user__email">{user.email}</div>
        </div>
      </div>
    ) },
    { separator: true },
    { label: 'Mes commandes', icon: 'pi pi-list', command: () => navigate('/mes-commandes') },
    ...(isAdmin ? [{ label: 'Espace admin', icon: 'pi pi-cog', command: () => navigate('/admin') }] : []),
    { separator: true },
    { label: 'Déconnexion', icon: 'pi pi-sign-out',
      command: async () => { await logout(); navigate('/'); } },
  ];

  // Zone de droite (panier + avatar OU boutons connexion)
  const end = (
    <div className="vyns-end">
      <button className="vyns-cart-btn" onClick={() => navigate('/panier')} aria-label="Panier">
        <i className="pi pi-shopping-cart" />
        {count > 0 && <span className="vyns-cart-badge">{count}</span>}
      </button>

      {isAuthenticated ? (
        <>
          <Menu model={userMenuItems} popup ref={userMenu} className="vyns-user-menu" />
          <button className="vyns-user__btn" onClick={(e) => userMenu.current.toggle(e)}>
            <Avatar label={initiales(user.name)} shape="circle" className="vyns-avatar" />
            <span className="vyns-user__name">{user.name.split(' ')[0]}</span>
            <i className="pi pi-angle-down" />
          </button>
        </>
      ) : (
        <div className="vyns-auth-actions">
          <Button label="Connexion" icon="pi pi-sign-in" text onClick={() => navigate('/connexion')} />
          <Button label="Inscription" icon="pi pi-user-plus" onClick={() => navigate('/inscription')} />
        </div>
      )}
    </div>
  );

  return (
    <div className="vyns-menubar-wrap">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}