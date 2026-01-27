"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Network,
  Users,
  Shield,
  Radar,
  Globe,
  Mail,
  Cloud,
  Eye,
  FolderOpen,
  GraduationCap,
  X,
  Calendar,
  Zap,
  CheckCircle,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Lock,
  Database,
  Cpu,
  Activity,
  Server,
  Code,
  Terminal,
  Binary,
  Workflow,
  Target,
  AlertTriangle,
  Search,
  FileSearch,
  BrainCircuit,
  Bot,
  Headset,
  FileText,
  MessageSquare,
  Home,
  Phone,
  FileCheck,
  Scan,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, categories, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  network: Network,
  users: Users,
  shield: Shield,
  radar: Radar,
  globe: Globe,
  mail: Mail,
  cloud: Cloud,
  eye: Eye,
  folder: FolderOpen,
  graduation: GraduationCap,
  bot: Bot,
  headset: Headset,
  filetext: FileText,
};

// Project Visual Component - Creates unique animated graphics for each project
const ProjectVisual = ({ project, isHovered }: { project: Project; isHovered: boolean }) => {
  const Icon = iconMap[project.icon] || Shield;

  // Unique visual elements based on project type
  const renderVisualElements = () => {
    switch (project.icon) {
      case "network": // ML NetFlow
        return (
          <>
            {/* Neural network visualization */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-cyan-400/60"
                  style={{
                    left: `${20 + (i % 3) * 30}%`,
                    top: `${25 + Math.floor(i / 3) * 40}%`,
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.line x1="26%" y1="30%" x2="50%" y2="30%" stroke="rgba(0,212,255,0.4)" strokeWidth="2"
                  animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.line x1="50%" y1="30%" x2="74%" y2="30%" stroke="rgba(0,212,255,0.4)" strokeWidth="2"
                  animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.line x1="26%" y1="70%" x2="50%" y2="70%" stroke="rgba(0,212,255,0.4)" strokeWidth="2"
                  animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
                <motion.line x1="50%" y1="70%" x2="74%" y2="70%" stroke="rgba(0,212,255,0.4)" strokeWidth="2"
                  animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
                />
                <motion.line x1="50%" y1="30%" x2="50%" y2="70%" stroke="rgba(0,212,255,0.6)" strokeWidth="2"
                  animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </svg>
              {/* Data flow particles */}
              {isHovered && [...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300"
                  initial={{ x: "20%", y: "50%", opacity: 0 }}
                  animate={{
                    x: ["20%", "80%"],
                    y: ["50%", `${30 + Math.random() * 40}%`],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </div>
            <BrainCircuit className="absolute bottom-4 right-4 w-8 h-8 text-cyan-400/30" />
          </>
        );

      case "users": // HRMS
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Org chart visualization */}
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-purple-500/40 border-2 border-purple-400/60 flex items-center justify-center"
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-5 h-5 text-purple-300" />
              </motion.div>
              {/* Connection lines to subordinates */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="50%" y1="20%" x2="25%" y2="50%" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
                <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
                <line x1="50%" y1="20%" x2="75%" y2="50%" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
              </svg>
              {[25, 50, 75].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded-full bg-purple-500/30 border-2 border-purple-400/40"
                  style={{ left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                  animate={{ y: isHovered ? [0, -5, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Workflow arrows */}
              {isHovered && (
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Workflow className="w-6 h-6 text-purple-400/50" />
                </motion.div>
              )}
            </div>
          </>
        );

      case "shield": // SOAR
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Central shield with pulse */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-16 h-16 text-emerald-400/60" />
              </motion.div>
              {/* Orbiting elements */}
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: Math.cos((angle + (isHovered ? 360 : 0)) * Math.PI / 180) * 50 - 12,
                    y: Math.sin((angle + (isHovered ? 360 : 0)) * Math.PI / 180) * 50 - 12,
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {i === 0 && <Zap className="w-3 h-3 text-emerald-300" />}
                  {i === 1 && <Activity className="w-3 h-3 text-emerald-300" />}
                  {i === 2 && <Terminal className="w-3 h-3 text-emerald-300" />}
                  {i === 3 && <CheckCircle className="w-3 h-3 text-emerald-300" />}
                </motion.div>
              ))}
              {/* Pulse rings */}
              {isHovered && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400/30"
                  initial={{ width: 40, height: 40, opacity: 0.8 }}
                  animate={{ width: 120, height: 120, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                />
              ))}
            </div>
          </>
        );

      case "radar": // Threat Intel
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Radar sweep */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-orange-400/30"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-orange-400/40"
                />
                <motion.div
                  className="absolute inset-8 rounded-full border-2 border-orange-400/50"
                />
                {/* Radar sweep line */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-orange-500 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* Threat dots */}
                {isHovered && (
                  <>
                    <motion.div
                      className="absolute top-4 right-6 w-2 h-2 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-4 w-2 h-2 rounded-full bg-amber-500"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </div>
              <Target className="absolute bottom-4 right-4 w-6 h-6 text-orange-400/30" />
            </div>
          </>
        );

      case "globe": // ASM
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Globe with scan lines */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-blue-400/40"
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {/* Globe lines */}
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-400/30" style={{ transform: "rotateX(60deg)" }} />
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-400/30" style={{ transform: "rotateX(-60deg)" }} />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400/30" />
              </motion.div>
              {/* Scanning beam */}
              {isHovered && (
                <motion.div
                  className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-blue-400 to-transparent"
                  animate={{ x: [-50, 50, -50] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
              {/* Alert nodes */}
              {[
                { top: "20%", left: "30%" },
                { top: "60%", left: "70%" },
                { top: "75%", left: "25%" },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-blue-500/60"
                  style={pos}
                  animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
              <Search className="absolute bottom-4 right-4 w-6 h-6 text-blue-400/30" />
            </div>
          </>
        );

      case "mail": // Phishing
        return (
          <>
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
              {/* Email with hook */}
              <motion.div
                className="relative"
                animate={{ y: isHovered ? [0, -5, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-16 h-16 text-pink-400/60" />
                {/* Warning badge */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center"
                  animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertTriangle className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              {/* Phishing hook line */}
              {isHovered && (
                <motion.div
                  className="absolute top-8 left-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg width="40" height="60" className="-translate-x-1/2">
                    <motion.path
                      d="M20,0 Q20,30 10,50 Q5,60 15,55"
                      stroke="rgba(244,114,182,0.6)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </>
        );

      case "cloud": // Azure Blast Radius
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Cloud with connections */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: isHovered ? [0, -3, 0] : 0 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cloud className="w-20 h-20 text-sky-400/60" />
              </motion.div>
              {/* Attack path lines */}
              <svg className="absolute inset-0 w-full h-full">
                {isHovered && (
                  <>
                    <motion.line
                      x1="50%" y1="60%" x2="25%" y2="85%"
                      stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                    <motion.line
                      x1="50%" y1="60%" x2="75%" y2="85%"
                      stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </>
                )}
              </svg>
              {/* Server nodes */}
              {[
                { left: "20%", bottom: "10%" },
                { left: "70%", bottom: "10%" },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded bg-sky-500/30 flex items-center justify-center"
                  style={pos}
                  animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                >
                  <Server className="w-4 h-4 text-sky-300" />
                </motion.div>
              ))}
            </div>
          </>
        );

      case "eye": // Dark Web
        return (
          <>
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-zinc-900/50 to-transparent">
              {/* Scanning eye */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-16 h-16 text-zinc-400/60" />
                {/* Scan line through eye */}
                {isHovered && (
                  <motion.div
                    className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/60"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              {/* Data streams */}
              {isHovered && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-zinc-500/40 text-xs font-mono"
                  style={{ left: `${10 + i * 15}%`, top: "-10%" }}
                  animate={{ y: ["0%", "120%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {Math.random().toString(16).slice(2, 6)}
                </motion.div>
              ))}
              <Lock className="absolute bottom-4 right-4 w-6 h-6 text-zinc-500/30" />
            </div>
          </>
        );

      case "folder": // Case Management
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Folder stack */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: i * -4, left: i * -4 }}
                    animate={{ y: isHovered ? [0, -2, 0] : 0 }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <FolderOpen className={cn(
                      "w-14 h-14",
                      i === 0 ? "text-amber-400/70" : i === 1 ? "text-amber-400/50" : "text-amber-400/30"
                    )} />
                  </motion.div>
                ))}
              </div>
              {/* Status indicators */}
              {isHovered && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {["bg-green-500", "bg-amber-500", "bg-red-500"].map((color, i) => (
                    <motion.div
                      key={i}
                      className={cn("w-2 h-2 rounded-full", color)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              )}
              <FileSearch className="absolute top-4 right-4 w-6 h-6 text-amber-400/30" />
            </div>
          </>
        );

      case "graduation": // Training
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: isHovered ? [0, -5, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-16 h-16 text-indigo-400/60" />
              </motion.div>
              {/* Progress bar */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "98%" : "70%" }}
                  transition={{ duration: 1 }}
                />
              </div>
              {/* Achievement stars */}
              {isHovered && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: "25%", left: `${30 + i * 20}%` }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </div>
          </>
        );

      case "bot": // Real Estate Lead Bot
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Central bot */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  y: isHovered ? [0, -8, 0] : 0,
                  rotate: isHovered ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-16 h-16 text-teal-400/70" />
              </motion.div>
              {/* House icons representing real estate */}
              {[
                { top: "20%", left: "20%" },
                { top: "25%", right: "20%" },
                { bottom: "25%", left: "25%" },
                { bottom: "20%", right: "25%" },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={pos}
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    opacity: isHovered ? [0.5, 1, 0.5] : 0.5
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Home className="w-5 h-5 text-teal-300/60" />
                </motion.div>
              ))}
              {/* Connection lines */}
              {isHovered && (
                <svg className="absolute inset-0 w-full h-full">
                  <motion.line x1="50%" y1="50%" x2="25%" y2="25%" stroke="rgba(20,184,166,0.4)" strokeWidth="1" strokeDasharray="4,4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  <motion.line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(20,184,166,0.4)" strokeWidth="1" strokeDasharray="4,4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                  <motion.line x1="50%" y1="50%" x2="30%" y2="75%" stroke="rgba(20,184,166,0.4)" strokeWidth="1" strokeDasharray="4,4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
                  <motion.line x1="50%" y1="50%" x2="70%" y2="75%" stroke="rgba(20,184,166,0.4)" strokeWidth="1" strokeDasharray="4,4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                </svg>
              )}
              {/* Message bubbles */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute top-8 right-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <MessageSquare className="w-5 h-5 text-teal-300" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-12 left-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Phone className="w-4 h-4 text-teal-300" />
                  </motion.div>
                </>
              )}
            </div>
          </>
        );

      case "headset": // Customer Support Agent
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Central headset */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Headset className="w-16 h-16 text-indigo-400/70" />
              </motion.div>
              {/* Chat bubbles floating around */}
              {isHovered && [...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + i * 22}%`,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="bg-indigo-500/30 rounded-lg p-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-300" />
                  </div>
                </motion.div>
              ))}
              {/* Pulse rings */}
              {isHovered && [...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-400/30"
                  initial={{ width: 60, height: 60, opacity: 0.6 }}
                  animate={{ width: 140, height: 140, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}
                />
              ))}
              {/* 24/7 badge */}
              <motion.div
                className="absolute bottom-4 right-4 bg-indigo-500/30 rounded-full px-2 py-1"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              >
                <span className="text-xs font-bold text-indigo-300">24/7</span>
              </motion.div>
            </div>
          </>
        );

      case "filetext": // Document Processing
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              {/* Stacked documents */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: i * -6, left: i * 6 }}
                    animate={{
                      y: isHovered ? [0, -3, 0] : 0,
                      rotate: isHovered ? [0, 2, 0] : 0
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <FileText className={cn(
                      "w-12 h-12",
                      i === 0 ? "text-amber-400/80" : i === 1 ? "text-amber-400/50" : "text-amber-400/30"
                    )} />
                  </motion.div>
                ))}
              </div>
              {/* Scanning effect */}
              {isHovered && (
                <motion.div
                  className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  animate={{ y: [0, 80, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Data extraction visualization */}
              {isHovered && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute right-6 bg-amber-500/20 rounded px-1"
                  style={{ top: `${35 + i * 15}%` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <div className="flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-amber-300" />
                    <span className="text-[10px] text-amber-300 font-mono">DATA</span>
                  </div>
                </motion.div>
              ))}
              <Scan className="absolute bottom-4 left-4 w-5 h-5 text-amber-400/40" />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "relative w-full h-48 rounded-t-2xl overflow-hidden",
      `bg-gradient-to-br ${project.gradient}`
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }} />
      </div>

      {/* Animated visual elements */}
      {renderVisualElements()}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Category badge */}
      <motion.div
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white"
        whileHover={{ scale: 1.05 }}
      >
        {project.category}
      </motion.div>

      {/* Metrics badge */}
      {project.metrics && (
        <motion.div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/30 backdrop-blur-sm text-white flex items-center gap-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        >
          <TrendingUp className="w-3 h-3" />
          {project.metrics}
        </motion.div>
      )}
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-24 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Production-Ready Solutions
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore 13+ enterprise-grade cybersecurity platforms, AI agents, and
            mission-critical applications that protect and accelerate global organizations
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/10"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs opacity-60">
                  ({projects.filter(p => p.category === category).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className="h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    boxShadow: hoveredProject === project.id
                      ? `0 20px 40px -20px ${project.accentColor}40`
                      : "none"
                  }}
                >
                  {/* Visual section */}
                  <ProjectVisual
                    project={project}
                    isHovered={hoveredProject === project.id}
                  />

                  {/* Content section */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-blue transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {project.timeline}
                      </div>
                      <motion.div
                        className="flex items-center gap-1 text-cyber-blue text-sm font-medium"
                        animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "13+", label: "Projects Delivered", icon: FolderOpen },
            { value: "80%", label: "Workload Reduction", icon: TrendingUp },
            { value: "10M+", label: "Events Processed/Day", icon: Activity },
            { value: "24/7", label: "Monitoring Coverage", icon: Eye },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Project Modal Component
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const Icon = iconMap[project.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className={cn(
          "relative h-48 rounded-t-3xl overflow-hidden",
          `bg-gradient-to-br ${project.gradient}`
        )}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Icon className="w-24 h-24 text-white/80" />
            </motion.div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Category & metrics */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
              {project.category}
            </span>
            {project.metrics && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-black/30 backdrop-blur-sm text-white flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {project.metrics}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Title & description */}
          <div>
            <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyber-blue" />
              <span className="text-muted-foreground">Timeline:</span>
              <span className="font-semibold">{project.timeline}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold capitalize text-emerald-500">{project.status}</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyber-blue" />
              Key Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                >
                  <CheckCircle className="w-5 h-5 text-cyber-blue mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-cyber-purple" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-cyber-blue/50 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;
