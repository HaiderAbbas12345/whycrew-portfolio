'use client'

import Image from 'next/image'
import { Shield, Github, Linkedin, Twitter, Mail, ArrowUp, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    Services: [
      'Cybersecurity Platform Development',
      'AI-Powered Threat Detection',
      'SIEM & SOAR Solutions',
      'Enterprise Applications',
      'Cloud Security',
      'Compliance Automation'
    ],
    Company: [
      'About Us',
      'Our Team',
      'Careers',
      'Blog',
      'Case Studies',
      'Contact'
    ],
    Resources: [
      'Documentation',
      'White Papers',
      'Security Guides',
      'Best Practices',
      'Tools & Frameworks',
      'Support'
    ],
    Legal: [
      'Privacy Policy',
      'Terms of Service',
      'Security Policy',
      'Compliance',
      'Cookie Policy',
      'GDPR'
    ]
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yasirabbasai/', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@whycrew.com', label: 'Email' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 border-t border-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/logo.jpeg"
                  alt="WhyCrew Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-cover rounded-full ring-2 ring-cyber-blue/20"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">
                WhyCrew
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              A development-first technology partner specializing in secure, production-ready solutions.
              We build scalable systems across AI, cybersecurity, and product development—transforming
              ideas into deployable products that work in real environments.
            </p>

            <div className="pt-4 border-t border-muted/20 space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Yasir Abbas</span>
                <br />
                CEO & Founder
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Lahore, Pakistan
              </p>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-blue/50 transition-all duration-300 cyber-glow group"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-cyber-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-cyber-blue transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-muted/30 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} WhyCrew. All rights reserved.</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group hover:bg-cyber-blue/10 hover:text-cyber-blue"
          >
            <ArrowUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
            Back to top
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    </footer>
  )
}

export default Footer