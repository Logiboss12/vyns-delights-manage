import { useEffect, useState } from 'react';
import { Tag } from 'primereact/tag';
import api from '../../services/api';

const FALLBACK = 'https://placehold.co/600x400/F3E1D3/C0622A?text=VYN%27S+DELIGHTS';

// Couleur du badge selon le type
const SEVERITY = { promo: 'danger', service: 'info', nouveaute: 'success' };

export default function Events() {
  const [events, setEvents] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    api.get('/events')
      .then((res) => setEvents(res.data.data ?? res.data))
      .catch(() => {})
      .finally(() => setChargement(false));
  }, []);

  // Si aucun événement (ou erreur), on masque simplement la section
  if (!chargement && events.length === 0) return null;

  return (
    <section className="section">
      <h2 className="section__title">Événements & actualités</h2>
      <div className="events-grid">
        {events.map((e) => (
          <article key={e.id} className="event-card">
            <div className="event-card__img"
              style={{ backgroundImage: `url(${e.image_url || FALLBACK})` }}>
              {e.badge && <Tag value={e.badge} severity={SEVERITY[e.type] || 'warning'} className="event-card__tag" />}
            </div>
            <div className="event-card__body">
              {e.date_label && (
                <span className="event-card__date"><i className="pi pi-calendar" /> {e.date_label}</span>
              )}
              <h3 className="event-card__title">{e.title}</h3>
              <p className="event-card__text">{e.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}