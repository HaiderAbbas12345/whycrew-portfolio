export interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  images: string[]
  features: string[]
  client?: string
  timeline: string
  status: 'completed' | 'in-progress' | 'planning'
}

export const projects: Project[] = [
  {
    id: 'case-management-system',
    title: 'Cybersecurity Case Management System',
    description: 'Enterprise-grade case management platform for cybersecurity operations, featuring real-time threat analysis, automated workflows, and comprehensive reporting capabilities.',
    category: 'Cybersecurity',
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Redis', 'Docker'],
    images: [
      '/images/case management system/Modern_cybersecurity_case_management_system_web_ap-1757414068846.png',
      '/images/case management system/Cybersecurity_alerts_management_interface_screensh-1757414077496.png',
      '/images/case management system/Cybersecurity_case_management_detailed_view_interf-1757414081692.png'
    ],
    features: [
      'Real-time threat detection and analysis',
      'Automated case prioritization and routing',
      'Advanced analytics and reporting dashboard',
      'Integration with SIEM and threat intelligence feeds',
      'Role-based access control and audit trails',
      'Mobile-responsive design for field operations'
    ],
    client: 'Global Financial Institution',
    timeline: '6 months',
    status: 'completed'
  }
]

export const categories = [
  'All',
  'Cybersecurity'
]

export const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 
  'C#', '.NET', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL',
  'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'
]