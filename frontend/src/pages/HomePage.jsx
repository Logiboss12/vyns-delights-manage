import { useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';
import ProductCard from '../components/products/ProductCard';
import HeroSlider from '../components/home/HeroSlider';
import Features from '../components/home/Features';
import Events from '../components/home/Events';
import Testimonials from '../components/home/Testimonials';
import CtaBand from '../components/home/CtaBand';
import About from '../components/home/About';
export default function HomePage() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then((res) => setProduits(res.data.data.slice(0, 8)))
      .catch(() => setErreur("Impossible de charger les plats. Le serveur Laravel est-il démarré ?"))
      .finally(() => setChargement(false));
  }, []);

  return (
    <div>
      <HeroSlider />
      
      <About />
      <Features />
      <section className="section">
        <h2 className="section__title">Nos plats populaires</h2>
        {chargement && <div className="section__center"><ProgressSpinner /></div>}
        {erreur && <p className="section__error">{erreur}</p>}
        {!chargement && !erreur && (
          <div className="products-grid">
            {produits.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <Events />
      <Testimonials />
      <CtaBand />
    </div>
  );
}