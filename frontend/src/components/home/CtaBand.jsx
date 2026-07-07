import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band__content">
        <h2>Prêt à vous régaler ?</h2>
        <p>Parcourez notre catalogue et passez commande en quelques clics.</p>
        <Link to="/catalogue">
          <Button label="Commander maintenant" icon="pi pi-shopping-cart" size="large" />
        </Link>
      </div>
    </section>
  );
}