import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useCart } from '../context/CartContext';

const FALLBACK = 'https://placehold.co/200x150/F3E1D3/C0622A?text=VYN%27S';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="section" style={{ textAlign: 'center' }}>
        <h2 className="section__title">Votre panier</h2>
        <i className="pi pi-shopping-cart" style={{ fontSize: '3rem', color: 'var(--vyns-cream)' }} />
        <p style={{ color: '#777', margin: '1rem 0 1.5rem' }}>Votre panier est vide.</p>
        <Link to="/catalogue">
          <Button label="Parcourir le catalogue" icon="pi pi-arrow-left" />
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="section__title">Votre panier ({count} article{count > 1 ? 's' : ''})</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img className="cart-item__img" src={item.image_url || FALLBACK} alt={item.name}
                onError={(e) => { e.currentTarget.src = FALLBACK; }} />
              <div className="cart-item__info">
                <Link to={`/produit/${item.id}`} className="cart-item__name">{item.name}</Link>
                <span className="cart-item__unit">{Number(item.price).toLocaleString('fr-FR')} FCFA / unité</span>
              </div>
              <InputNumber value={item.quantity}
                onValueChange={(e) => updateQuantity(item.id, e.value || 1)}
                showButtons buttonLayout="horizontal" min={1} max={item.stock_quantity}
                decrementButtonIcon="pi pi-minus" incrementButtonIcon="pi pi-plus"
                inputStyle={{ width: '2.5rem', textAlign: 'center' }} />
              <span className="cart-item__subtotal">
                {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
              </span>
              <Button icon="pi pi-trash" rounded text severity="danger"
                onClick={() => removeFromCart(item.id)} aria-label="Supprimer" />
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Récapitulatif</h3>
          <div className="cart-summary__row">
            <span>Sous-total</span>
            <span>{total.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="cart-summary__row">
            <span>Livraison</span>
            <span>À convenir</span>
          </div>
          <div className="cart-summary__total">
            <span>Total</span>
            <span>{total.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <Button label="Valider la commande" icon="pi pi-check" className="cart-summary__cta"
            onClick={() => navigate('/commande')} />
          <Link to="/catalogue" className="cart-summary__continue">
            <i className="pi pi-arrow-left" /> Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}