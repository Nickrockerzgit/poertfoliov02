import {
  Code2,
  Layout,
  Server,
  Database,
  Palette,
  Smartphone,
  Cloud,
  GitBranch,
} from 'lucide-react';
import type { TechKey } from '@/data/techIcons';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Voices', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Nickrockerzgit', icon: 'Github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishabh-jhade-', icon: 'Linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/its._nikku_001?igsh=MWYzN3VsOGxpOWd2cQ==', icon: 'Instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
];

export const STATS = [
  { value: 5, suffix: '+', label: 'Projects Delivered', sub: 'Across 2 continents' },
  { value: 1, suffix: ' yrs', label: 'Industry Relevent Experience', sub: 'Since 2025' },
  { value: 5, suffix: '+', label: 'Happy Clients', sub: 'Startups to enterprise' },
  { value: 99, suffix: '%', label: 'Client Retention', sub: 'Long-term partnerships' },
];

export type SkillItem = { name: string; level: number; tech?: TechKey };

export type SkillCategory = {
  title: string;
  icon: typeof Code2;
  blurb: string;
  tech: TechKey[];
  skills: SkillItem[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    icon: Code2,
    blurb: 'Pixel-perfect, accessible, blazing-fast interfaces.',
    tech: ['React', 'Nextjs', 'TypeScript', 'Tailwind', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Bootstrap'],
    skills: [
      { name: 'React / Next.js', level: 96, tech: 'React' },
      { name: 'TypeScript', level: 94, tech: 'TypeScript' },
      { name: 'Tailwind CSS', level: 98, tech: 'Tailwind' },
      { name: 'GSAP / Framer Motion', level: 90, tech: 'GSAP' },
    ],
  },
  {
    title: 'Backend & Systems',
    icon: Server,
    blurb: 'Scalable APIs and resilient data layers.',
    tech: ['Node', 'Express', 'PostgreSQL', 'Supabase', 'Redis', 'GraphQL', 'Prisma', 'Bun', 'MongoDB'],
    skills: [
      { name: 'Node.js / Bun', level: 92, tech: 'Node' },
      { name: 'PostgreSQL / Supabase', level: 90, tech: 'PostgreSQL' },
      { name: 'Redis / Queues', level: 84, tech: 'Redis' },
      { name: 'GraphQL / tRPC', level: 86, tech: 'GraphQL' },
    ],
  },
  {
    title: 'Design & Product',
    icon: Palette,
    blurb: 'Turning ideas into thoughtful, human experiences.',
    tech: ['Figma', 'Stripe', 'Threejs', 'Sanity', 'Vercel', 'Clerk'],
    skills: [
      { name: 'UI/UX Systems', level: 91, tech: 'Figma' },
      { name: 'Figma / Prototyping', level: 89, tech: 'Figma' },
      { name: 'Motion Design', level: 87, tech: 'GSAP' },
      { name: 'Brand Identity', level: 82, tech: 'Figma' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    blurb: 'Ship confidently with automated pipelines.',
    tech: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Cloudflare', 'GitHub', 'Vercel'],
    skills: [
      { name: 'AWS / Cloudflare', level: 85, tech: 'AWS' },
      { name: 'Docker / K8s', level: 80, tech: 'Docker' },
      { name: 'CI/CD Pipelines', level: 88, tech: 'GitHub' },
      { name: 'Edge Functions', level: 90, tech: 'Cloudflare' },
    ],
  },
  {
    title: 'Mobile & Cross-Platform',
    icon: Smartphone,
    blurb: 'Native-feeling apps from a single codebase.',
    tech: ['ReactNative', 'Expo', 'TypeScript', 'Clerk', 'Supabase'],
    skills: [
      { name: 'React Native', level: 88, tech: 'ReactNative' },
      { name: 'Expo / EAS', level: 85, tech: 'Expo' },
      { name: 'PWA Optimization', level: 91, tech: 'Vite' },
      { name: 'Offline-First', level: 83, tech: 'Supabase' },
    ],
  },
  {
    title: 'Craft & Collaboration',
    icon: GitBranch,
    blurb: 'Shipping is a team sport — communicate clearly.',
    tech: ['Git', 'GitHub', 'Jest', 'Python', 'Prisma'],
    skills: [
      { name: 'Git / Trunk-Based', level: 93, tech: 'Git' },
      { name: 'Code Review', level: 90, tech: 'GitHub' },
      { name: 'Testing / Jest', level: 87, tech: 'Jest' },
      { name: 'Mentoring', level: 89, tech: 'GitHub' },
    ],
  },
];

export const PROJECTS = [
  {
    id: 'p1',
    name: 'Technoverse Club Website',
    category: 'AI Powered Web Platform',
    year: '2026',
    blurb:
      'Official coding club platform featuring AI resume builder, interview preparation, event management, blogs, and an admin dashboard.',
    tags: ['React', 'Node.js', 'MySQL', 'Gemini AI'],
    image: '/technoverse.png',
    metric: '250+ Students',
    url: 'https://codingmaniav001.vercel.app/',
  },

  {
    id: 'p2',
    name: 'BoonFarma',
    category: 'Agriculture Platform',
    year: '2026',
    blurb:
      'Smart agriculture platform enabling crop selling, weather updates, fertilizer registration, and AI-powered crop disease detection.',
    tags: ['React', 'Node.js', 'MySQL', 'AI'],
    image: '/boonfarma.jpeg',
    metric: 'AI Powered',
    url: '/boonfarma.jpeg',
  },

  {
    id: 'p3',
    name: 'BDS ERP',
    category: 'ERP & Store Management',
    year: '2026',
    blurb:
      'Complete ERP solution for inventory, billing, sales, purchase, customer management, and store operations for a Congo-based business.',
    tags: ['React', 'Node.js', 'MySQL', 'Socket.io'],
    image: '/bdserp.png',
    metric: 'Congo Client',
    url: 'https://www.bdslubumbashi.com/',
  },

  {
    id: 'p4',
    name: 'Timofx',
    category: 'Blockchain Platform',
    year: '2026',
    blurb:
      'Blockchain investment platform supporting USDT deposits, withdrawals, referrals, investments, and secure transaction management.',
    tags: ['React', 'Node.js', 'Blockchain', 'USDT'],
    image: '/timo.png',
    metric: 'Germany Client',
    url: 'https://www.timofx.com/',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Rishabh developed a reliable and user-friendly solution for our clinic. He understood our requirements quickly, communicated clearly throughout the project, and delivered quality work on time.',
    name: 'Mukesh Deshmukh',
    role: 'Owner, Deshmukh Clinic',
    avatar: 'https://ui-avatars.com/api/?name=Mukesh+Deshmukh&background=10b981&color=060a14&bold=true',
  },
  {
    id: 't2',
    quote:
      'Rishabh demonstrated strong technical skills and a problem-solving mindset while working on our project. His ability to deliver scalable solutions and collaborate effectively made him a valuable contributor.',
    name: 'Akhilesh Gautam',
    role: 'IT & ERP Head',
    avatar: 'https://ui-avatars.com/api/?name=Akhilesh+Gautam&background=34d399&color=060a14&bold=true',
  },
  {
    id: 't3',
    quote:
      'As President of Technoverse Club, Rishabh showed excellent leadership by managing technical events, mentoring students, and developing our official platform. His dedication and ownership were commendable.',
    name: 'Narendra Dhakad',
    role: 'Club Incharge, Technoverse Club',
    avatar: 'https://ui-avatars.com/api/?name=Narendra+Dhakad&background=fbbf24&color=060a14&bold=true',
  },
  {
    id: 't4',
    quote:
      'Rishabh successfully delivered our store management system with attention to detail and professionalism. He was responsive to feedback, met project expectations, and provided valuable technical suggestions throughout the development process.',
    name: 'Ravi',
    role: 'Owner, BDS Congo',
    avatar: 'https://ui-avatars.com/api/?name=Ravi&background=0ea5e9&color=ffffff&bold=true',
  },
];
export const SERVICES = [
  {
    icon: Layout,
    title: 'Web & Product Engineering',
    desc: 'End-to-end product builds — from design system to deployment, optimized for speed and scale.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Cross-platform apps with native-grade performance, offline support, and buttery motion.',
  },
  {
    icon: Database,
    title: 'Backend & Data Architecture',
    desc: 'PostgreSQL, real-time APIs, edge functions, and the infrastructure to grow on.',
  },
  {
    icon: Palette,
    title: 'Design & Motion',
    desc: 'Interaction design, prototyping, and scroll-driven storytelling that converts.',
  },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We align on goals, users, and constraints. No code until the problem is sharp.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Prototypes and a design system you can touch — validated before a line of production code.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Shipped in tight loops with daily previews. You see progress, not promises.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    desc: 'Performance audits, monitoring, and iteration. The launch is the starting line, not the finish.',
  },
];

export const FAQS = [
  {
    q: 'What does a typical engagement look like?',
    a: 'Most projects run 6–12 weeks. We start with a paid discovery sprint to de-risk scope, then move into two-week delivery loops with live previews and a shared Linear board.',
  },
  {
    q: 'Do you work with existing teams?',
    a: 'Yes. I plug into your codebase, follow your conventions, and review as a senior peer. I have shipped inside teams of 2 and teams of 40.',
  },
  {
    q: 'Can you handle both design and engineering?',
    a: 'For product work, yes — I can own the full loop from Figma to deployment. For brand-heavy work I partner with specialists I trust.',
  },
  {
    q: 'What is your timezone availability?',
    a: 'Based in IST (UTC+5:30) with 4+ hours of overlap with EU mornings and US evenings. Async-first, but always reachable for live reviews.',
  },
];
