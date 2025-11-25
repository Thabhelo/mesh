import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Orb from '../components/Orb';

export default function Home() {
  const stats = [
    { label: 'Metro Population', value: '1.1M+' },
    { label: 'Annual EMS Calls', value: '200K+' },
    { label: 'Dispatch Centers', value: '14' },
    { label: 'Agencies Connected', value: 'Unlimited' },
  ];

  const capabilities = [
    {
      icon: TrendingUp,
      title: 'Incident Surge Prediction',
      description: 'AI-powered detection of rising call volumes in districts before they become critical.',
      features: ['Real-time pattern analysis', 'Predictive alerts', 'District-level insights'],
    },
    {
      icon: Zap,
      title: 'Resource Load Balancing',
      description: 'Smart recommendations for optimal resource deployment across the region.',
      features: ['Dynamic rebalancing', 'Overload prevention', 'Cross-agency coordination'],
    },
    {
      icon: AlertTriangle,
      title: 'Hazard Analysis',
      description: 'Multi-source data fusion revealing escalating conditions and emerging threats.',
      features: ['Weather integration', 'Traffic monitoring', 'Real-time scoring'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <Orb hoverIntensity={2} rotateOnHover={true} hue={0} forceHoverState={false} />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-400">Now Powering Public Safety in Birmingham</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Real-Time Public Safety <span className="text-red-500">Interoperability</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Mesh unifies fragmented emergency response across fire, police, EMS, and emergency management with AI-powered operational intelligence that saves lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <RouterLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/50 group"
              >
                Request Demo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </RouterLink>
              <RouterLink
                to="/platform"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 hover:border-red-500/50 text-white rounded-lg font-semibold transition-all hover:bg-red-500/10"
              >
                Learn More
              </RouterLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container py-24">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Challenge</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Birmingham's emergency response ecosystem spans 14 independent dispatch centers, multiple CAD systems, and dozens of agencies operating in silos. Without real-time data integration, critical incidents are delayed, resources are misallocated, and lives are at risk.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { icon: Users, title: 'Fragmented Communications', desc: '14 dispatch centers operating independently without shared data' },
              { icon: TrendingUp, title: 'Rising Demand', desc: '200,000+ emergencies annually with increasing call volumes' },
              { icon: AlertTriangle, title: 'Limited Situational Awareness', desc: 'Staff shortages and resource constraints during peak incidents' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-slate-800 hover:border-red-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <item.icon size={24} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
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
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Mesh Insight Engine</h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            Three mission-critical capabilities powered by AI, providing operations-focused intelligence without surveillance or individual-level prediction.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-lg border border-slate-800 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <cap.icon size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-slate-400 mb-4">{cap.description}</p>
              <ul className="space-y-2">
                {cap.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-r from-red-600/10 to-red-500/5 border-y border-red-500/20 py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ethical, Transparent, Community-First</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Mesh avoids surveillance, facial recognition, and individual-level prediction. All intelligence is operations-focused, auditable, and aligned with community privacy standards.
            </p>
            <RouterLink
              to="/platform"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/50"
            >
              Explore the Platform
              <ArrowRight size={20} />
            </RouterLink>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
