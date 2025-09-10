'use client'

import { motion } from 'framer-motion'
import { 
  Shield, Code, Database, Cloud, Bot, Zap, 
  Lock, Users, Monitor, Globe, Cpu, Layers 
} from 'lucide-react'

const Expertise = () => {
  const expertiseAreas = [
    {
      category: 'Cybersecurity',
      icon: Shield,
      color: 'cyber-blue',
      skills: [
        { name: 'SIEM/SOAR Implementation', level: 95 },
        { name: 'Threat Intelligence', level: 90 },
        { name: 'Penetration Testing', level: 92 },
        { name: 'Incident Response', level: 88 },
        { name: 'Compliance (SOC2, HIPAA)', level: 85 },
        { name: 'Security Architecture', level: 93 }
      ]
    },
    {
      category: 'AI & Machine Learning',
      icon: Bot,
      color: 'cyber-purple',
      skills: [
        { name: 'LLM Integration', level: 90 },
        { name: 'Computer Vision', level: 85 },
        { name: 'NLP Processing', level: 88 },
        { name: 'ML Model Deployment', level: 87 },
        { name: 'AI Agent Development', level: 92 },
        { name: 'Deep Learning', level: 86 }
      ]
    },
    {
      category: 'Backend Development',
      icon: Database,
      color: 'cyber-green',
      skills: [
        { name: 'Node.js/Express', level: 95 },
        { name: 'Python/Django/FastAPI', level: 93 },
        { name: 'Go Programming', level: 88 },
        { name: 'C#/.NET Core', level: 90 },
        { name: 'Microservices Architecture', level: 92 },
        { name: 'API Development', level: 96 }
      ]
    },
    {
      category: 'Frontend Development',
      icon: Monitor,
      color: 'cyber-blue',
      skills: [
        { name: 'React/Next.js', level: 96 },
        { name: 'TypeScript', level: 94 },
        { name: 'Angular', level: 88 },
        { name: 'Vue.js', level: 85 },
        { name: 'Mobile Development', level: 82 },
        { name: 'UI/UX Design', level: 87 }
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      color: 'cyber-purple',
      skills: [
        { name: 'AWS/Azure/GCP', level: 92 },
        { name: 'Docker/Kubernetes', level: 90 },
        { name: 'CI/CD Pipelines', level: 88 },
        { name: 'Infrastructure as Code', level: 86 },
        { name: 'Monitoring & Logging', level: 89 },
        { name: 'Service Mesh', level: 83 }
      ]
    },
    {
      category: 'Data & Analytics',
      icon: Cpu,
      color: 'cyber-green',
      skills: [
        { name: 'Data Engineering', level: 88 },
        { name: 'Big Data Processing', level: 85 },
        { name: 'Real-time Analytics', level: 87 },
        { name: 'Data Visualization', level: 82 },
        { name: 'ETL/ELT Pipelines', level: 89 },
        { name: 'Business Intelligence', level: 84 }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    },
  }

  return (
    <section id="expertise" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team combines deep technical knowledge with practical experience across cutting-edge technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.category}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 cyber-glow">
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`p-3 rounded-2xl bg-${area.color}/10 border border-${area.color}/20`}>
                    <area.icon className={`h-8 w-8 text-${area.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold">{area.category}</h3>
                </div>

                <div className="space-y-6">
                  {area.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${
                              area.color === 'cyber-blue' ? '#00d4ff' :
                              area.color === 'cyber-purple' ? '#8b5cf6' : '#10b981'
                            }, ${
                              area.color === 'cyber-blue' ? '#00d4ff99' :
                              area.color === 'cyber-purple' ? '#8b5cf699' : '#10b98199'
                            })`
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-muted/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Proficiency</span>
                    <span className="font-semibold text-foreground">
                      {Math.round(area.skills.reduce((acc, skill) => acc + skill.level, 0) / area.skills.length)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyber-blue/10 via-cyber-purple/10 to-cyber-green/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our Expertise?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Senior-Level Team</h4>
                <p className="text-muted-foreground">
                  Average 8+ years experience in enterprise environments
                </p>
              </div>
              <div className="text-center">
                <Zap className="h-12 w-12 text-cyber-purple mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Rapid Deployment</h4>
                <p className="text-muted-foreground">
                  Pre-vetted talent ready to integrate within 48 hours
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-cyber-green mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Global Reach</h4>
                <p className="text-muted-foreground">
                  24/7 coverage across multiple time zones
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Expertise