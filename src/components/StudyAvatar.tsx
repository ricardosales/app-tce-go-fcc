import React from 'react';

export const StudyAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = size === 'lg' ? 'h-20 w-20' : size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSize = size === 'lg' ? 'text-[42px]' : size === 'sm' ? 'text-[20px]' : 'text-[26px]';

  return (
    <div aria-label="Avatar do RevisaAI" role="img" className={`${dimensions} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary ring-2 ring-primary/15`}>
      <span className={`material-symbols-outlined ${iconSize}`} style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
    </div>
  );
};
