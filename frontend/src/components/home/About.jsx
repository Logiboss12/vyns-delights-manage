import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import './about.css';
const SERVICES = [
  { icon: 'pi-gift', titre: 'Anniversaires', texte: 'Gâteaux et menus festifs pour petits et grands.' },
  { icon: 'pi-heart-fill', titre: 'Mariages', texte: 'Pièces montées et buffets pour votre grand jour.' },
  { icon: 'pi-star-fill', titre: 'Surprises', texte: 'Commandes surprises pour marquer les moments spéciaux.' },
  { icon: 'pi-pencil', titre: 'Commandes spéciales', texte: 'Créations sur mesure, individuelles ou en grande quantité.' },
];

export default function About() {
  return (
    <section className="about" id="a-propos">
      <div className="about__inner">
        <div className="about__intro">
          <span className="about__eyebrow">À propos de nous</span>
          <h2 className="about__title">La pâtisserie et la cuisine, réunies avec passion</h2>
          <p className="about__text">
            Chez <strong>VYN'S DELIGHTS</strong>, deux univers se rencontrent : la douceur de la
            <strong> pâtisserie</strong> et la générosité de la <strong>cuisine</strong> camerounaise.
            De la première fournée de gâteaux au dernier plat mijoté, tout est préparé maison, à Bertoua,
            avec des produits frais et beaucoup de cœur.
          </p>
          <p className="about__text">
            Nous accompagnons aussi les <strong>événements du quotidien</strong> : un anniversaire, un mariage,
            une surprise ou une simple envie gourmande. Chaque commande, individuelle ou pour de grandes tablées,
            est pensée sur mesure pour régaler vos invités.
          </p>
          <Link to="/catalogue">
            <Button label="Découvrir nos créations"  iconPos="right" />
          </Link>
        </div>

        <div className="about__services">
          <div className="about__duo">
            <div className="about__pole about__pole--patisserie">
              <i className="pi pi-star" />
              <h3>Pâtisserie</h3>
              <p>Gâteaux, entremets et douceurs pour toutes les occasions.</p>
            </div>
            <div className="about__pole about__pole--cuisine">
              <i className="pi-calendar-plus" />
              <h3>Cuisine</h3>
              <p>Plats maison et service traiteur aux saveurs authentiques.</p>
            </div>
          </div>

          <div className="about__services-grid">
            {SERVICES.map((s) => (
              <div key={s.titre} className="about-service">
                <i className={`pi ${s.icon}`} />
                <div>
                  <h4>{s.titre}</h4>
                  <p>{s.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}