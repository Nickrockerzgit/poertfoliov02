import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { SOCIALS } from '@/data/content';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Sparkles,
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from 'lucide-react';

const EMPTY_FORM = { name: '', email: '', company: '', budget: '', message: '' };

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || 'rishabhcodz@gmail.com';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error' | 'missing-config';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('missing-config');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          company: form.company || 'Not provided',
          budget: form.budget || 'Not selected',
          message: form.message,
          to_email: CONTACT_TO_EMAIL,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setSubmittedName(form.name);
      setForm(EMPTY_FORM);
      setStatus('sent');
      window.setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus('error');
    }
  };

  const budgets = ['< $5k', '$5k - $15k', '$15k - $50k', '$50k+'];
  const isSending = status === 'sending';
  const isSent = status === 'sent';

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 mask-fade-b" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-[30rem] w-[40rem] rounded-full bg-brand-500/12 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* left - invitation */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">06 - Contact</p>
              <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
                Let's build something{' '}
                <span className="text-gradient">worth shipping.</span>
              </h2>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-300 leading-relaxed max-w-md">
                Tell me about your product, your timeline, and what success looks like. I reply to
                every serious enquiry within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 sm:mt-10 space-y-4">
                <ContactRow icon={Mail} label="Email" value="rishabhcodz@gmail.com" href="mailto:rishabhcodz@gmail.com" />
                <ContactRow icon={Phone} label="Phone" value="+91 6267414545" href="tel:+916267414545" />
                <ContactRow icon={MapPin} label="Based in" value="Indore, India - IST" />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl glass-light text-ink-300 transition hover:bg-brand-400 hover:text-ink-950"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </Reveal>

            {/* quick CTAs */}
            <Reveal delay={0.3}>
              <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-md">
                <a
                  href="#work"
                  className="group flex items-center gap-3 rounded-2xl glass-light hover:border-brand-400/30 border border-white/8 p-4 transition"
                >
                  <Building2 className="h-5 w-5 text-brand-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">Visit Companies</div>
                    <div className="text-xs text-ink-400">See past work</div>
                  </div>
                </a>
                <a
                  href="#skills"
                  className="group flex items-center gap-3 rounded-2xl glass-light hover:border-brand-400/30 border border-white/8 p-4 transition"
                >
                  <Sparkles className="h-5 w-5 text-accent-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">Why me?</div>
                    <div className="text-xs text-ink-400">Skills & process</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* right - form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl glass border border-white/10 p-5 sm:p-7 lg:p-9"
              >
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field label="Your name" required>
                    <input
                      required
                      name="from_name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="input"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      name="from_email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="input"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Company / Project">
                    <input
                      name="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="input"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Estimated budget">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`rounded-full px-3 sm:px-4 py-2 text-sm font-medium transition border ${
                            form.budget === b
                              ? 'bg-brand-400 text-ink-950 border-brand-400'
                              : 'glass-light text-ink-200 border-white/8 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Tell me about it" required>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are you building, and what does success look like?"
                      className="input resize-none"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className="mt-7 group inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-brand-400 hover:bg-brand-300 disabled:opacity-70 text-ink-950 font-semibold py-4 transition-all shadow-xl shadow-brand-500/20 hover:shadow-brand-400/40"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Sending message...
                    </>
                  ) : isSent ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Message sent - I'll be in touch
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {isSent && (
                    <motion.p
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-center text-sm text-brand-300"
                    >
                      Thanks {submittedName || 'there'} - your message has been sent.
                    </motion.p>
                  )}

                  {status === 'error' && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-red-300"
                    >
                      <AlertCircle className="h-4 w-4" /> Message could not be sent. Please try again.
                    </motion.p>
                  )}

                  {status === 'missing-config' && (
                    <motion.p
                      key="config"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-accent-300"
                    >
                      <AlertCircle className="h-4 w-4" /> Add EmailJS keys in .env before sending.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.9rem;
          padding: 0.8rem 1rem;
          color: #f5f7fa;
          font-size: 0.95rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input::placeholder { color: #6b7891; }
        .input:focus {
          outline: none;
          border-color: #34d399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-200 mb-2">
        {label} {required && <span className="text-brand-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex min-w-0 items-center gap-4 rounded-2xl glass-light border border-white/8 p-4 hover:border-brand-400/30 transition">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400 group-hover:bg-brand-400 group-hover:text-ink-950 transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0"><div className="text-xs uppercase tracking-wider text-ink-500">{label}</div><div className="break-words text-white font-medium">{value}</div></div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}