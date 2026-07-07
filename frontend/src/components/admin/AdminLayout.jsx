import { NavLink, Outlet } from 'react-router-dom';
import './Admin.css';
export default function AdminLayout() {
  const linkClass = ({ isActive }) => (isActive ? 'is-active' : '');
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__title">Espace Admin</div>
        <nav className="admin-sidebar__nav">
          <NavLink to="/admin" end className={linkClass}><i className="pi pi-th-large" /> Tableau de bord</NavLink>
          <NavLink to="/admin/produits" className={linkClass}><i className="pi pi-box" /> Produits</NavLink>
          <NavLink to="/admin/commandes" className={linkClass}><i className="pi pi-shopping-bag" /> Commandes</NavLink>
          <NavLink to="/admin/evenements" className={linkClass}><i className="pi pi-megaphone" /> Événements</NavLink>
        </nav>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}