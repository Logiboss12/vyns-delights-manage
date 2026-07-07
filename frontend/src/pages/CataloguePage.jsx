import { useEffect, useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter';
import { useSearchParams } from 'react-router-dom';

export default function CataloguePage() {
  const [tree, setTree] = useState([]);
  const [activeId, setActiveId] = useState(null); 
  const [produits, setProduits] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);


  const [searchParams] = useSearchParams();

  
  useEffect(() => {
    if (tree.length === 0) return;
    const nomCat = searchParams.get('cat');       
    const nomUnivers = searchParams.get('univers'); 

    if (nomCat) {
      
      for (const u of tree) {
        const found = u.children.find((c) => c.name === nomCat);
        if (found) { setActiveId(found.id); return; }
      }
    } else if (nomUnivers) {
      
      const u = tree.find((x) => x.name === nomUnivers);
      if (u && u.children.length) setActiveId(u.children[0].id);
    }
  }, [tree, searchParams]);
  
  useEffect(() => {
    api.get('/category-tree')
      .then((res) => setTree(res.data.data ?? res.data))
      .catch(() => {});
  }, []);

  // Charger les produits selon le filtre + la page
  useEffect(() => {
    setChargement(true);
    const params = { page };
    if (activeId) params.category_id = activeId;
    api.get('/products', { params })
      .then((res) => {
        setProduits(res.data.data ?? res.data);
        setMeta(res.data.meta ?? res.data);
        setErreur(null);
      })
      .catch(() => setErreur("Impossible de charger les produits."))
      .finally(() => setChargement(false));
  }, [activeId, page]);

  const changerCategorie = (id) => { setActiveId(id); setPage(1); };
  const onPageChange = (e) => { setPage(e.page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const perPage = meta?.per_page ?? 9;
  const total = meta?.total ?? 0;
  const first = (page - 1) * perPage;

  return (
    <div className="section">
      <h2 className="section__title">Notre catalogue</h2>

      <div className="catalogue-grid">
        <aside className="catalogue-aside">
          <CategoryFilter tree={tree} activeId={activeId} onSelect={changerCategorie} />
        </aside>

        <div className="catalogue-main">
          {chargement && <div className="section__center"><ProgressSpinner /></div>}
          {erreur && <p className="section__error">{erreur}</p>}

          {!chargement && !erreur && (
            <>
              {produits.length === 0 ? (
                <p className="section__center">Aucun produit dans cette catégorie.</p>
              ) : (
                <div className="products-grid">
                  {produits.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}

              {total > perPage && (
                <Paginator first={first} rows={perPage} totalRecords={total}
                  onPageChange={onPageChange} className="catalogue-paginator" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}