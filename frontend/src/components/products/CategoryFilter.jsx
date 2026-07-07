export default function CategoryFilter({ tree, activeId, onSelect }) {
  return (
    <div className="cat-filter">
      <button
        className={`cat-filter__all ${!activeId ? 'is-active' : ''}`}
        onClick={() => onSelect(null)}
      >
        <i className="pi pi-th-large" /> Tout le catalogue
      </button>

      {tree.map((univers) => (
        <div key={univers.id} className="cat-filter__group">
          <div className="cat-filter__group-title">{univers.name}</div>
          <div className="cat-filter__chips">
            {univers.children.map((sous) => (
              <button
                key={sous.id}
                className={`cat-filter__chip ${activeId === sous.id ? 'is-active' : ''}`}
                onClick={() => onSelect(sous.id)}
              >
                {sous.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}