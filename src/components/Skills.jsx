import { useEffect, useRef } from 'react';
import { SKILLS } from '../data';

function RevealBox({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function Skills({ dark }) {
  const c = dark
    ? { card: 'bg-dark-card border-white/[0.07]', tag: 'bg-dark-card2 border-white/[0.05] text-white/80 hover:border-accent/50 hover:text-accent2', muted: 'text-white/40', text: 'text-white' }
    : { card: 'bg-white border-gray-100 shadow-sm', tag: 'bg-gray-50 border-gray-100 text-gray-700 hover:border-accent/50 hover:text-accent', muted: 'text-gray-400', text: 'text-gray-900' };

  return (
    <div id="skills" className={dark ? 'bg-dark-bg2' : 'bg-gray-50'}>
      <div className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <RevealBox><p className="section-tag">Skills & Technologies</p></RevealBox>
        <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>What I Work With</h2></RevealBox>
        <RevealBox delay={200}>
          <p className={`text-sm leading-relaxed max-w-xl mb-12 ${c.muted}`}>
            A growing toolkit built through academic projects, personal development, and real-world application.
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, i) => (
            <RevealBox key={group.category} delay={i * 80}>
              <div className={`border rounded-2xl p-5 h-full transition-all hover:-translate-y-1 ${c.card}`}>
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-accent">{group.category}</h4>
                  <div className={`flex-1 h-px ${dark ? 'bg-white/[0.05]' : 'bg-gray-100'}`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className={`border rounded-md px-3 py-1 text-xs font-medium transition-all cursor-default ${c.tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </div>
  );
}
