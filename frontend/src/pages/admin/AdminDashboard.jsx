import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { adminService } from '../../services/admin';

const STATUT_LABELS = {
  pending: 'En attente', confirmed: 'Confirmée', preparing: 'En préparation',
  delivered: 'Livrée', cancelled: 'Annulée',
};
const STATUT_COLORS = {
  pending: '#9aa6bd', confirmed: '#3b82f6', preparing: '#f59e0b',
  delivered: '#22a35a', cancelled: '#b33a3a',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    Promise.all([adminService.getStats(), adminService.getCharts()])
      .then(([resStats, resCharts]) => {
        setStats(resStats.data);
        setCharts(resCharts.data);
      })
      .catch(() => setErreur("Impossible de charger le tableau de bord."))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) return <div className="section__center"><ProgressSpinner /></div>;
  if (erreur) return <p className="section__error">{erreur}</p>;

  const cards = [
    { icon: 'pi-clock', label: 'Commandes en attente', value: stats.commandes_en_attente, color: '#C0622A' },
    { icon: 'pi-shopping-bag', label: 'Total commandes', value: stats.total_commandes, color: '#1F3864' },
    { icon: 'pi-box', label: 'Produits au catalogue', value: stats.total_produits, color: '#2a8a4a' },
    { icon: 'pi-exclamation-triangle', label: 'Stock faible', value: stats.nb_produits_stock_bas, color: '#b33a3a' },
  ];

  // --- Graphique 1 : Top produits (barres horizontales) ---
  const topData = {
    labels: charts.top_produits.map((p) => p.name),
    datasets: [{
      label: 'Quantité vendue',
      data: charts.top_produits.map((p) => p.total),
      backgroundColor: '#C0622A',
      borderRadius: 6,
    }],
  };
  const topOptions = {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
  };

  // --- Graphique 2 : Commandes par statut (camembert) ---
  const statutKeys = Object.keys(charts.par_statut);
  const statutData = {
    labels: statutKeys.map((k) => STATUT_LABELS[k] || k),
    datasets: [{
      data: statutKeys.map((k) => charts.par_statut[k]),
      backgroundColor: statutKeys.map((k) => STATUT_COLORS[k] || '#999'),
    }],
  };
  const statutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };

  // --- Graphique 3 : CA 7 jours (courbe) ---
  const caData = {
    labels: charts.ca_7_jours.map((d) => d.jour),
    datasets: [{
      label: 'Chiffre d\'affaires (FCFA)',
      data: charts.ca_7_jours.map((d) => d.montant),
      borderColor: '#1F3864',
      backgroundColor: 'rgba(31,56,100,.12)',
      fill: true, tension: .35,
    }],
  };
  const caOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const aucunTop = charts.top_produits.length === 0;
  const aucunStatut = statutKeys.length === 0;

  return (
    <div>
      <h1 className="admin-title">Tableau de bord</h1>

      {/* Cartes de stats */}
      <div className="admin-stats">
        {cards.map((c) => (
          <div key={c.label} className="stat-card">
            <div className="stat-card__icon" style={{ background: c.color }}><i className={`pi ${c.icon}`} /></div>
            <div>
              <div className="stat-card__value">{c.value}</div>
              <div className="stat-card__label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="dashboard-charts">
        <div className="chart-card chart-card--wide">
          <h3 className="chart-card__title">Top 5 des produits vendus</h3>
          {aucunTop ? <p className="admin-empty">Aucune vente enregistrée pour l'instant.</p>
            : <div className="chart-box"><Chart type="bar" data={topData} options={topOptions} /></div>}
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Commandes par statut</h3>
          {aucunStatut ? <p className="admin-empty">Aucune commande.</p>
            : <div className="chart-box"><Chart type="doughnut" data={statutData} options={statutOptions} /></div>}
        </div>

        <div className="chart-card chart-card--wide">
          <h3 className="chart-card__title">Chiffre d'affaires — 7 derniers jours</h3>
          <div className="chart-box"><Chart type="line" data={caData} options={caOptions} /></div>
        </div>
      </div>

      {/* Alerte stock faible */}
      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2><i className="pi pi-exclamation-triangle" /> Alerte stock faible (≤ 5)</h2>
          <Link to="/admin/produits" className="admin-panel__link">Gérer les produits →</Link>
        </div>
        {stats.produits_stock_bas.length === 0 ? (
          <p className="admin-empty">Aucun produit en stock faible. 👍</p>
        ) : (
          <ul className="stock-alert-list">
            {stats.produits_stock_bas.map((p) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <Tag severity={p.stock_quantity === 0 ? 'danger' : 'warning'}
                  value={p.stock_quantity === 0 ? 'Rupture' : `${p.stock_quantity} restant(s)`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}