import { useEffect, useRef } from 'react';
import { TIMELINE } from '../data';

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

export default function Experience({ dark }) {
  const c = dark
    ? { text: 'text-white', muted: 'text-white/50', line: 'bg-gradient-to-b from-accent via-teal to-transparent', dot: 'bg-gradient-to-br from-accent to-teal border-dark-bg' }
    : { text: 'text-gray-900', muted: 'text-gray-500', line: 'bg-gradient-to-b from-accent via-teal to-transparent', dot: 'bg-gradient-to-br from-accent to-teal border-gray-50' };

  return (
    <section id="experience" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <RevealBox><p className="section-tag">Experience</p></RevealBox>
      <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>My Journey</h2></RevealBox>
      <RevealBox delay={200}>
        <p className={`text-sm max-w-xl mb-14 ${c.muted}`}>
          Academic and project-based experience building real-world software solutions.
        </p>
      </RevealBox>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className={`absolute left-0 top-2 bottom-0 w-0.5 timeline-line`} />

        {TIMELINE.map((item, i) => (
          <RevealBox key={i} delay={i * 90}>
            <div className="relative mb-10">
              {/* Dot */}
              <div className={`absolute -left-[2.15rem] top-1 w-3.5 h-3.5 rounded-full border-2 ${c.dot}`} />
              {/* Year */}
              <div className="text-accent text-[11px] font-bold uppercase tracking-wider mb-1">{item.year}</div>
              <h3 className={`font-bold text-base mb-2 ${c.text}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed ${c.muted}`}>{item.desc}</p>
            </div>
          </RevealBox>
        ))}
      </div>
    </section>
  );
}
