import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);

  const [adresse, setAdresse] = useState(user?.address || '');
  const [envoi, setEnvoi] = useState(false);

  // Si le panier est vide (hors envoi en cours), on renvoie au catalogue
  useEffect(() => {
    if (items.length === 0 && !envoi) navigate('/catalogue');
  }, [items, envoi, navigate]);

  const passerCommande = async () => {
    if (!adresse.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Adresse requise',
        detail: 'Veuillez indiquer une adresse de livraison.', life: 3000 });
      return;
    }
    setEnvoi(true);
    try {
      const payload = {
        delivery_address: adresse,
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
      };
      const res = await api.post('/orders', payload);
      const orderId = res.data.data?.id ?? res.data.id;
      clearCart();
      navigate('/commande/confirmation', { state: { orderId } });
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors)[0][0]
        : (err.response?.data?.message || "La commande n'a pas pu être validée.");
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: msg, life: 4500 });
      setEnvoi(false);
    }
  };

  return (
    <div className="section">
      <Toast ref={toast} />
      <h2 className="section__title">Valider ma commande</h2>

      <div className="checkout-layout">
        <div className="checkout-form">
          <h3 className="checkout-block-title"><i className="pi pi-user" /> Coordonnées</h3>
          <div className="checkout-coords">
            <p><strong>{user?.name}</strong></p>
            <p>{user?.email}</p>
            {user?.phone && <p><i className="pi pi-phone" /> {user.phone}</p>}
          </div>

          <h3 className="checkout-block-title"><i className="pi pi-map-marker" /> Adresse de livraison</h3>
          <InputTextarea value={adresse} onChange={(e) => setAdresse(e.target.value)}
            rows={3} autoResize placeholder="Quartier, point de repère, ville…" style={{ width: '100%' }} />

          <h3 className="checkout-block-title"><i className="pi pi-wallet" /> Paiement</h3>
          <div className="checkout-payment">
            <i className="pi pi-money-bill" />
            <span>Paiement <strong>à la livraison</strong> (ou virement à confirmer avec l'administratrice).</span>
          </div>
        </div>

        <aside className="checkout-summary">
          <h3>Votre commande</h3>
          <ul className="checkout-items">
            {items.map((i) => (
              <li key={i.id}>
                <span className="checkout-items__qty">{i.quantity}×</span>
                <span className="checkout-items__name">{i.name}</span>
                <span className="checkout-items__price">
                  {(i.price * i.quantity).toLocaleString('fr-FR')} FCFA
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <span>{total.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <Button label="Confirmer la commande" icon="pi pi-check-circle"
            onClick={passerCommande} loading={envoi} className="checkout-cta" />
        </aside>
      </div>
    </div>
  );
}