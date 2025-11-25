import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Users, Target, Heart, Zap } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function About() {
  const team = [
    { role: 'AI/ML Engineer', desc: 'Builds surge prediction and hazard analysis models' },
    { role: 'Backend Integrations Engineer', desc: 'Manages CAD, EPCR, EHR, and API connectors' },
    { role: 'Frontend Developer', desc: 'Creates dashboard and portal interfaces' },
    { role: 'Public Safety Liaison', desc: 'Former dispatcher, EMS leader, or fire officer' },
  ];

  const timeline = [
    { phase: 'Phase 1', title: 'Foundation', items: ['Core platform development', 'Initial agency partnerships', 'Pilot deployment planning'] },
    { phase: 'Phase 2', title: 'Integration', items: ['CAD system connections', 'Data normalization', 'Dashboard launch'] },
    { phase: 'Phase 3', title: 'Intelligence', items: ['Surge prediction launch', 'Load balancing features', 'Advanced analytics'] },
    { phase: 'Phase 4', title: 'Scale', items: ['Multi-region deployment', 'Full hazard analysis', 'Enterprise features'] },
  ];

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
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Mesh</h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Mesh was born from a simple observation: Birmingham's public safety agencies have the expertise, dedication, and resources to save lives, but fragmented technology prevents them from working as one unified system.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              We're building the backbone that connects every agency in real-time, powered by AI-driven intelligence that helps responders make faster, better decisions when lives are on the line.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-24">
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            {
              icon: Heart,
              title: 'Mission',
              desc: 'Save lives through unified, real-time public safety interoperability.',
            },
            {
              icon: Target,
              title: 'Vision',
              desc: 'Every emergency response agency operating as one coordinated system.',
            },
            {
              icon: Zap,
              title: 'Values',
              desc: 'Transparency, ethics, community-first, and operational excellence.',
            },
            {
              icon: Users,
              title: 'Focus',
              desc: 'Serving first responders and the communities they protect.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Birmingham by the Numbers</h2>
            <p className="text-lg text-slate-300">
              Understanding the scale and complexity of Birmingham's emergency response landscape.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { num: '1.1M+', label: 'Metro Population', desc: 'Spanning multiple counties and jurisdictions' },
              { num: '200K+', label: 'Annual Emergencies', desc: 'EMS, fire, police, and hazmat incidents' },
              { num: '14', label: 'Dispatch Centers', desc: 'Operating independently without data integration' },
              { num: '4M', label: 'Initial Investment', desc: 'Jefferson County allocated for 15 new ambulances alone' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-slate-800 hover:border-red-500/50 transition-colors text-center"
              >
                <div className="text-4xl font-bold text-red-500 mb-2">{stat.num}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <p className="text-slate-400 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-lg text-slate-300 max-w-2xl">
            Mesh combines expertise in emergency services, software engineering, and AI to solve the hardest problem in public safety: real-time coordination.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-lg border border-slate-800 hover:border-red-500/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{member.role}</h3>
              <p className="text-slate-400">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-lg bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20"
        >
          <h3 className="text-xl font-semibold text-white mb-3">We're Hiring</h3>
          <p className="text-slate-300 mb-4">
            Join us in transforming public safety. We're looking for passionate engineers, product leaders, and community advocates who believe in the power of unified systems to save lives.
          </p>
          <a
            href="mailto:careers@meshplatform.io"
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            See Open Positions
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Roadmap</h2>
            <p className="text-lg text-slate-300 max-w-2xl">
              Our path to scaling unified emergency response across Birmingham and beyond.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-slate-800 hover:border-red-500/50 transition-colors"
              >
                <div className="text-sm font-semibold text-red-500 mb-2">{phase.phase}</div>
                <h3 className="text-lg font-semibold text-white mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Partner With Mesh</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you're a public safety agency, technology partner, or grant funder, we invite you to be part of this transformative mission.
          </p>
          <RouterLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/50 group"
          >
            Get in Touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </motion.div>
      </section>
    </PageLayout>
  );
}
