'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, Bot, Code, Cloud, Users, Zap, 
  Lock, Brain, Database, Monitor, Globe, Cpu,
  ArrowRight, CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Services = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Shield,
      title: 'Cybersecurity Product Development',
      description: 'Custom cybersecurity products and platforms built by cyber matter experts with deep domain knowledge.',
      features: [
        'Security Platform & Product Development',
        'SOC (Security Operations Center) Solutions',
        'Threat Intelligence Platforms',
        'Custom Security Tools & Automation',
        'SIEM/SOAR Platform Development',
        'Zero Trust Architecture Implementation',
        'Advanced Threat Detection Systems'
      ],
      technologies: ['SIEM', 'SOAR', 'EDR', 'XDR', 'MITRE ATT&CK', 'Zero Trust', 'Threat Intel'],
      color: 'cyber-blue'
    },
    {
      icon: Bot,
      title: 'AI Agent Development',
      description: 'Custom AI agents and intelligent automation solutions for enterprise workflows.',
      features: [
        'Custom LLM Integration & Fine-tuning',
        'Intelligent Process Automation',
        'Natural Language Processing Solutions',
        'Computer Vision & Image Recognition',
        'Predictive Analytics & ML Models',
        'AI-Powered Decision Support Systems'
      ],
      technologies: ['OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face', 'AWS SageMaker'],
      color: 'cyber-purple'
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Modern web and mobile applications built with cutting-edge technologies.',
      features: [
        'React/Next.js Frontend Development',
        'Node.js/Python Backend Services',
        'Cloud-Native Architecture',
        'Microservices & API Development',
        'Mobile App Development',
        'DevOps & CI/CD Pipeline'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'Go', 'TypeScript'],
      color: 'cyber-green'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cyber matter experts and AI specialists accelerate cybersecurity product development with cutting-edge solutions and deep domain expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveService(index)}
            >
              <Card className={`h-full transition-all duration-300 border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 ${
                activeService === index ? 'cyber-glow scale-105' : ''
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 rounded-2xl bg-${service.color}/10 border border-${service.color}/20 mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-8 w-8 text-${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className={`h-5 w-5 text-${service.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-muted/20">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Key Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted/50 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Users, title: 'Expert Team', desc: '50+ Senior Developers', color: 'cyber-blue' },
            { icon: Globe, title: 'Global Coverage', desc: '24/7 Development Cycles', color: 'cyber-purple' },
            { icon: Zap, title: 'Fast Delivery', desc: 'Agile Development Process', color: 'cyber-green' },
            { icon: Lock, title: 'Secure by Design', desc: 'Security-First Approach', color: 'cyber-blue' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className={`mx-auto p-4 rounded-2xl bg-${stat.color}/10 border border-${stat.color}/20 mb-4 group-hover:scale-110 transition-transform w-fit`}>
                <stat.icon className={`h-8 w-8 text-${stat.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <p className="text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            variant="cyber" 
            size="xl" 
            className="group"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services