import { Link } from 'react-router-dom';

export default function Footer() {
  const annee = new Date().getFullYear();

  // ⚠️ Remplace par le vrai numéro WhatsApp (format international, sans +, ni espaces)
  const whatsappNumber = '237690000000';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour VYN'S DELIGHTS, je souhaite passer une commande.")}`;

  return (
    <footer className="vyns-footer">
      <div className="vyns-footer__grid">

        {/* Colonne 1 — Marque */}
        <div className="vyns-footer__brand">
          <span className="vyns-footer__logo">VYN'S DELIGHTS</span>
          <p className="vyns-footer__tagline">
            Pâtisserie & cuisine maison à Bertoua. Vos plats et gâteaux préparés avec passion,
            pour tous vos événements du quotidien.
          </p>
          <div className="vyns-footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="vyns-social">
              <i className="pi pi-facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="vyns-social">
              <i className="pi pi-instagram" />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="vyns-social vyns-social--wa">
              <i className="pi pi-whatsapp" />
            </a>
          </div>
        </div>

        {/* Colonne 2 — Liens rapides */}
        <div className="vyns-footer__col">
          <h4 className="vyns-footer__title">Liens rapides</h4>
          <ul className="vyns-footer__links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/panier">Panier</Link></li>
            <li><Link to="/mes-commandes">Mes commandes</Link></li>
            <li><Link to="/connexion">Connexion</Link></li>
          </ul>
        </div>

        {/* Colonne 3 — Nos services */}
        {/* Colonne 3 — Nos services */}
        <div className="vyns-footer__col">
          <h4 className="vyns-footer__title">Nos services</h4>
          <ul className="vyns-footer__links">
            <li><Link to="/catalogue?univers=Pâtisserie">Pâtisserie</Link></li>
            <li><Link to="/catalogue?univers=Cuisine">Cuisine & traiteur</Link></li>
            <li><Link to="/catalogue?cat=Gâteaux événementiels">Gâteaux événementiels</Link></li>
            <li><Link to="/catalogue?cat=Viennoiseries">Viennoiseries</Link></li>
            <li><Link to="/catalogue">Tout le catalogue</Link></li>
          </ul>
        </div>

        {/* Colonne 4 — Contact */}
        <div className="vyns-footer__col">
          <h4 className="vyns-footer__title">Contact</h4>
          <ul className="vyns-footer__contact">
            <li><i className="pi pi-map-marker" /> <span>Bertoua, Région de l'Est, Cameroun</span></li>
            <li><i className="pi pi-phone" /> <a href="tel:+237690000000">+237 690 00 00 00</a></li>
            <li><i className="pi pi-envelope" /> <a href="mailto:contact@vynsdelights.com">contact@vynsdelights.com</a></li>
            <li>
              <i className="pi pi-whatsapp" />
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Commander sur WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="vyns-footer__bottom">
        <span>© {annee} VYN'S DELIGHTS — Tous droits réservés.</span>
        <span>Fait avec ❤️ à Bertoua</span>
      </div>
    </footer>
  );
}