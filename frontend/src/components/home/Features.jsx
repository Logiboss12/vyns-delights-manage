const FEATURES = [
  { icon: 'pi-truck', title: 'Livraison à Bertoua', text: 'Vos plats livrés rapidement, chauds et prêts à déguster.' },
  { icon: 'pi-heart-fill', title: 'Cuisine maison', text: 'Des recettes authentiques préparées avec passion.' },
  { icon: 'pi-check-circle', title: 'Produits frais', text: 'Des ingrédients de qualité sélectionnés chaque jour.' },
  { icon: 'pi-wallet', title: 'Paiement à la livraison', text: 'Payez en toute simplicité à la réception.' },
];

export default function Features() {
  return (
    <section className="features">
      {FEATURES.map((f) => (
        <div key={f.title} className="feature">
          <div className="feature__icon"><i className={`pi ${f.icon}`} /></div>
          <h3 className="feature__title">{f.title}</h3>
          <p className="feature__text">{f.text}</p>
        </div>
      ))}
    </section>
  );
}