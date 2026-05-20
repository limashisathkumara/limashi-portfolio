import { useEffect, useRef, useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend } from 'react-icons/fi';

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

const CONTACT_ITEMS = [
  { icon: <FiMail size={18} />, label: 'Email', value: 'limashisathkumara@gmail.com', href: 'mailto:limashisathkumara@gmail.com' },
  { icon: <FiGithub size={18} />, label: 'GitHub', value: 'github.com/limashisathkumara', href: 'https://github.com/limashisathkumara' },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: 'Limashi Sathkumara', href: 'https://www.linkedin.com/in/limashi-sathkumara-9b9a17297/' },
  { icon: <FiMapPin size={18} />, label: 'Location', value: 'Sri Lanka', href: null },
];

export default function Contact({ dark }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const c = dark
    ? { card: 'bg-dark-card border-white/[0.07]', text: 'text-white', muted: 'text-white/50', input: 'bg-dark-bg2 border-white/10 text-white placeholder-white/25 focus:border-accent', label: 'text-white/40', item: 'bg-dark-card border-white/[0.07] text-white hover:border-accent/40' }
    : { card: 'bg-white border-gray-100 shadow-sm', text: 'text-gray-900', muted: 'text-gray-500', input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-accent', label: 'text-gray-500', item: 'bg-white border-gray-100 shadow-sm text-gray-900 hover:border-accent/40' };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.subject.trim()) e.subject = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const Field = ({ id, label, type = 'text', textarea = false }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`text-[11px] font-semibold uppercase tracking-wider ${c.label}`}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={form[id]}
          onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
          placeholder={`Your ${label.toLowerCase()}...`}
          className={`border rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none font-sans ${c.input} ${errors[id] ? 'border-rose-500' : ''}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
          placeholder={id === 'email' ? 'your@email.com' : id === 'name' ? 'Your name' : 'What\'s this about?'}
          className={`border rounded-xl px-4 py-3 text-sm outline-none transition-colors font-sans ${c.input} ${errors[id] ? 'border-rose-500' : ''}`}
        />
      )}
    </div>
  );

  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <RevealBox><p className="section-tag">Get In Touch</p></RevealBox>
      <RevealBox delay={100}><h2 className={`section-title ${c.text}`}>Let's Work Together</h2></RevealBox>
      <RevealBox delay={200}>
        <p className={`text-sm max-w-lg mb-12 ${c.muted}`}>Open to internships, collaborations, and new opportunities. Feel free to reach out!</p>
      </RevealBox>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        {/* Info */}
        <RevealBox>
          <div className="flex flex-col gap-3">
            {CONTACT_ITEMS.map(item => {
              const inner = (
                <div className={`flex items-center gap-4 border rounded-xl px-5 py-4 transition-all ${c.item}`}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${c.muted}`}>{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block hover:translate-x-1 transition-transform">
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
        </RevealBox>

        {/* Form */}
        <RevealBox delay={150}>
          <div className={`border rounded-2xl p-7 ${c.card}`}>
            <h3 className={`font-bold text-base mb-6 ${c.text}`}>Send a Message</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field id="name" label="Name" />
              <Field id="email" label="Email" type="email" />
            </div>
            <div className="mb-4"><Field id="subject" label="Subject" /></div>
            <div className="mb-5"><Field id="message" label="Message" textarea /></div>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm"
            >
              <FiSend size={14} /> Send Message
            </button>

            {sent && (
              <div className="mt-4 border border-teal/30 bg-teal/10 rounded-xl px-4 py-3 text-teal text-sm font-medium text-center">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
          </div>
        </RevealBox>
      </div>
    </section>
  );
}
