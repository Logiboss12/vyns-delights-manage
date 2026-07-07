import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const FALLBACK = 'https://placehold.co/640x480/F3E1D3/C0622A?text=VYN%27S+DELIGHTS';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const toast = useRef(null);

  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    api.get(`/products/${id}`)
      .then((res) => setProduit(res.data.data ?? res.data))
      .catch(() => setErreur("Ce produit est introuvable."))
      .finally(() => setChargement(false));
  }, [id]);

  if (chargement) return <div className="section section__center"><ProgressSpinner /></div>;
  if (erreur) return (
    <div className="section" style={{ textAlign: 'center' }}>
      <p className="section__error">{erreur}</p>
      <Link to="/catalogue"><Button label="Retour au catalogue" icon="pi pi-arrow-left" /></Link>
    </div>
  );

  const prix = Number(produit.price).toLocaleString('fr-FR');
  const enStock = produit.stock_quantity > 0;

  const ajouter = () => {
    addToCart(produit, quantite);
    toast.current?.show({
      severity: 'success', summary: 'Ajouté au panier',
      detail: `${quantite} × ${produit.name}`, life: 2500,
    });
  };

  return (
    <div className="section">
      <Toast ref={toast} />
      

      <div className="detail">
        <div className="detail__img">
          <img src={produit.image_url || FALLBACK} alt={produit.name}
            onError={(e) => { e.currentTarget.src = FALLBACK; }} />
        </div>
        <div className="detail__info">
          {produit.category && <span className="detail__cat">{produit.category.name}</span>}
          <h1 className="detail__name">{produit.name}</h1>
          <p className="detail__price">{prix} FCFA</p>

          {enStock
            ? <Tag severity="success" value={`En stock (${produit.stock_quantity} disponibles)`} />
            : <Tag severity="danger" value="Rupture de stock" />}

          <p className="detail__desc">{produit.description}</p>

          {enStock && (
            <div className="detail__actions">
              <InputNumber value={quantite} onValueChange={(e) => setQuantite(e.value || 1)}
                showButtons min={1} max={produit.stock_quantity} buttonLayout="horizontal"
                decrementButtonIcon="pi pi-minus" incrementButtonIcon="pi pi-plus"
                inputStyle={{ width: '3rem', textAlign: 'center' }} />
              <Button label="Ajouter au panier" icon="pi pi-shopping-cart" onClick={ajouter} size="large" />
            </div>
          )}
        </div>
      </div>
      <Link to="/catalogue" className="detail-back"><i className="pi pi-arrow-left" /> Retour au catalogue</Link>
    </div>
  );
}