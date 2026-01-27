'use client'

import { motion } from 'framer-motion'
import {
  Search, PenTool, Code, Rocket,
  Users, Building, TrendingUp, Shield, Wrench,
  Calendar, Clock, Package, FileCheck
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Process = () => {
  const processSteps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'We analyze your requirements, understand your goals, and identify the best approach for your project.',
      color: 'cyber-blue'
    },
    {
      icon: PenTool,
      title: 'Design',
      description: 'Our team creates detailed architecture, wireframes, and technical specifications tailored to your needs.',
      color: 'cyber-purple'
    },
    {
      icon: Code,
      title: 'Build',
      description: 'Agile development with transparent communication, regular updates, and security-first implementation.',
      color: 'cyber-green'
    },
    {
      icon: Rocket,
      title: 'Deploy',
      description: 'Production-ready deployment with monitoring, documentation, and ongoing support for your solution.',
      color: 'cyber-orange'
    }
  ]

  const targetAudience = [
    {
      icon: Users,
      title: 'Founders',
      description: 'Validating security/SaaS ideas and building MVPs'
    },
    {
      icon: Wrench,
      title: 'Tech Professionals',
      description: 'Building side ventures and passion projects'
    },
    {
      icon: TrendingUp,
      title: 'Startups',
      description: 'Scaling MVPs to production-ready products'
    },
    {
      icon: Building,
      title: 'Enterprises',
      description: 'Modernizing legacy systems and infrastructure'
    },
    {
      icon: Shield,
      title: 'Security Teams',
      description: 'Automating operations and threat response'
    }
  ]

  const engagementModels = [
    {
      icon: Package,
      title: 'MVP Development',
      duration: '8-12 weeks',
      description: 'Fixed scope from idea to deployed product',
      color: 'cyber-blue'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      duration: 'Monthly',
      description: 'Retainer for extended product development',
      color: 'cyber-purple'
    },
    {
      icon: Code,
      title: 'Feature Build',
      duration: 'Per Feature',
      description: 'Pricing for specific enhancements',
      color: 'cyber-green'
    },
    {
      icon: FileCheck,
      title: 'Security Audit',
      duration: 'Project-Based',
      description: 'Assessment and remediation services',
      color: 'cyber-orange'
    }
  ]

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* How We Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Agile execution with transparent communication, realistic timelines, and security-first development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cyber-glow h-full">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-muted-foreground/30 mr-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`p-3 rounded-2xl bg-${step.color}/10 border border-${step.color}/20`}>
                      <step.icon className={`h-6 w-6 text-${step.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Who We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Who We <span className="gradient-text">Serve</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From early-stage founders to enterprise security teams, we partner with organizations at every stage
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
          {targetAudience.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center h-full hover:bg-white/10 transition-all duration-300 cyber-glow">
                <div className="p-3 rounded-2xl bg-cyber-blue/10 border border-cyber-blue/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <audience.icon className="h-6 w-6 text-cyber-blue" />
                </div>
                <h3 className="font-semibold mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground">{audience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Engagement <span className="gradient-text">Models</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible engagement options designed to match your project needs and timeline
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementModels.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cyber-glow h-full">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-2xl bg-${model.color}/10 border border-${model.color}/20 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <model.icon className={`h-6 w-6 text-${model.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${model.color}/10 text-${model.color} mb-3`}>
                    <Clock className="h-3 w-3 mr-1" />
                    {model.duration}
                  </div>
                  <p className="text-muted-foreground text-sm">{model.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
