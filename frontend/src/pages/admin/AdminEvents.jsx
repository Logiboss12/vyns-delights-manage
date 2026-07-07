import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { adminService } from '../../services/admin';

const FALLBACK = 'https://placehold.co/80x60/F3E1D3/C0622A?text=VYN%27S';
const TYPES = [
  { label: 'Promotion', value: 'promo' },
  { label: 'Service / prestation', value: 'service' },
  { label: 'Nouveauté', value: 'nouveaute' },
];
const SEVERITY = { promo: 'danger', service: 'info', nouveaute: 'success' };
const vide = { title: '', description: '', type: 'promo', badge: '', date_label: '', image_url: '', is_active: true };

export default function AdminEvents() {
  const toast = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState(vide);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminService.getEvents()
      .then((res) => setEvents(res.data.data ?? res.data))
      .catch(() => toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible.' }))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEvent(vide); setErrors({}); setVisible(true); };
  const openEdit = (row) => { setEvent({ ...row }); setErrors({}); setVisible(true); };

  const save = async () => {
    setSaving(true); setErrors({});
    try {
      if (event.id) await adminService.updateEvent(event.id, event);
      else await adminService.createEvent(event);
      toast.current?.show({ severity: 'success', summary: 'Enregistré', detail: 'Événement sauvegardé.' });
      setVisible(false); load();
    } catch (err) {
      if (err.response?.status === 422) setErrors(err.response.data.errors || {});
      else toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement impossible.' });
    } finally { setSaving(false); }
  };

  const confirmDelete = (row) => confirmDialog({
    message: `Supprimer « ${row.title} » ?`, header: 'Confirmation', icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Supprimer', rejectLabel: 'Annuler', acceptClassName: 'p-button-danger',
    accept: async () => {
      try {
        await adminService.deleteEvent(row.id);
        toast.current?.show({ severity: 'success', summary: 'Supprimé' });
        load();
      } catch {
        toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Suppression impossible.' });
      }
    },
  });

  const imageBody = (r) => <img src={r.image_url || FALLBACK} alt={r.title} className="admin-thumb"
    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }} />;
  const typeBody = (r) => <Tag value={r.badge || r.type} severity={SEVERITY[r.type] || 'warning'} />;
  const activeBody = (r) => <Tag value={r.is_active ? 'Actif' : 'Inactif'} severity={r.is_active ? 'success' : 'secondary'} />;
  const actionsBody = (r) => (
    <div className="admin-actions">
      <Button icon="pi pi-pencil" rounded text onClick={() => openEdit(r)} aria-label="Modifier" />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(r)} aria-label="Supprimer" />
    </div>
  );

  const footer = (
    <>
      <Button label="Annuler" icon="pi pi-times" text onClick={() => setVisible(false)} />
      <Button label="Enregistrer" icon="pi pi-check" onClick={save} loading={saving} />
    </>
  );
  const err = (f) => errors[f] ? <small className="p-error">{errors[f][0]}</small> : null;

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="admin-page-head">
        <h1 className="admin-title">Événements & promotions</h1>
        <Button label="Nouvel événement" icon="pi pi-plus" onClick={openNew} />
      </div>

      <DataTable value={events} loading={loading} dataKey="id" stripedRows paginator rows={10}
        emptyMessage="Aucun événement." className="admin-table">
        <Column header="Image" body={imageBody} style={{ width: '90px' }} />
        <Column field="title" header="Titre" sortable />
        <Column header="Type" body={typeBody} />
        <Column field="date_label" header="Quand" />
        <Column header="Statut" body={activeBody} />
        <Column header="Actions" body={actionsBody} style={{ width: '110px' }} />
      </DataTable>

      <Dialog visible={visible} header={event.id ? "Modifier l'événement" : 'Nouvel événement'} modal
        style={{ width: '500px' }} footer={footer} onHide={() => setVisible(false)}>
        <div className="admin-form">
          <label>Titre
            <InputText value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
            {err('title')}
          </label>
          <label>Description
            <InputTextarea value={event.description} rows={3} autoResize
              onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            {err('description')}
          </label>
          <div className="admin-form__row">
            <label>Type
              <Dropdown value={event.type} options={TYPES} optionLabel="label" optionValue="value"
                onChange={(e) => setEvent({ ...event, type: e.value })} />
              {err('type')}
            </label>
            <label>Badge
              <InputText value={event.badge || ''} onChange={(e) => setEvent({ ...event, badge: e.target.value })}
                placeholder="Ex : Promo, Nouveau" />
            </label>
          </div>
          <label>Libellé de date
            <InputText value={event.date_label || ''} onChange={(e) => setEvent({ ...event, date_label: e.target.value })}
              placeholder="Ex : Ce week-end, Sur réservation" />
          </label>
          <label>URL de l'image
            <InputText value={event.image_url || ''} onChange={(e) => setEvent({ ...event, image_url: e.target.value })}
              placeholder="https://..." />
          </label>
          <label className="admin-form__switch">
            <span>Actif (visible sur le site)</span>
            <InputSwitch checked={event.is_active} onChange={(e) => setEvent({ ...event, is_active: e.value })} />
          </label>
        </div>
      </Dialog>
    </div>
  );
}