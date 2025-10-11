'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, MapPin, Calendar, 
  Send, CheckCircle, AlertCircle,
  Globe, Clock, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', project: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'hello@whycrew.com',
      description: 'Get in touch for project inquiries'
    },
    {
      icon: MapPin,
      label: 'Global Offices',
      value: 'USA • Canada • Europe',
      description: 'Distributed team worldwide'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 Hours',
      description: 'Fast turnaround guaranteed'
    }
  ]

  const projectTypes = [
    'Cybersecurity Implementation',
    'AI Agent Development',
    'Full-Stack Application',
    'DevOps & Cloud Migration',
    'Data Analytics Platform',
    'Mobile Application',
    'Enterprise Integration',
    'Other'
  ]

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let&apos;s Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business with our expert development team? 
            Let&apos;s discuss your project and get started today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cyber-glow h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-2xl bg-cyber-blue/10 border border-cyber-blue/20 group-hover:scale-110 transition-transform">
                            <info.icon className="h-6 w-6 text-cyber-blue" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{info.label}</h4>
                            <p className="text-cyber-blue font-medium mb-1">{info.value}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 bg-gradient-to-br from-cyber-blue/5 via-cyber-purple/5 to-cyber-green/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Why Work With WhyCrew?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Users, text: 'Dedicated team of senior experts (8+ years avg experience)' },
                    { icon: Globe, text: 'Global talent pool with 24/7 coverage' },
                    { icon: CheckCircle, text: 'Proven track record with enterprise clients' },
                    { icon: Calendar, text: 'Flexible engagement models and rapid deployment' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-cyber-blue flex-shrink-0" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Start Your Project</CardTitle>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-cyber-green mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      We have got your details. We will be contacting you within 24 hours.
                    </p>
                    <Button
                      variant="cyber-outline"
                      onClick={() => setSubmitStatus('idle')}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn&apos;t send your message. Please try again or email us directly at hello@whycrew.com
                    </p>
                    <Button 
                      variant="cyber-outline"
                      onClick={() => setSubmitStatus('idle')}
                    >
                      Try Again
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-muted/30 bg-background/50 backdrop-blur-sm focus:border-cyber-blue focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-muted/30 bg-background/50 backdrop-blur-sm focus:border-cyber-blue focus:outline-none transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-muted/30 bg-background/50 backdrop-blur-sm focus:border-cyber-blue focus:outline-none transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-muted/30 bg-background/50 backdrop-blur-sm focus:border-cyber-blue focus:outline-none transition-colors"
                      >
                        <option value="">Select project type...</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-muted/30 bg-background/50 backdrop-blur-sm focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="cyber"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact