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
      {/* Super Team section */}
      <section className="bg-background py-24">
        <div className="container flex flex-col items-center gap-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-center">
            Our Super Team
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="flex flex-col items-center text-center gap-4">
              <img
                src="/ayomikun.jpeg"
                alt="Ayomikun Oyeniyi"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-card"
              />
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Ayomikun Oyeniyi
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Junior CS Major
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <img
                src="/thabhelo.jpg"
                alt="Thabhelo Dube"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-card"
              />
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Thabhelo Dube
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Junior CS Major
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-secondary/10 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About Mesh</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Mesh was born from a simple observation: Birmingham's public safety agencies have the expertise, dedication, and resources to save lives, but fragmented technology prevents them from working as one unified system.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
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
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Birmingham by the Numbers</h2>
            <p className="text-lg text-muted-foreground">
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
                className="p-6 rounded-lg border border-border hover:border-primary/60 transition-colors text-center bg-card shadow-card"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.num}</div>
                <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                <p className="text-muted-foreground text-sm">{stat.desc}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
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
              className="p-8 rounded-lg border border-border hover:border-primary/60 transition-colors bg-card shadow-card"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">{member.role}</h3>
              <p className="text-muted-foreground">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 shadow-card"
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">We're Hiring</h3>
          <p className="text-muted-foreground mb-4">
            Join us in transforming public safety. We're looking for passionate engineers, product leaders, and community advocates who believe in the power of unified systems to save lives.
          </p>
          <a
            href="mailto:careers@meshplatform.io"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            See Open Positions
            <ArrowRight size={18} />
          </a>
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Roadmap</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
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
                className="p-6 rounded-lg border border-border hover:border-primary/60 transition-colors bg-card shadow-card"
              >
                <div className="text-sm font-semibold text-primary mb-2">{phase.phase}</div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Partner With Mesh</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a public safety agency, technology partner, or grant funder, we invite you to be part of this transformative mission.
          </p>
          <RouterLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50 group"
          >
            Get in Touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </motion.div>
      </section>
    </PageLayout>
  );
}
