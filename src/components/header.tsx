'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Shield, Code, Bot, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-cyber-blue transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button 
              variant="cyber" 
              size="sm"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Started
            </Button>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground/80 hover:text-cyber-blue transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button 
                  variant="cyber" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                    setIsOpen(false)
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header