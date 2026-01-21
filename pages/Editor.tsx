
import React, { useState } from 'react';
import { Category, Article } from '../types';

const Editor: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: Category.REPAIR,
    author: '',
    imageUrl: 'https://picsum.photos/seed/new/800/600'
  });

  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newArticle: Article = {
      ...formData,
      id: Date.now().toString(),
      slug,
      publishDate: new Date().toISOString().split('T')[0],
      tags: ['New Article']
    };

    setGeneratedCode(`{
  id: '${newArticle.id}',
  title: "${newArticle.title}",
  slug: "${newArticle.slug}",
  excerpt: "${newArticle.excerpt}",
  content: "${newArticle.content}",
  category: Category.${Object.keys(Category).find(k => (Category as any)[k] === newArticle.category)},
  author: "${newArticle.author}",
  publishDate: "${newArticle.publishDate}",
  imageUrl: "${newArticle.imageUrl}",
  tags: ["New"]
},`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h2 className="text-3xl font-black mb-8">Quick Publishing Tool</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-8 text-sm text-blue-800">
        Since your site is hosted on GitHub, this tool generates the code needed to add to the <strong>data.ts</strong> file for instant publishing.
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Article Title</label>
          <input 
            required
            className="w-full border p-3 rounded"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="Ex: The Ultimate Guide to Modern Bodywork"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Category</label>
          <select 
            className="w-full border p-3 rounded"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value as Category})}
          >
            {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Excerpt (SEO Summary)</label>
          <textarea 
            required
            className="w-full border p-3 rounded h-20"
            value={formData.excerpt}
            onChange={e => setFormData({...formData, excerpt: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Full Content</label>
          <textarea 
            required
            className="w-full border p-3 rounded h-64"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded hover:bg-red-700 transition">
          Generate Publication Code
        </button>
      </form>

      {generatedCode && (
        <div className="mt-12 animate-fade-in">
          <h3 className="text-xl font-bold mb-4">Code to copy into data.ts:</h3>
          <pre className="bg-slate-900 text-green-400 p-4 rounded overflow-x-auto text-xs leading-relaxed">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Editor;
