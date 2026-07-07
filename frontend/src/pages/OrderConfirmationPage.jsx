import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="section confirmation">
      <div className="confirmation__icon"><i className="pi pi-check" /></div>
      <h2 className="confirmation__title">Commande confirmée !</h2>
      <p className="confirmation__text">
        Merci pour votre commande{orderId ? ` (n° ${orderId})` : ''}. Elle est en attente de
        confirmation par l'administratrice. Vous pouvez suivre son statut dans « Mes commandes ».
      </p>
      <div className="confirmation__actions">
        <Link to="/mes-commandes"><Button label="Suivre ma commande" icon="pi pi-list" /></Link>
        <Link to="/catalogue"><Button label="Continuer mes achats" icon="pi pi-arrow-left" text /></Link>
      </div>
    </div>
  );
}