import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1280&h=600&fit=crop',
    title: 'Vos plats préférés, livrés à Bertoua',
    subtitle: "La cuisine maison de VYN'S DELIGHTS, fraîche et savoureuse.",
    cta: 'Voir le catalogue', to: '/catalogue',
  },
  {
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1280&h=600&fit=crop',
    title: 'Des saveurs authentiques',
    subtitle: 'Poulet DG, Ndolè, poisson braisé… vos classiques préparés avec soin.',
    cta: 'Commander maintenant', to: '/catalogue',
  },
  {
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1280&h=600&fit=crop',
    title: 'Douceurs & pâtisseries maison',
    subtitle: 'Gâteaux, entremets et jus naturels préparés avec passion.',
    cta: 'Découvrir', to: '/catalogue',
  },
];
export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="hero-slider">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? 'is-active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(31,56,100,.55), rgba(31,56,100,.55)), url(${s.image})` }}
        >
          <div className="hero-slide__content">
            <h1 className="hero-slide__title">{s.title}</h1>
            <p className="hero-slide__subtitle">{s.subtitle}</p>
            <Link to={s.to}>
              <Button label={s.cta} icon="" iconPos="right" size="large" />
            </Link>
          </div>
        </div>
      ))}

      <button className="hero-arrow hero-arrow--prev" onClick={prev} aria-label="Précédent">
        <i className="pi pi-chevron-left" />
      </button>
      <button className="hero-arrow hero-arrow--next" onClick={next} aria-label="Suivant">
        <i className="pi pi-chevron-right" />
      </button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Diapositive ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}