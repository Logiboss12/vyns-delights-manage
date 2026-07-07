import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';

// Correspondance statut technique → libellé + couleur (charte VYN'S)
const STATUTS = {
  pending:   { label: 'En attente',     severity: 'secondary' },
  confirmed: { label: 'Confirmée',      severity: 'info' },
  preparing: { label: 'En préparation', severity: 'warning' },
  delivered: { label: 'Livrée',         severity: 'success' },
  cancelled: { label: 'Annulée',        severity: 'danger' },
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data.data ?? res.data))
      .catch(() => setErreur('Impossible de charger vos commandes.'))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) return <div className="section section__center"><ProgressSpinner /></div>;

  return (
    <div className="section">
      <h2 className="section__title">Mes commandes</h2>

      {erreur && <p className="section__error">{erreur}</p>}

      {!erreur && orders.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#777' }}>Vous n'avez pas encore passé de commande.</p>
          <Link to="/catalogue"><Button label="Voir le catalogue" icon="pi pi-book" /></Link>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => {
          const st = STATUTS[order.status] || { label: order.status, severity: 'secondary' };
          const date = order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric',
          }) : '';
          return (
            <article key={order.id} className="order-card">
              <div className="order-card__head">
                <div>
                  <span className="order-card__id">Commande n° {order.id}</span>
                  <span className="order-card__date">{date}</span>
                </div>
                <Tag value={st.label} severity={st.severity} />
              </div>
              {order.items && (
                <ul className="order-card__items">
                  {order.items.map((it) => (
                    <li key={it.id}>
                      {it.quantity}× {it.product_name}
                      <span>{(it.subtotal ?? it.unit_price * it.quantity).toLocaleString('fr-FR')} FCFA</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="order-card__foot">
                <span><i className="pi pi-map-marker" /> {order.delivery_address}</span>
                <strong>{Number(order.total_amount).toLocaleString('fr-FR')} FCFA</strong>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}