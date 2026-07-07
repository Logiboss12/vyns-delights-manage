import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { adminService } from '../../services/admin';
import { FileUpload } from 'primereact/fileupload';



const FALLBACK = 'https://placehold.co/80x60/F3E1D3/C0622A?text=VYN%27S';
const vide = { name: '', category_id: null, description: '', price: 0, stock_quantity: 0, is_available: true, image_url: '' };

export default function AdminProducts() {
  const toast = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(vide);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      let page = 1, all = [], last = 1;
      do {
        const res = await adminService.getProducts(page);
        all = all.concat(res.data.data);
        last = res.data.meta?.last_page ?? 1;
        page++;
      } while (page <= last);
      setProducts(all);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible.' });
    } finally { setLoading(false); }
  };

  useEffect(() => {
    loadAll();
    adminService.getCategories().then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  const openNew = () => { setProduct(vide); setErrors({}); setVisible(true); };
  const openEdit = (row) => {
    setProduct({
      id: row.id, name: row.name, category_id: row.category?.id ?? null,
      description: row.description, price: Number(row.price),
      stock_quantity: row.stock_quantity, is_available: row.is_available, image_url: row.image_url || '',
    });
    setErrors({}); setVisible(true);
  };

  const save = async () => {
    setSaving(true); setErrors({});
    try {
      if (product.id) await adminService.updateProduct(product.id, product);
      else await adminService.createProduct(product);
      toast.current?.show({ severity: 'success', summary: 'Enregistré', detail: 'Produit sauvegardé.' });
      setVisible(false); loadAll();
    } catch (err) {
      if (err.response?.status === 422) setErrors(err.response.data.errors || {});
      else toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement impossible.' });
    } finally { setSaving(false); }
  };
   
  const handleUpload = async (event) => {
    const file = event.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminService.uploadImage(file);
      setProduct((p) => ({ ...p, image_url: res.data.url }));
      toast.current?.show({ severity: 'success', summary: 'Image téléversée', detail: 'Photo ajoutée au produit.' });
    } catch (err) {
      const msg = err.response?.data?.errors?.image?.[0] || "Échec du téléversement.";
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: msg });
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (row) => confirmDialog({
    message: `Supprimer « ${row.name} » ?`, header: 'Confirmation', icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Supprimer', rejectLabel: 'Annuler', acceptClassName: 'p-button-danger',
    accept: async () => {
      try {
        await adminService.deleteProduct(row.id);
        toast.current?.show({ severity: 'success', summary: 'Supprimé', detail: 'Produit supprimé.' });
        loadAll();
      } catch {
        toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Suppression impossible.' });
      }
    },
  });

  const imageBody = (r) => <img src={r.image_url || FALLBACK} alt={r.name} className="admin-thumb"
    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }} />;
  const priceBody = (r) => `${Number(r.price).toLocaleString('fr-FR')} FCFA`;
  const categoryBody = (r) => r.category?.name || '—';
  const stockBody = (r) => <Tag value={r.stock_quantity}
    severity={r.stock_quantity === 0 ? 'danger' : r.stock_quantity <= 5 ? 'warning' : 'success'} />;
  const availBody = (r) => <Tag value={r.is_available ? 'Oui' : 'Non'} severity={r.is_available ? 'success' : 'secondary'} />;
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
        <h1 className="admin-title">Gestion des produits</h1>
        <Button label="Nouveau produit" icon="pi pi-plus" onClick={openNew} />
      </div>

      <DataTable value={products} loading={loading} paginator rows={10} rowsPerPageOptions={[10, 20, 50]}
        dataKey="id" stripedRows emptyMessage="Aucun produit." className="admin-table">
        <Column header="Image" body={imageBody} style={{ width: '90px' }} />
        <Column field="name" header="Nom" sortable />
        <Column header="Catégorie" body={categoryBody} sortable sortField="category.name" />
        <Column header="Prix" body={priceBody} sortable sortField="price" />
        <Column header="Stock" body={stockBody} sortable sortField="stock_quantity" />
        <Column header="Dispo" body={availBody} />
        <Column header="Actions" body={actionsBody} style={{ width: '110px' }} />
      </DataTable>

      <Dialog visible={visible} header={product.id ? 'Modifier le produit' : 'Nouveau produit'} modal
        style={{ width: '480px' }} footer={footer} onHide={() => setVisible(false)}>
        <div className="admin-form">
          <label>Nom
            <InputText value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            {err('name')}
          </label>
          <label>Catégorie
            <Dropdown value={product.category_id} options={categories} optionLabel="name" optionValue="id"
              onChange={(e) => setProduct({ ...product, category_id: e.value })} placeholder="Choisir une catégorie" />
            {err('category_id')}
          </label>
          <label>Description
            <InputTextarea value={product.description} rows={3} autoResize
              onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            {err('description')}
          </label>
          <div className="admin-form__row">
            <label>Prix (FCFA)
              <InputNumber value={product.price} onValueChange={(e) => setProduct({ ...product, price: e.value ?? 0 })} min={0} />
              {err('price')}
            </label>
            <label>Stock
              <InputNumber value={product.stock_quantity} onValueChange={(e) => setProduct({ ...product, stock_quantity: e.value ?? 0 })} min={0} showButtons />
              {err('stock_quantity')}
            </label>
          </div>
          <label>Image du produit
            <InputText value={product.image_url}
              onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
              placeholder="Collez une URL ou téléversez une photo ci-dessous" />
            {err('image_url')}
          </label>

          <div className="admin-upload">
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={2000000}
              customUpload
              auto
              chooseLabel={uploading ? 'Envoi…' : 'Téléverser une photo'}
              chooseOptions={{ icon: 'pi pi-upload' }}
              uploadHandler={handleUpload}
              disabled={uploading}
            />
            {product.image_url && (
              <img className="admin-upload__preview" src={product.image_url} alt="Aperçu"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            )}
          </div>
          <label className="admin-form__switch">
            <span>Disponible à la vente</span>
            <InputSwitch checked={product.is_available} onChange={(e) => setProduct({ ...product, is_available: e.value })} />
          </label>
        </div>
      </Dialog>
    </div>
  );
}