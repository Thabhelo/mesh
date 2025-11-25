import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Database, Cpu, BarChart3, Zap, Shield, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function Platform() {
  const features = [
    {
      icon: Database,
      title: 'Mesh Core Platform',
      description: 'Real-time data integration and unified feed for all connected agencies',
      details: [
        'Multi-source data ingestion',
        'Unified incident feed',
        'Real-time dashboard',
        'Cross-agency visibility',
      ],
    },
    {
      icon: Cpu,
      title: 'Mesh Insight Engine',
      description: 'AI-powered operational intelligence for predictive response',
      details: [
        'Surge detection algorithms',
        'Load balancing recommendations',
        'Hazard analysis & scoring',
        'Pattern recognition',
      ],
    },
    {
      icon: BarChart3,
      title: 'Integration Services',
      description: 'Seamless connection to your existing systems and data sources',
      details: [
        'CAD system connectors',
        'EPCR integration',
        'EHR connectivity',
        'Transit system APIs',
        'Weather data fusion',
      ],
    },
  ];

  const integrations = [
    'Computer-Aided Dispatch (CAD)',
    'Electronic Patient Care Reports (EPCR)',
    'Electronic Health Records (EHR)',
    'Transit Authority Systems',
    'Weather APIs',
    '911 Data',
    'Police Dispatch',
    'Fire Dispatch',
    'EMS Systems',
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
      {/* Product hero */}
      <section className="bg-background py-20 md:py-24">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary">
                Unified Public Safety Network
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-foreground">
                a unified, AI‑powered data layer
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Mesh finally connects fire, police, EMS, 911, hospitals, transit, and emergency
              management into one shared, real‑time network. Every call, unit, and incident lives
              in a single, live view.
            </p>

            <div className="flex flex-wrap gap-4">
              <RouterLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/40 group"
              >
                Request a live demo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </RouterLink>
              <RouterLink
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-primary/60 rounded-lg font-semibold text-foreground hover:bg-primary/5 transition-all"
              >
                How Mesh works
              </RouterLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three pillars of the Mesh platform
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Under the hood, Mesh combines a real‑time integration layer, an insight engine, and
            white‑glove integration services to make every agency feel like one team.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-lg border border-border hover:border-primary/60 hover:bg-primary/5 transition-all group shadow-card"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-background to-secondary/15 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Mesh translates and streams all public safety information into one standardized feed, eliminating silos and enabling coordinated response.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { num: '1', title: 'Connect', desc: 'Integrate with existing CAD, EHR, transit, and weather systems' },
              { num: '2', title: 'Normalize', desc: 'Translate data into unified format across all agencies' },
              { num: '3', title: 'Analyze', desc: 'AI engine detects patterns and predicts surge events' },
              { num: '4', title: 'Respond', desc: 'Dashboard provides actionable intelligence for better decisions' },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="p-6 rounded-lg border border-border hover:border-primary/60 transition-colors bg-card shadow-card">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 text-primary">
                    <ArrowRight size={20} />
                  </div>
                )}
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Integration Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Mesh seamlessly connects to the systems your agencies already use, ensuring no disruption to existing workflows.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 rounded-lg border border-border hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center gap-3 bg-card shadow-card"
            >
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground">{integration}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-background to-muted py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Key Capabilities</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: Zap,
                title: 'Real-Time Incident Surge Prediction',
                desc: 'Detect when call volumes in a district are rising faster than expected based on time-of-day, historical patterns, and live signals.',
              },
              {
                icon: BarChart3,
                title: 'Smart Resource Load Balancing',
                desc: 'Get data-driven recommendations when one station becomes overloaded and another can assist. Prevent burnout and optimize coverage.',
              },
              {
                icon: Shield,
                title: 'Unified Hazard Analysis',
                desc: 'Fuse weather alerts, traffic patterns, 911 activity, outages, and historical trends into a single hazard score showing escalating conditions.',
              },
              {
                icon: Clock,
                title: 'Predictive Response Planning',
                desc: 'Anticipate demand patterns during major events, severe weather, and peak hours with 24-hour look-ahead windows.',
              },
              {
                icon: Database,
                title: 'Centralized Data Lake',
                desc: 'All agency data normalized and accessible through a single, standards-based schema with full audit trails and access controls.',
              },
              {
                icon: Shield,
                title: 'Privacy-First Architecture',
                desc: 'Zero surveillance, no facial recognition, no individual-level prediction. All intelligence is operations-focused and auditable.',
              },
            ].map((cap, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border hover:border-primary/60 group transition-all bg-card shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <cap.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.desc}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Transform Public Safety Response?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us show you how Mesh can unite your agencies and save lives through real-time intelligence.
          </p>
          <RouterLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50 group"
          >
            Schedule a Demo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </motion.div>
      </section>
    </PageLayout>
  );
}
