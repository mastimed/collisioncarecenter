
import React from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar';
}

const AdBanner: React.FC<AdBannerProps> = ({ type }) => {
  const styles = {
    leaderboard: 'w-full h-32 md:h-24 max-w-4xl mx-auto my-8',
    rectangle: 'w-full h-64 my-6',
    sidebar: 'w-full h-[600px] sticky top-24'
  };

  return (
    <div className={`${styles[type]} bg-slate-200 border border-slate-300 flex flex-col items-center justify-center rounded overflow-hidden relative`}>
      <span className="absolute top-1 left-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sponsored / AdSense</span>
      <div className="text-slate-400 text-sm font-medium italic">Your Advertisement Here</div>
      <div className="mt-2 text-[9px] text-slate-500 text-center px-4">Optimized location for high CTR conversion</div>
    </div>
  );
};

export default AdBanner;
