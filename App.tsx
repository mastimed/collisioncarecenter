
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import AdBanner from './components/AdBanner';
import Editor from './pages/Editor';
import { ARTICLES } from './data';
import { Article, Category } from './types';

type View = 'home' | 'category' | 'article' | 'editor' | 'legal' | 'privacy' | 'cookies' | 'contact' | 'adas-guide' | 'claim-estimation' | 'eco-paint';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // SEO effect: Update document title
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Collision Care Center | Professional Body Magazine',
      legal: 'Legal Notices | Collision Care Center',
      privacy: 'Privacy Policy | Collision Care Center',
      cookies: 'Cookie Policy | Collision Care Center',
      contact: 'Contact Us | Collision Care Center',
      'adas-guide': 'ADAS Calibration Guide | Collision Care Center',
      'claim-estimation': 'Insurance Claim Estimation Guide | Collision Care Center',
      'eco-paint': 'Eco-Friendly Paint Innovation | Collision Care Center',
      editor: 'Article Editor | Collision Care Center'
    };

    if (selectedArticle) {
      document.title = `${selectedArticle.title} | Collision Care Center`;
    } else if (selectedCategory) {
      document.title = `${selectedCategory} | Collision Care Center Magazine`;
    } else {
      document.title = titles[currentView] || 'Collision Care Center';
    }
    window.scrollTo(0, 0);
  }, [selectedArticle, selectedCategory, currentView]);

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return ARTICLES;
    return ARTICLES.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const latest = ARTICLES.slice(0, 6);

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const navigateToCategory = (cat: Category | null) => {
    setSelectedCategory(cat);
    setSelectedArticle(null);
    setCurrentView(cat ? 'category' : 'home');
  };

  const navigateToArticle = (art: Article) => {
    setSelectedArticle(art);
    setCurrentView('article');
  };

  const navigateToView = (view: View) => {
    setCurrentView(view);
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onCategorySelect={navigateToCategory} 
        onNavigateHome={navigateToHome} 
        onOpenEditor={() => navigateToView('editor')}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="container mx-auto px-4 py-8">
            <AdBanner type="leaderboard" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div 
                onClick={() => navigateToArticle(featured)}
                className="lg:col-span-2 relative h-[500px] group cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
              >
                <img src={featured.imageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold w-fit mb-4 uppercase">{featured.category}</span>
                  <h2 className="text-white text-4xl font-black mb-4 leading-tight">{featured.title}</h2>
                  <p className="text-slate-300 max-w-2xl line-clamp-2">{featured.excerpt}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="font-black text-xl border-b-4 border-red-600 w-fit pb-1 uppercase tracking-tighter">LATEST HEADLINES</h3>
                {latest.slice(1, 5).map(art => (
                  <ArticleCard key={art.id} article={art} onClick={navigateToArticle} compact />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">FEATURED INSIGHTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ARTICLES.slice(5, 11).map(art => (
                    <ArticleCard key={art.id} article={art} onClick={navigateToArticle} />
                  ))}
                </div>
                <AdBanner type="leaderboard" />
                <h2 className="text-3xl font-black mb-8 mt-12 uppercase tracking-tighter">PRACTICAL GUIDES</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ARTICLES.slice(11, 20).map(art => (
                    <ArticleCard key={art.id} article={art} onClick={navigateToArticle} />
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-1 space-y-12">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-lg mb-4 border-b pb-2 uppercase tracking-tighter">SUBSCRIBE</h3>
                  <p className="text-sm text-slate-500 mb-4">Get the best bodywork tips directly in your inbox.</p>
                  <input type="text" className="w-full border p-2 mb-2 rounded" placeholder="Your Email" />
                  <button className="w-full bg-slate-900 text-white font-bold py-2 rounded">Join Magazine</button>
                </div>
                <AdBanner type="sidebar" />
              </aside>
            </div>
          </div>
        )}

        {currentView === 'category' && (
          <div className="container mx-auto px-4 py-12">
             <div className="mb-12 text-center">
                <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Exploration</span>
                <h2 className="text-5xl font-black text-slate-900 mt-2 uppercase">{selectedCategory}</h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map(art => (
                  <ArticleCard key={art.id} article={art} onClick={navigateToArticle} />
                ))}
             </div>
             <AdBanner type="leaderboard" />
          </div>
        )}

        {currentView === 'article' && selectedArticle && (
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-8">
              <span className="text-red-600 font-bold uppercase text-sm mb-4 block tracking-widest">{selectedArticle.category}</span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">{selectedArticle.title}</h1>
              <div className="flex items-center gap-4 text-slate-500 border-y py-4">
                <img src={`https://ui-avatars.com/api/?name=${selectedArticle.author}&background=0D8ABC&color=fff`} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-bold text-slate-900">{selectedArticle.author}</p>
                  <p className="text-xs uppercase tracking-widest">Published on {selectedArticle.publishDate}</p>
                </div>
              </div>
            </header>
            <AdBanner type="leaderboard" />
            <img src={selectedArticle.imageUrl} className="w-full rounded-2xl mb-12 shadow-2xl" />
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <div className="prose prose-lg text-slate-700 leading-relaxed space-y-6 text-xl font-light">
                  {selectedArticle.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
                  {selectedArticle.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
              <aside className="lg:w-1/3">
                <h4 className="font-bold text-xl mb-6">Related Stories</h4>
                <div className="space-y-6">
                  {ARTICLES.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category).slice(0, 3).map(art => (
                    <ArticleCard key={art.id} article={art} onClick={navigateToArticle} compact />
                  ))}
                </div>
                <AdBanner type="sidebar" />
              </aside>
            </div>
          </article>
        )}

        {currentView === 'legal' && (
          <div className="container mx-auto px-4 py-20 max-w-3xl">
            <h1 className="text-4xl font-black mb-8">Legal Notices</h1>
            <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
              <p>Welcome to <strong>CollisionCareCenter.com</strong>. This website is owned and operated by Collision Care Center. The content provided on this magazine is for informational and educational purposes only.</p>
              <h2 className="text-xl font-bold text-slate-900">Intellectual Property</h2>
              <p>All content including text, graphics, logos, and images are the property of Collision Care Center or its content suppliers and protected by international copyright laws.</p>
              <h2 className="text-xl font-bold text-slate-900">Disclaimer</h2>
              <p>While we strive for accuracy, the automotive industry changes rapidly. We are not liable for any actions taken based on the information provided on this site. Always consult with a certified professional for specific automotive repairs.</p>
            </div>
          </div>
        )}

        {currentView === 'privacy' && (
          <div className="container mx-auto px-4 py-20 max-w-3xl">
            <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
              <p>Your privacy is critically important to us. It is Collision Care Center's policy to respect your privacy regarding any information we may collect while operating our website.</p>
              <h2 className="text-xl font-bold text-slate-900">Data Collection</h2>
              <p>We only collect information that you voluntarily provide to us, such as when you sign up for our newsletter. We use third-party advertising services like Google AdSense which may use cookies to serve ads based on your prior visits.</p>
              <h2 className="text-xl font-bold text-slate-900">Security</h2>
              <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet is 100% secure.</p>
            </div>
          </div>
        )}

        {currentView === 'cookies' && (
          <div className="container mx-auto px-4 py-20 max-w-3xl">
            <h1 className="text-4xl font-black mb-8">Cookie Policy</h1>
            <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
              <p>This site uses cookies—small text files that are placed on your machine to help the site provide a better user experience.</p>
              <ul className="list-disc pl-6">
                <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Users may opt out of personalized advertising by visiting Ads Settings.</li>
              </ul>
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="container mx-auto px-4 py-20 max-w-xl">
            <h1 className="text-4xl font-black mb-8 text-center">Contact Us</h1>
            <p className="text-center text-slate-500 mb-12">Have questions about our magazine or want to partner with us? Reach out below.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Simulation)'); }}>
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input type="text" required className="w-full border p-3 rounded bg-white shadow-sm" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input type="email" required className="w-full border p-3 rounded bg-white shadow-sm" placeholder="Email address" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea required className="w-full border p-3 rounded h-32 bg-white shadow-sm" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded hover:bg-red-700 transition shadow-lg">SEND MESSAGE</button>
            </form>
          </div>
        )}

        {currentView === 'adas-guide' && (
          <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="bg-blue-900 text-white p-12 rounded-3xl mb-12 shadow-2xl">
              <h1 className="text-5xl font-black mb-4 uppercase">ADAS Calibration Guide</h1>
              <p className="text-xl text-blue-100 max-w-2xl">The ultimate resource for understanding Advanced Driver Assistance Systems and post-collision safety.</p>
            </div>
            <div className="prose prose-xl prose-slate max-w-none">
              <h2 className="text-3xl font-black mb-6">Why Calibration is Non-Negotiable</h2>
              <p>Advanced Driver Assistance Systems (ADAS) rely on cameras, radar, and ultrasonic sensors to keep you safe. Even a minor impact—or simply removing a bumper—can misalign these sensitive components.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="bg-slate-100 p-8 rounded-2xl border">
                  <h3 className="text-xl font-bold mb-4">Static Calibration</h3>
                  <p className="text-slate-600">Performed in a controlled shop environment using specialized targets and lighting. Requires perfectly level floors and precise spacing.</p>
                </div>
                <div className="bg-slate-100 p-8 rounded-2xl border">
                  <h3 className="text-xl font-bold mb-4">Dynamic Calibration</h3>
                  <p className="text-slate-600">Requires driving the vehicle on the road at specific speeds under clear conditions so the system can "learn" the environment.</p>
                </div>
              </div>
              <p>At Collision Care Center, we advocate for 100% scanning and calibration on every modern vehicle repair to ensure your lane-departure and emergency braking systems function exactly as the manufacturer intended.</p>
            </div>
            <AdBanner type="rectangle" />
          </div>
        )}

        {currentView === 'claim-estimation' && (
          <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black mb-8 border-b-8 border-red-600 w-fit pb-4">Claim Estimation Pro</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-red-50 p-6 rounded-xl text-center">
                <span className="text-3xl font-bold text-red-600">01</span>
                <p className="font-bold mt-2">Document</p>
                <p className="text-sm text-red-800">Photos of all angles and VIN.</p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl text-center">
                <span className="text-3xl font-bold text-red-600">02</span>
                <p className="font-bold mt-2">Quote</p>
                <p className="text-sm text-red-800">Compare OEM vs Aftermarket parts.</p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl text-center">
                <span className="text-3xl font-bold text-red-600">03</span>
                <p className="font-bold mt-2">Negotiate</p>
                <p className="text-sm text-red-800">Know your rights for shop selection.</p>
              </div>
            </div>
            <div className="prose prose-lg text-slate-600">
              <p>Navigating insurance claims doesn't have to be a nightmare. Our guide helps you understand the "Estimate" vs "Supplement" process, ensuring that hidden damage discovered during teardown is fully covered by your insurance provider.</p>
            </div>
            <AdBanner type="leaderboard" />
          </div>
        )}

        {currentView === 'eco-paint' && (
          <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="relative h-96 rounded-3xl overflow-hidden mb-12 group">
              <img src="https://images.unsplash.com/photo-1590099433100-344c207a9747?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
                <h1 className="text-white text-6xl font-black drop-shadow-lg">ECO-PAINT</h1>
              </div>
            </div>
            <div className="prose prose-xl text-slate-700">
              <h2 className="text-3xl font-black text-green-800 mb-6 uppercase">The Waterborne Revolution</h2>
              <p>Traditional solvent-based paints are high in Volatile Organic Compounds (VOCs). Collision Care Center is proud to spotlight the transition to waterborne paint systems that reduce environmental impact without sacrificing the "showroom shine."</p>
              <div className="bg-green-50 border-l-8 border-green-600 p-8 my-12 italic">
                "Modern waterborne paints actually offer better color matching and faster drying times than old solvent tech."
              </div>
            </div>
            <AdBanner type="rectangle" />
          </div>
        )}

        {currentView === 'editor' && <Editor />}
      </main>

      <Footer onNavigate={navigateToView} onCategorySelect={navigateToCategory} />
    </div>
  );
};

export default App;
