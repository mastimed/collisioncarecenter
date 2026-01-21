
import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  compact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, compact = false }) => {
  return (
    <div 
      onClick={() => onClick(article)}
      className={`group cursor-pointer bg-white overflow-hidden border rounded-lg hover:shadow-xl transition-all duration-300 ${compact ? 'flex gap-4' : 'flex flex-col'}`}
    >
      <div className={`${compact ? 'w-24 h-24 flex-shrink-0' : 'w-full h-48'} overflow-hidden`}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">{article.publishDate}</span>
        </div>
        <h3 className={`font-bold text-slate-900 group-hover:text-red-600 leading-tight mb-2 ${compact ? 'text-sm' : 'text-lg'}`}>
          {article.title}
        </h3>
        {!compact && (
          <p className="text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
