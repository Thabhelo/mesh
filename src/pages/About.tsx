import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight, Users, Target, Heart, Zap } from "lucide-react";
import PageLayout from "../components/PageLayout";

export default function About() {
  const timeline = [
    {
      phase: "Phase 1",
      title: "Foundation",
      items: [
        "Core platform development",
        "Initial agency partnerships",
        "Pilot deployment planning",
      ],
    },
    {
      phase: "Phase 2",
      title: "Integration",
      items: [
        "CAD system connections",
        "Data normalization",
        "Dashboard launch",
      ],
    },
    {
      phase: "Phase 3",
      title: "Intelligence",
      items: [
        "Surge prediction launch",
        "Load balancing features",
        "Advanced analytics",
      ],
    },
    {
      phase: "Phase 4",
      title: "Scale",
      items: [
        "Multi-region deployment",
        "Full hazard analysis",
        "Enterprise features",
      ],
    },
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
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
                alt="Thabhelo Duve"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-card"
              />
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Thabhelo Duve
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Junior CS Major
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <img
                src="/oluwatosin.jpg"
                alt="Oluwatosin Oseni"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover object-top shadow-card"
              />
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Oluwatosin Oseni
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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Mesh
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Mesh was born from a simple observation: Birmingham's public
              safety agencies have the expertise, dedication, and resources to
              save lives, but fragmented technology prevents them from working
              as one unified system.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building the backbone that connects every agency in
              real-time, powered by AI-driven intelligence that helps responders
              make faster, better decisions when lives are on the line.
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
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              icon: Heart,
              title: "Mission",
              desc: "Save lives through unified, real-time public safety interoperability.",
            },
            {
              icon: Target,
              title: "Vision",
              desc: "Every emergency response agency operating as one coordinated system.",
            },
            {
              icon: Zap,
              title: "Values",
              desc: "Transparency, ethics, community-first, and operational excellence.",
            },
            {
              icon: Users,
              title: "Focus",
              desc: "Serving first responders and the communities they protect.",
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
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Roadmap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Our path to scaling unified emergency response across Birmingham
              and beyond.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border hover:border-primary/60 transition-colors bg-card shadow-card"
              >
                <div className="text-sm font-semibold text-primary mb-2">
                  {phase.phase}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-muted-foreground text-sm flex items-start gap-2"
                    >
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Partner With Mesh
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a public safety agency, technology partner, or grant
            funder, we invite you to be part of this transformative mission.
          </p>
          <RouterLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50 group"
          >
            Get in Touch
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </RouterLink>
        </motion.div>
      </section>
    </PageLayout>
  );
}
