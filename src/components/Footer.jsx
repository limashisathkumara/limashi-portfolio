import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const NAV = ['about', 'skills', 'projects', 'design', 'experience', 'services', 'contact'];

export default function Footer({ dark }) {
  const c = dark
    ? { bg: 'bg-dark-bg2 border-white/[0.06]', text: 'text-white', muted: 'text-white/40', link: 'text-white/40 hover:text-white', social: 'border-white/10 bg-dark-card text-white/50 hover:border-accent hover:text-accent' }
    : { bg: 'bg-gray-50 border-gray-100', text: 'text-gray-900', muted: 'text-gray-400', link: 'text-gray-400 hover:text-gray-700', social: 'border-gray-200 bg-white text-gray-400 hover:border-accent hover:text-accent' };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={`border-t ${c.bg}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl bg-gradient-to-r from-accent to-teal bg-clip-text text-transparent mb-2">
              Limashi Sathkumara
            </div>
            <p className={`text-xs max-w-[260px] leading-relaxed ${c.muted}`}>
              Computer Science Undergraduate · Full-Stack Developer · UI/UX Designer
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${c.muted}`}>Quick Links</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map(link => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`text-sm capitalize transition-colors ${c.link}`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${c.muted}`}>Connect</p>
            <div className="flex gap-2">
              {[
                { href: 'https://github.com/limashisathkumara', icon: <FiGithub size={16} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/limashi-sathkumara-9b9a17297/', icon: <FiLinkedin size={16} />, label: 'LinkedIn' },
                { href: 'mailto:limashisathkumara@gmail.com', icon: <FiMail size={16} />, label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:-translate-y-0.5 ${c.social}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${dark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
          <p className={`text-xs ${c.muted}`}>
            © 2025 Limashi Sathkumara. Built with ❤ in Sri Lanka.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5 ${c.social}`}
          >
            <FiArrowUp size={12} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
