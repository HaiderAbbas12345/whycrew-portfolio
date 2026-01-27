"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bot, Code, Users, ArrowRight, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-cyber-blue/5"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyber-green/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-4 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-cyber-blue" />
              <span className="sm:text-sm text-xs font-medium text-cyber-blue">
                Cybersecurity
              </span>
            </div>
            <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full hidden sm:block" />
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-cyber-purple" />
              <span className="sm:text-sm text-xs font-medium text-cyber-purple">
                AI Development
              </span>
            </div>
            <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full hidden sm:block" />
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="sm:text-sm text-xs font-medium text-amber-500">
                Automation
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Cybersecurity & AI</span>
            <br />
            <span className="text-foreground">Development Experts</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            A development-first technology partner specializing in secure, production-ready solutions.
            We build scalable systems across AI, cybersecurity, and product development—transforming
            ideas into deployable products that work in real environments.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              variant="cyber"
              size="xl"
              className="group"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="cyber-outline"
              size="xl"
              onClick={() => {
                const portfolioSection = document.getElementById("portfolio");
                portfolioSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Shield,
                label: "Cybersecurity",
                desc: "SOC & Threat Intel",
              },
              { icon: Bot, label: "AI Agents", desc: "Custom Development" },
              { icon: Code, label: "Full-Stack", desc: "Modern Tech Stack" },
              { icon: Globe, label: "Global Talent", desc: "24/7 Coverage" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-4 group-hover:bg-white/10 transition-all duration-300 cyber-glow">
                  <item.icon className="h-8 w-8 text-cyber-blue group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
