import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useCart } from '../../context/CartContext';

const FALLBACK = 'https://placehold.co/640x480/F3E1D3/C0622A?text=VYN%27S+DELIGHTS';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [ajoute, setAjoute] = useState(false);
  const prix = Number(product.price).toLocaleString('fr-FR');
  const rupture = product.stock_quantity <= 0;

  const ajouter = () => {
    addToCart(product, 1);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/produit/${product.id}`} className="product-card__img">
        <img src={product.image_url || FALLBACK} alt={product.name} loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK; }} />
        {rupture && <span className="product-card__rupture">Rupture</span>}
      </Link>
      <div className="product-card__body">
        <Link to={`/produit/${product.id}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__price">{prix} FCFA</p>
        <Button
          label={ajoute ? 'Ajouté ✓' : 'Ajouter'}
          icon={ajoute ? 'pi pi-check' : 'pi pi-shopping-cart'}
          className="product-card__btn"
          disabled={rupture}
          onClick={ajouter}
        />
      </div>
    </div>
  );
}