'use client';
import { useEffect, useRef } from 'react';

/** Progressive enhancement: content remains visible without JavaScript. */
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const show = () => { element.dataset.reveal = 'visible'; };
    if (query.matches || element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { show(); observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(element);
    query.addEventListener('change', show);
    return () => { observer.disconnect(); query.removeEventListener('change', show); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
