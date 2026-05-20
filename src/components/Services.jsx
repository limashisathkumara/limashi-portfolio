import { useEffect, useRef } from 'react';
import { SERVICES } from '../data';

function RevealBox({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function Services({ dark }) {
  const c = dark
    ? { bg: 'bg-dark-bg2', card: 'bg-dark-card border-white/[0.07]', text: 'text-white', muted: 'text-white/50', icon: 'bg-accent/10 border border-accent/20' }
    : { bg: 'bg-gray-50', card: 'bg-white border-gray-100 shadow-sm', text: 'text-gray-900', muted: 'text-gray-500', icon: 'bg-accent/10 border border-accent/20' };

  return (
    <div id="services" className={c.bg}>
      <div className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <RevealBox><p className="section-tag">Services</p></RevealBox>
        <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>What I Can Do For You</h2></RevealBox>
        <RevealBox delay={200}>
          <p className={`text-sm leading-relaxed max-w-xl mb-12 ${c.muted}`}>
            From concept to deployment — I help bring digital ideas to life with clean code and thoughtful design.
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <RevealBox key={s.title} delay={i * 80}>
              <div className={`service-card relative border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 group ${c.card}`}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 ${c.icon}`}>
                  {s.icon}
                </div>
                <h3 className={`font-bold text-sm mb-2 ${c.text}`}>{s.title}</h3>
                <p className={`text-xs leading-relaxed ${c.muted}`}>{s.desc}</p>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </div>
  );
}
