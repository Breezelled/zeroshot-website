import { ArrowUpRight, ArrowRight, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { Header } from '@/components/header';
import { AgentVisual } from '@/components/agent-visual';
import { Reveal } from '@/components/reveal';
import { Solutions } from '@/components/solutions';
const team = [
  { name: 'Breeze Chen', url: 'https://baiyuchen.com/' },
  { name: 'Wilson Wongso', url: 'https://wilsonwongso.dev/' },
  { name: 'Jimmy Ji' },
  { name: 'Frederik Kalle' },
];
export default function Home() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">Applied technology & engineering</p><h1 id="hero-title">Beyond<br/>the obvious<span className="accent">.</span></h1><p className="hero-description">We help organisations solve AI, data, software and infrastructure challenges through scientific expertise and hands-on engineering.</p><a className="button" href="mailto:contact@0shot.io">Discuss a problem <ArrowUpRight size={20} aria-hidden/></a></div>
      <div className="hero-art"><AgentVisual/></div>
    </section>
    <section className="principle shell" aria-label="Our commitment"><Reveal><p className="principle-statement">The people who understand your problem<br className="desktop-break"/> should be the people <span>solving it.</span></p><div className="principle-bottom"><p>The same scientists and engineers advise, research and build your solution.<br className="desktop-break"/> No handoffs. No outsourced delivery.</p></div></Reveal></section>
    <section className="solutions-section shell" id="solutions" aria-labelledby="solutions-title"><Reveal><div className="section-intro"><h2 id="solutions-title">Real problems.<br/>Working solutions.</h2></div><Solutions/></Reveal></section>
    <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="shell"><Reveal><div className="section-intro"><p className="eyebrow">The ZeroShot approach</p><h2 id="approach-title">Research depth.<br/>Engineering execution.</h2><p>Technical advisory, applied research and engineering, shaped around your problem — from early exploration to deployment.</p></div>
      <div className="process"><article><div className="process-heading"><h3>Advise</h3><ArrowRight size={22} aria-hidden/></div><p>Clarify the problem, assess your goals and existing systems, and define a practical technical approach.</p></article><article><div className="process-heading"><h3>Research &amp; prototype</h3><ArrowRight size={22} aria-hidden/></div><p>Use applied research and focused prototypes to test assumptions, compare approaches and establish what works.</p></article><article><div className="process-heading"><h3>Engineer &amp; deploy</h3><span className="process-end" aria-hidden/></div><p>Build, validate and integrate the solution for real operating conditions. Equip your team with the knowledge to use and maintain it.</p></article></div>
    </Reveal></div></section>
    <section className="team-section shell" id="team" aria-labelledby="team-title"><Reveal><div className="section-intro"><h2 id="team-title">Meet your team.</h2></div><div className="team-grid">{team.map(person => <article className="person" key={person.name}><h3>{person.url ? <a href={person.url} target="_blank" rel="noopener noreferrer">{person.name}<ArrowUpRight size={22} aria-hidden/><span className="sr-only"> (personal website, opens in new tab)</span></a> : person.name}</h3><p>Member of Technical Staff &amp; Co-Founder</p></article>)}</div></Reveal></section>
    <section className="contact-section shell" id="contact" aria-labelledby="contact-title"><Reveal><div className="contact-top"><h2 id="contact-title">What are you<br/>working on<span className="accent">?</span></h2><div className="contact-copy"><p>Tell us what you want to achieve, the technical challenge you face, and where things stand. Let’s find the right next step.</p><a className="button" href="mailto:contact@0shot.io">Discuss a problem <ArrowUpRight size={20} aria-hidden/></a><span className="contact-address">contact@0shot.io</span></div></div></Reveal></section>
  </main><footer className="shell footer"><a className="wordmark" href="#" aria-label="ZeroShot home"><span className="brand-symbol" aria-hidden/>ZeroShot</a><a className="social-link" href="https://www.linkedin.com/company/0-shot" target="_blank" rel="noopener noreferrer"><span>Follow us</span><LinkedinLogo size={22} weight="fill" aria-hidden/><span className="sr-only"> on LinkedIn (opens in new tab)</span></a><span>© {new Date().getFullYear()} ZeroShot</span></footer></>;
}
