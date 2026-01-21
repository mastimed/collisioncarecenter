
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES & CATEGORIES ---
enum Category {
  REPAIR = 'Repair & Bodywork',
  INSURANCE = 'Insurance & Claims',
  SAFETY = 'Safety & Innovation',
  MAINTENANCE = 'Auto Maintenance',
  INDUSTRY = 'Industry News'
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishDate: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}

// --- DONNÉES (Échantillon des 30 articles) ---
const ARTICLES: Article[] = [
  {
    id: '1',
    title: "Le Futur de la Carrosserie : Diagnostic par IA",
    excerpt: "Comment l'intelligence artificielle révolutionne l'estimation des dommages.",
    content: "L'industrie de la réparation après collision subit une transformation numérique sans précédent. Aujourd'hui, les outils de balayage assistés par IA peuvent détecter des micro-fractures invisibles à l'œil nu, garantissant une sécurité totale après une réparation.\nCes technologies réduisent les délais d'attente pour les clients tout en augmentant la précision des devis envoyés aux assureurs. Les capteurs modernes et la vision par ordinateur sont désormais les outils primordiaux des techniciens de haut niveau.",
    category: Category.SAFETY,
    author: "Jean Dupont",
    publishDate: "20/05/2024",
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["IA", "Technologie", "Sécurité"]
  },
  {
    id: '2',
    title: "5 Étapes pour Gérer votre Sinistre sans Stress",
    excerpt: "Un guide pratique pour naviguer entre les experts et votre assurance.",
    content: "Après un accident, le niveau de stress est élevé. Cependant, suivre une procédure rigoureuse peut vous faire gagner du temps et de l'argent. Du rapport initial au dépôt de la plainte, voici comment maximiser vos chances d'une couverture complète.",
    category: Category.INSURANCE,
    author: "Sarah Martin",
    publishDate: "18/05/2024",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    tags: ["Assurance", "Conseils"]
  },
  {
    id: '3',
    title: "Véhicules Électriques : Défis de Réparation",
    excerpt: "Pourquoi réparer une Tesla nécessite une formation spécifique.",
    content: "Une voiture électrique nécessite des protocoles de sécurité drastiques avant toute intervention. Le circuit haute tension doit être isolé par des techniciens certifiés pour éviter tout risque d'incendie lors des travaux de carrosserie.",
    category: Category.REPAIR,
    author: "Michel Auto",
    publishDate: "15/05/2024",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    tags: ["EV", "Sécurité"]
  }
  // Ajoutez vos autres articles ici...
];

// --- COMPOSANTS INTERNES ---

const Header = ({ onCategorySelect, onNavigateHome, onOpenEditor }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div onClick={onNavigateHome} className="cursor-pointer group">
          <h1 className="text-xl md:text-2xl font-black text-blue-900 tracking-tighter">
            COLLISION <span className="text-red-600">CARE</span> CENTER
          </h1>
          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Professional Magazine</p>
        </div>
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase">
          {Object.values(Category).map(cat => (
            <button key={cat} onClick={() => onCategorySelect(cat)} className="hover:text-red-600 transition">{cat}</button>
          ))}
          <button onClick={onOpenEditor} className="bg-blue-900 text-white px-4 py-2 rounded shadow-md hover:bg-blue-800 transition">Publier</button>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white border-t p-6 space-y-4 font-bold uppercase text-sm shadow-xl">
          {Object.values(Category).map(cat => (
            <button key={cat} onClick={() => { onCategorySelect(cat); setIsOpen(false); }} className="block w-full text-left">{cat}</button>
          ))}
        </div>
      )}
    </header>
  );
};

const AdBanner = ({ type }: { type: string }) => (
  <div className={`w-full ${type === 'leaderboard' ? 'h-24' : 'h-64'} bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center my-8 rounded overflow-hidden relative`}>
    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
      Espace Publicitaire AdSense<br/>
      <span className="text-[8px] font-normal italic">Optimisé pour conversion</span>
    </div>
  </div>
);

const ArticleCard = ({ article, onClick, compact = false }: any) => (
  <div onClick={() => onClick(article)} className={`group cursor-pointer bg-white overflow-hidden border rounded-xl hover:shadow-xl transition-all duration-300 ${compact ? 'flex gap-4 p-2' : 'flex flex-col'}`}>
    <div className={`${compact ? 'w-24 h-24 flex-shrink-0' : 'h-48'} overflow-hidden`}>
      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
    </div>
    <div className="p-4">
      <span className="text-[10px] font-bold text-red-600 uppercase mb-2 block">{article.category}</span>
      <h3 className={`font-bold leading-tight group-hover:text-blue-900 ${compact ? 'text-sm line-clamp-2' : 'text-lg mb-2 line-clamp-2'}`}>{article.title}</h3>
      {!compact && <p className="text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>}
    </div>
  </div>
);

const Footer = ({ onNavigate }: any) => (
  <footer className="bg-slate-900 text-white py-12 mt-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h2 className="text-xl font-bold mb-4">Collision Care Center</h2>
        <p className="text-slate-400 text-sm">Votre ressource professionnelle pour la carrosserie moderne et la sécurité routière.</p>
      </div>
      <div className="space-y-2 text-sm text-slate-400">
        <h3 className="text-white font-bold uppercase text-xs mb-4">Navigation</h3>
        <button onClick={() => onNavigate('home')} className="block hover:text-red-500">Accueil</button>
        <button onClick={() => onNavigate('contact')} className="block hover:text-red-500">Contact</button>
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest flex items-end">
        © 2024 collisioncarecenter.com
      </div>
    </div>
  </footer>
);

// --- APPLICATION PRINCIPALE ---

const App = () => {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    return selectedCategory ? ARTICLES.filter(a => a.category === selectedCategory) : ARTICLES;
  }, [selectedCategory]);

  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedArticle]);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header 
        onCategorySelect={(cat: any) => { setView('category'); setSelectedCategory(cat); setSelectedArticle(null); }}
        onNavigateHome={() => { setView('home'); setSelectedCategory(null); setSelectedArticle(null); }}
        onOpenEditor={() => setView('editor')}
      />

      <main className="flex-grow">
        {view === 'home' && (
          <div className="container mx-auto px-4 py-8">
            <AdBanner type="leaderboard" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div onClick={() => { setSelectedArticle(featured); setView('article'); }} className="lg:col-span-2 relative h-[400px] md:h-[500px] group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
                <img src={featured.imageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-8 flex flex-col justify-end">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold w-fit mb-4 uppercase">{featured.category}</span>
                  <h2 className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight">{featured.title}</h2>
                  <p className="text-slate-300 line-clamp-2">{featured.excerpt}</p>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-black text-xl border-b-4 border-red-600 pb-1 uppercase italic">Dernières Infos</h3>
                {ARTICLES.slice(0, 4).map(art => (
                  <ArticleCard key={art.id} article={art} compact onClick={(a: any) => { setSelectedArticle(a); setView('article'); }} />
                ))}
              </div>
            </div>
            
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Nos Guides d'Experts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map(art => (
                <ArticleCard key={art.id} article={art} onClick={(a: any) => { setSelectedArticle(a); setView('article'); }} />
              ))}
            </div>
          </div>
        )}

        {view === 'category' && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-black mb-12 uppercase border-l-8 border-red-600 pl-6">{selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(art => <ArticleCard key={art.id} article={art} onClick={(a: any) => { setSelectedArticle(a); setView('article'); }} />)}
            </div>
          </div>
        )}

        {view === 'article' && selectedArticle && (
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-10">
              <span className="text-red-600 font-bold uppercase text-xs tracking-widest mb-4 block">{selectedArticle.category}</span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">{selectedArticle.title}</h1>
              <div className="text-slate-500 border-y py-4 text-sm font-bold uppercase tracking-widest flex justify-between items-center">
                <span>Par {selectedArticle.author}</span>
                <span>{selectedArticle.publishDate}</span>
              </div>
            </header>
            <img src={selectedArticle.imageUrl} className="w-full rounded-2xl mb-12 shadow-2xl aspect-video object-cover" />
            <div className="prose prose-lg text-slate-700 max-w-none space-y-6 text-xl leading-relaxed">
              {selectedArticle.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <AdBanner type="rectangle" />
          </article>
        )}

        {view === 'editor' && (
          <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
            <h2 className="text-4xl font-black mb-6">Outil de Publication</h2>
            <p className="text-slate-500 mb-12 italic">Cette fonction nécessite une configuration de base de données pour être 100% automatisée. Pour le moment, utilisez le fichier index.tsx pour ajouter manuellement vos articles.</p>
            <button onClick={() => setView('home')} className="bg-blue-900 text-white px-8 py-4 rounded-full font-bold uppercase">Retour à l'accueil</button>
          </div>
        )}
      </main>

      <Footer onNavigate={(v: any) => setView(v)} />
    </div>
  );
};

// --- RENDU ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
