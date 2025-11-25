import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Check, AlertCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: 'demo',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('contact_requests').insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', company: '', type: 'demo', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit form');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageLayout>
      <section className="container py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Ready to transform emergency response in Birmingham? We'd love to hear from you. Reach out to schedule a demo, explore partnerships, or learn more about how Mesh can help your agencies.
            </p>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <a
                    href="mailto:info@meshplatform.io"
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    info@meshplatform.io
                  </a>
                  <p className="text-slate-500 text-sm mt-1">We respond within 24 hours</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <a
                    href="tel:+1205555100"
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    (205) 555-0100
                  </a>
                  <p className="text-slate-500 text-sm mt-1">Available Monday-Friday, 8am-6pm CST</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-slate-400">
                    Birmingham, AL<br />
                    United States
                  </p>
                  <p className="text-slate-500 text-sm mt-1">Serving all of Jefferson County and beyond</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Your agency or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type of Inquiry *</label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="demo">Request a Demo</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  placeholder="Tell us about your needs and how Mesh can help..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{errorMessage || 'Failed to submit. Please try again.'}</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Check size={20} className="text-green-500 flex-shrink-0" />
                  <p className="text-green-400 text-sm">Thank you! We'll be in touch soon.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check size={20} />
                    Submitted
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-300">Quick answers to common questions about Mesh</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                q: 'How long does implementation take?',
                a: 'Most initial integrations are operational within 60-90 days. The timeline depends on your existing systems and complexity.',
              },
              {
                q: 'Can Mesh work with our existing CAD system?',
                a: 'Yes. Mesh integrates with major CAD vendors and can custom-build connectors for specific systems.',
              },
              {
                q: 'Is my data secure and private?',
                a: 'Absolutely. Mesh uses enterprise-grade encryption, role-based access controls, and zero-surveillance architecture.',
              },
              {
                q: 'What about costs?',
                a: 'We offer subscription-based pricing for agencies plus integration services. Initial grants from DHS, FEMA, and DOJ often cover startup costs.',
              },
              {
                q: 'Can we start with a pilot?',
                a: 'Yes. We recommend starting with 1-2 agencies to prove value before full regional deployment.',
              },
              {
                q: 'How do you handle data from multiple vendors?',
                a: 'Mesh normalizes all data into a unified schema, so different systems work seamlessly together in one interface.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-slate-800 hover:border-red-500/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
