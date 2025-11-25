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
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary">Now Powering Public Safety in Birmingham</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Real-Time Public Safety <span className="text-primary">Interoperability</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Mesh unifies fragmented emergency response across fire, police, EMS, and emergency management with AI-powered operational intelligence that saves lives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <RouterLink
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50 group"
                >
                  Request Demo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </RouterLink>
                <RouterLink
                  to="/platform"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-primary/50 text-foreground rounded-lg font-semibold transition-all hover:bg-primary/10"
                >
                  Learn More
                </RouterLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-[360px] md:h-[500px] lg:h-[900px]">
                <Orb hoverIntensity={0.4} rotateOnHover={true} forceHoverState={false} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <motion.div
          className="grid md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card/80 backdrop-blur-xl px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.35)] group"
            >
              <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-8 w-28 h-28 bg-gradient-to-tr from-primary/25 to-secondary/20 rounded-full blur-3xl" />
              </div>
              <div className="relative text-center space-y-1">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-background to-secondary/20 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">The Challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
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
                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Mesh Insight Engine</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
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
              className="p-8 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <cap.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{cap.title}</h3>
              <p className="text-muted-foreground mb-4">{cap.description}</p>
              <ul className="space-y-2">
                {cap.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-primary/20 py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ethical, Transparent, Community-First</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Mesh avoids surveillance, facial recognition, and individual-level prediction. All intelligence is operations-focused, auditable, and aligned with community privacy standards.
            </p>
            <RouterLink
              to="/platform"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50"
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
