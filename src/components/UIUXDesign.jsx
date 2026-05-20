import { useEffect, useRef } from 'react';
import { UIUX } from '../data';

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

export default function UIUXDesign({ dark }) {
  const c = dark
    ? { bg: 'bg-dark-bg2', card: 'bg-dark-card border-white/[0.07]', text: 'text-white', muted: 'text-white/50' }
    : { bg: 'bg-gray-50', card: 'bg-white border-gray-100 shadow-sm', text: 'text-gray-900', muted: 'text-gray-500' };

  return (
    <div id="design" className={c.bg}>
      <div className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <RevealBox><p className="section-tag">UI/UX Design</p></RevealBox>
        <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>Design Showcase</h2></RevealBox>
        <RevealBox delay={200}>
          <p className={`text-sm leading-relaxed max-w-xl mb-12 ${c.muted}`}>
            Selected design concepts created in Figma — exploring brand identity, visual hierarchy, and user-centred design principles.
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UIUX.map((item, i) => (
            <RevealBox key={item.title} delay={i * 80}>
              <div className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 group ${c.card}`}>
                <div className={`h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center text-5xl relative overflow-hidden`}>
                  <span className="group-hover:scale-110 transition-transform duration-300 block">{item.emoji}</span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                      View Design
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className={`font-semibold text-sm mb-1.5 leading-snug ${c.text}`}>{item.title}</h4>
                  <p className={`text-xs leading-relaxed mb-3 ${c.muted}`}>{item.desc}</p>
                  <span className="inline-block bg-teal/10 border border-teal/20 text-teal text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
              </div>
            </RevealBox>
          ))}
        </div>

        <RevealBox delay={300}>
          <p className={`text-center text-xs mt-10 ${c.muted}`}>
            View full design files on{' '}
            <a href="https://github.com/limashisathkumara" className="text-accent2 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
            {' '}or{' '}
            <a href="https://www.linkedin.com/in/limashi-sathkumara-9b9a17297/" className="text-accent2 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </RevealBox>
      </div>
    </div>
  );
}
