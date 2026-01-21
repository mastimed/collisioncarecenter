
import React, { useState } from 'react';
import { Category } from '../types';

interface HeaderProps {
  onCategorySelect: (cat: Category | null) => void;
  onNavigateHome: () => void;
  onOpenEditor: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, onNavigateHome, onOpenEditor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div onClick={onNavigateHome} className="cursor-pointer group">
            <h1 className="text-2xl font-black text-blue-900 tracking-tighter transition-transform group-hover:scale-[1.02]">
              COLLISION <span className="text-red-600">CARE</span> CENTER
            </h1>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Professional Bodywork Magazine</p>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold uppercase text-slate-700">
            {Object.values(Category).map(cat => (
              <button key={cat} onClick={() => onCategorySelect(cat)} className="hover:text-red-600 transition-colors">
                {cat === Category.REPAIR ? "Expertise" : cat}
              </button>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button onClick={onOpenEditor} className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition shadow-md hover:shadow-lg active:scale-95">
              Publish
            </button>
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t p-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-6 font-semibold uppercase">
            {Object.values(Category).map(cat => (
              <button key={cat} onClick={() => { onCategorySelect(cat); setIsOpen(false); }} className="text-left text-slate-700 hover:text-red-600 text-lg border-b pb-2">
                {cat === Category.REPAIR ? "Expertise" : cat}
              </button>
            ))}
            <button onClick={() => { onOpenEditor(); setIsOpen(false); }} className="text-left text-blue-900 font-bold text-lg pt-2">
              Publish Article
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
