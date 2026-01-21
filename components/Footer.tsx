
import React from 'react';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (view: any) => void;
  onCategorySelect: (cat: Category) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onCategorySelect }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <h2 className="text-xl font-bold mb-4">Collision Care Center</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your #1 resource for modern collision repair, road safety, and automotive industry innovations.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => onNavigate('home')} className="hover:text-red-500 transition">Home</button></li>
              <li><button onClick={() => onCategorySelect(Category.REPAIR)} className="hover:text-red-500 transition text-left">Expertise</button></li>
              <li><button onClick={() => onCategorySelect(Category.INDUSTRY)} className="hover:text-red-500 transition text-left">Industry News</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-red-500 transition text-left">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Popular Guides</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => onNavigate('adas-guide')} className="hover:text-red-500 transition text-left">ADAS Guide</button></li>
              <li><button onClick={() => onNavigate('claim-estimation')} className="hover:text-red-500 transition text-left">Claim Estimation</button></li>
              <li><button onClick={() => onNavigate('eco-paint')} className="hover:text-red-500 transition text-left">Eco-Friendly Paint</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">SEO Newsletter</h3>
            <div className="flex">
              <input type="email" placeholder="Email..." className="bg-slate-800 border-none px-4 py-2 w-full rounded-l focus:ring-2 focus:ring-red-600" />
              <button className="bg-red-600 px-4 py-2 rounded-r font-bold uppercase text-xs">Join</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
          <p>© 2024 collisioncarecenter.com - All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 uppercase font-bold tracking-widest">
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition">Legal Notices</button>
            <button onClick={() => onNavigate('cookies')} className="hover:text-white transition">Cookies</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
