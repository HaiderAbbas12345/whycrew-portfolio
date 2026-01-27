'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Linkedin,
  Mail,
  MapPin,
  Shield,
  Bot,
  Cloud,
  Code,
  Users,
  Rocket,
  Award,
  TrendingUp
} from 'lucide-react'

const Leadership = () => {
  const achievements = [
    { icon: Code, value: '6+', label: 'Years Experience' },
    { icon: Users, value: '50+', label: 'Engineers Led' },
    { icon: Shield, value: '10+', label: 'Security Products' },
    { icon: TrendingUp, value: '70%', label: 'Efficiency Gains' },
  ]

  const expertise = [
    'Cybersecurity Architecture',
    'AI Agent Development',
    'Cloud Automation',
    'Team Leadership',
    'Product Development',
    'Threat Intelligence',
  ]

  return (
    <section id="leadership" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4" />
            Meet the Founder
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Driven by innovation, powered by experience
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
          >
            {/* Profile Image */}
            <div className="lg:col-span-2 flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-green rounded-3xl blur-2xl opacity-30" />

                {/* Image container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                  <Image
                    src="/yasir-abbas.png"
                    alt="Yasir Abbas - CEO & Founder of WhyCrew"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 288px, 320px"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Badge */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-blue to-cyber-purple px-6 py-2 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white font-semibold text-sm">CEO & Founder</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Yasir Abbas
                </motion.h3>
                <motion.div
                  className="flex items-center gap-2 text-muted-foreground mb-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <MapPin className="w-4 h-4 text-cyber-blue" />
                  <span>Lahore, Pakistan</span>
                </motion.div>
              </div>

              <motion.div
                className="space-y-4 text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p>
                  A technology leader with over 6 years of hands-on experience building production-grade
                  systems across cybersecurity, AI, and cloud infrastructure. Founded WhyCrew to bridge
                  the gap between world-class tech talent and global businesses seeking quality without compromise.
                </p>
                <p>
                  Previously led engineering teams at cybersecurity companies, architecting threat intelligence
                  platforms, SOAR solutions, and data pipelines processing millions of security events daily.
                  Achieved 70% efficiency improvements through intelligent automation and workflow optimization.
                </p>
                <p>
                  Currently pioneering AI agent development, including voice-enabled assistants for real estate
                  lead generation and intelligent document processing systems. Passionate about building
                  technology that solves real business problems at scale.
                </p>
              </motion.div>

              {/* Expertise Tags */}
              <motion.div
                className="flex flex-wrap gap-2 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {expertise.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-muted-foreground hover:border-cyber-blue/50 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex items-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href="https://www.linkedin.com/in/yasirabbasai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="mailto:yasir@whycrew.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {achievements.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Leadership
