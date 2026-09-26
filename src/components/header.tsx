'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, List, X, CircleHalf } from '@phosphor-icons/react';
export function Header() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  function toggleTheme() {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }
  return <header className="site-header" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); } }}><div className="shell nav-inner">
    <a className="wordmark" href="#" aria-label="ZeroShot home"><span className="brand-symbol" aria-hidden="true"/>ZeroShot</a>
    <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
      <a href="#solutions" onClick={() => setOpen(false)}>What we do</a>
      <a href="#approach" onClick={() => setOpen(false)}>How we work</a>
      <a href="#team" onClick={() => setOpen(false)}>Our team</a>
      <a className="nav-contact" href="mailto:contact@0shot.io">Discuss a problem <ArrowUpRight aria-hidden size={17}/></a>
    </nav>
    <div className="nav-controls"><button className="icon-button theme-button" onClick={toggleTheme} aria-label={theme ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Switch colour theme'}><CircleHalf size={20} aria-hidden/></button>
    <button ref={menuRef} aria-controls="main-navigation" className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X size={24}/> : <List size={24}/>}</button></div>
  </div></header>;
}
