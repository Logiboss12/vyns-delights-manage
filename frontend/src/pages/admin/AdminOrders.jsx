import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { adminService } from '../../services/admin';

const STATUTS = {
  pending: { label: 'En attente', severity: 'secondary' },
  confirmed: { label: 'Confirmée', severity: 'info' },
  preparing: { label: 'En préparation', severity: 'warning' },
  delivered: { label: 'Livrée', severity: 'success' },
  cancelled: { label: 'Annulée', severity: 'danger' },
};
const options = Object.entries(STATUTS).map(([value, o]) => ({ value, label: o.label }));

export default function AdminOrders() {
  const toast = useRef(null);
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [current, setCurrent] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = (p = 1) => {
    setLoading(true);
    adminService.getOrders(p)
      .then((res) => { setOrders(res.data.data); setMeta(res.data.meta); })
      .catch(() => toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible.' }))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openStatus = (o) => { setCurrent(o); setNewStatus(o.status); setDialog(true); };
  const saveStatus = async () => {
    setSaving(true);
    try {
      await adminService.updateOrderStatus(current.id, newStatus);
      toast.current?.show({ severity: 'success', summary: 'Statut mis à jour' });
      setDialog(false); load(page);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Mise à jour impossible.' });
    } finally { setSaving(false); }
  };

  const clientBody = (o) => o.client?.name || '—';
  const dateBody = (o) => o.created_at ? new Date(o.created_at).toLocaleDateString('fr-FR') : '';
  const totalBody = (o) => `${Number(o.total_amount).toLocaleString('fr-FR')} FCFA`;
  const statusBody = (o) => {
    const s = STATUTS[o.status] || { label: o.status, severity: 'secondary' };
    return <Tag value={s.label} severity={s.severity} />;
  };
  const actionsBody = (o) => <Button icon="pi pi-pencil" label="Statut" size="small" text onClick={() => openStatus(o)} />;

  const rowExpansion = (o) => (
    <div className="order-expansion">
      <h4>Détail de la commande n° {o.id}</h4>
      <ul>
        {(o.items || []).map((it) => (
          <li key={it.id}>{it.quantity}× {it.product_name} <span>{Number(it.subtotal).toLocaleString('fr-FR')} FCFA</span></li>
        ))}
      </ul>
      <p><i className="pi pi-map-marker" /> {o.delivery_address}</p>
    </div>
  );

  const footer = (
    <>
      <Button label="Annuler" text onClick={() => setDialog(false)} />
      <Button label="Enregistrer" icon="pi pi-check" onClick={saveStatus} loading={saving} />
    </>
  );

  const perPage = meta?.per_page ?? 15;

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="admin-title">Gestion des commandes</h1>

      <DataTable value={orders} loading={loading} dataKey="id" stripedRows
        expandedRows={expanded} onRowToggle={(e) => setExpanded(e.data)} rowExpansionTemplate={rowExpansion}
        lazy paginator rows={perPage} first={(page - 1) * perPage} totalRecords={meta?.total ?? 0}
        onPage={(e) => setPage(Math.floor(e.first / e.rows) + 1)}
        emptyMessage="Aucune commande." className="admin-table">
        <Column expander style={{ width: '3rem' }} />
        <Column field="id" header="N°" style={{ width: '70px' }} />
        <Column header="Client" body={clientBody} />
        <Column header="Date" body={dateBody} />
        <Column header="Total" body={totalBody} />
        <Column header="Statut" body={statusBody} />
        <Column header="Action" body={actionsBody} style={{ width: '120px' }} />
      </DataTable>

      <Dialog visible={dialog} header={`Commande n° ${current?.id}`} modal style={{ width: '360px' }}
        footer={footer} onHide={() => setDialog(false)}>
        <div className="admin-form">
          <label>Nouveau statut
            <Dropdown value={newStatus} options={options} optionLabel="label" optionValue="value"
              onChange={(e) => setNewStatus(e.value)} />
          </label>
        </div>
      </Dialog>
    </div>
  );
}