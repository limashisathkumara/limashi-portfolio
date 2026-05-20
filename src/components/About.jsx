import { useEffect, useRef } from 'react';

const TRAITS = [
  'Problem-solver with a detail-oriented mindset',
  'Team player with strong communication skills',
  'Passionate about clean, maintainable code',
  'Driven by creating impactful user experiences',
  'Always learning emerging technologies',
];

const STATS = [
  { num: '5+', label: 'Projects Built' },
  { num: '4+', label: 'Technologies' },
  { num: 'UI/UX', label: 'Design Skills' },
  { num: 'QA', label: 'Testing Exp.' },
];

function RevealBox({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function About({ dark }) {
  const c = dark
    ? { card: 'bg-dark-card border-white/[0.07]', text: 'text-white', muted: 'text-white/50', card2: 'bg-dark-card2 border-white/[0.05]' }
    : { card: 'bg-white border-gray-100 shadow-sm', text: 'text-gray-900', muted: 'text-gray-500', card2: 'bg-gray-50 border-gray-100' };

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <RevealBox><p className="section-tag">About Me</p></RevealBox>
      <RevealBox delay={100}>
        <h2 className={`section-title ${c.text}`}>
          Crafting Digital <em className="not-italic font-serif italic text-accent2">Experiences</em>
        </h2>
      </RevealBox>
      <RevealBox delay={200}>
        <div className="w-14 h-0.5 bg-gradient-to-r from-accent to-teal rounded mb-12" />
      </RevealBox>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left */}
        <RevealBox>
          <div className={`border rounded-2xl p-7 h-full ${c.card}`}>
            <h3 className="text-accent2 font-semibold text-sm mb-4">Who I Am</h3>
            <p className={`text-sm leading-relaxed mb-6 ${c.muted}`}>
              I am a passionate Computer Science undergraduate at the University of Plymouth with deep interests in full-stack development, UI/UX design, database systems, and software engineering. I enjoy building modern digital solutions that combine functionality, performance, and user-friendly experiences.
            </p>
            <ul className="flex flex-col gap-3">
              {TRAITS.map(t => (
                <li key={t} className={`flex items-center gap-3 text-sm ${c.muted}`}>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-teal flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </RevealBox>

        {/* Right */}
        <RevealBox delay={100}>
          <div className="flex flex-col gap-4 h-full">
            <div className={`border rounded-2xl p-5 ${c.card}`}>
              <h3 className="text-accent2 font-semibold text-sm mb-2">Education</h3>
              <p className={`text-sm font-medium ${c.text}`}>BSc (Hons) Computer Science</p>
              <p className={`text-xs mt-0.5 ${c.muted}`}>University of Plymouth · In Progress</p>
            </div>
            <div className={`border rounded-2xl p-5 ${c.card}`}>
              <h3 className="text-accent2 font-semibold text-sm mb-2">Career Goals</h3>
              <p className={`text-sm leading-relaxed ${c.muted}`}>
                Seeking internship and graduate opportunities in Full-Stack Development, UI/UX Design, and Software Engineering. Aspiring to work on meaningful projects that create real-world impact.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(s => (
                <div key={s.label} className={`border rounded-xl p-4 text-center ${c.card2}`}>
                  <div className="font-serif text-2xl bg-gradient-to-r from-accent2 to-teal bg-clip-text text-transparent">{s.num}</div>
                  <div className={`text-xs uppercase tracking-wider mt-1 ${c.muted}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealBox>
      </div>
    </section>
  );
}
