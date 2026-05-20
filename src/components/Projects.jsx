import { useEffect, useRef, useState } from 'react';
import { FiGithub, FiInfo } from 'react-icons/fi';
import { PROJECTS } from '../data';

function RevealBox({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Modal({ project, onClose, dark }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative max-w-lg w-full rounded-3xl border p-8 ${dark ? 'bg-dark-card border-white/10' : 'bg-white border-gray-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-8 h-8 rounded-full border flex items-center justify-center text-sm ${dark ? 'border-white/10 text-white/50 hover:text-white' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}
          aria-label="Close"
        >✕</button>
        <div className={`h-24 rounded-2xl mb-6 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-4xl`}>
          {project.emoji}
        </div>
        <div className={`text-xs font-semibold uppercase tracking-wider text-accent mb-1`}>{project.num} · {project.category}</div>
        <h3 className={`font-bold text-lg leading-snug mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
        <p className={`text-sm leading-relaxed mb-5 ${dark ? 'text-white/55' : 'text-gray-500'}`}>{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="bg-accent/10 border border-accent/20 text-accent2 rounded-md px-2.5 py-1 text-xs font-medium">{t}</span>
          ))}
        </div>
        <a
          href="https://github.com/limashisathkumara"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all w-full"
        >
          <FiGithub size={15} /> View on GitHub
        </a>
      </div>
    </div>
  );
}

export default function Projects({ dark }) {
  const [selected, setSelected] = useState(null);
  const c = dark
    ? { card: 'bg-dark-card border-white/[0.07]', muted: 'text-white/50', text: 'text-white', ghost: 'border-white/10 text-white/50 hover:border-accent hover:text-accent' }
    : { card: 'bg-white border-gray-100 shadow-sm', muted: 'text-gray-500', text: 'text-gray-900', ghost: 'border-gray-200 text-gray-500 hover:border-accent hover:text-accent' };

  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <RevealBox><p className="section-tag">Featured Projects</p></RevealBox>
      <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>Things I've Built</h2></RevealBox>
      <RevealBox delay={200}>
        <p className={`text-sm max-w-xl mb-12 ${c.muted}`}>Full-stack applications, mobile apps, and design projects developed across academic and personal work.</p>
      </RevealBox>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <RevealBox key={p.id} delay={i * 80}>
            <div className={`project-card border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${c.card}`}>
              {/* Thumb */}
              <div className={`h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center text-5xl relative`}>
                {p.emoji}
                {p.featured && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-accent to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Featured
                  </span>
                )}
              </div>
              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">{p.num} — {p.category}</div>
                <h3 className={`font-bold text-sm leading-snug mb-2 ${c.text}`}>{p.title}</h3>
                <p className={`text-xs leading-relaxed flex-1 mb-3 ${c.muted}`}>{p.desc.slice(0, 120)}…</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => (
                    <span key={t} className="bg-accent/10 border border-accent/20 text-accent2 rounded px-2 py-0.5 text-[11px] font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/limashisathkumara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-accent to-purple-600 text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <FiGithub size={12} /> GitHub
                  </a>
                  <button
                    onClick={() => setSelected(p)}
                    className={`flex-1 flex items-center justify-center gap-1.5 border text-xs font-medium py-2 rounded-lg transition-all ${c.ghost}`}
                  >
                    <FiInfo size={12} /> Details
                  </button>
                </div>
              </div>
            </div>
          </RevealBox>
        ))}
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} dark={dark} />}
    </section>
  );
}
