import { Carousel } from 'primereact/carousel';
import { Rating } from 'primereact/rating';

const AVIS = [
  { nom: 'Aïcha M.', note: 5, texte: 'Le Poulet DG était délicieux et livré très rapidement. Je recommande !' },
  { nom: 'Jean-Paul K.', note: 5, texte: 'Enfin un service fiable à Bertoua. Les plats sont copieux et savoureux.' },
  { nom: 'Sandrine T.', note: 4, texte: 'Très bon Ndolè, exactement comme à la maison.' },
  { nom: 'Modeste E.', note: 5, texte: 'Commande simple, paiement à la livraison, plats excellents. Bravo !' },
];

const responsive = [
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '640px', numVisible: 1, numScroll: 1 },
];

const initiales = (nom) => nom.split(' ').map((m) => m[0]).join('').slice(0, 2).toUpperCase();

const avisTemplate = (avis) => (
  <div className="avis">
    <div className="avis__header">
      <div className="avis__avatar">{initiales(avis.nom)}</div>
      <div>
        <div className="avis__nom">{avis.nom}</div>
        <Rating value={avis.note} readOnly cancel={false} />
      </div>
    </div>
    <p className="avis__texte">« {avis.texte} »</p>
  </div>
);

export default function Testimonials() {
  return (
    <section className="band-cream">
      <div className="section">
        <h2 className="section__title">Ce que disent nos clients</h2>
        <Carousel
          value={AVIS}
          itemTemplate={avisTemplate}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsive}
          circular
          autoplayInterval={4000}
        />
      </div>
    </section>
  );
}