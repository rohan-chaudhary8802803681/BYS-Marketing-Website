import ScrollReveal from '../components/ScrollReveal';
import StarBorder from '../components/ReactBits/StarBorder';
import { useState } from 'react';
import LazySection from '../components/LazySection';
import Magnet from '../components/ReactBits/Magnet';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Code2, Palette, Megaphone, BarChart3, Camera,
    Shield, Linkedin, Twitter, Globe, Users,
    Sparkles, ChevronRight, MonitorSmartphone, PenTool, Search,
    Boxes, Cpu, Database, Layers, Workflow
} from 'lucide-react';

/* ─── TEAM DATA ─── */

interface TeamMember {
    name: string;
    role: string;
    dept: string;
    img: string;
    bio: string;
    skills: string[];
    social?: { linkedin?: string; twitter?: string; instagram?: string };
}

const departments = [
    { id: 'all', label: 'Everyone', icon: Users, color: 'text-primary' },
    { id: 'engineering', label: 'Engineering', icon: Code2, color: 'text-blue-500' },
    { id: 'design', label: 'Design', icon: Palette, color: 'text-pink-500' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, color: 'text-green-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-orange-500' },
    { id: 'media', label: 'Media', icon: Camera, color: 'text-red-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'text-yellow-500' },
];

const teamMembers: TeamMember[] = [
    {
        name: 'Rohan Kumar Chaudhary',
        role: 'Founder & CEO',
        dept: 'marketing',
        img: 'https://bys.marketing/wp-content/uploads/2025/11/my-image-e1763896540734.jpeg',
        bio: '8 Years of Active Experience. Inspired by visual storytelling, tech advancements, AI, and the psychology of human buying interests.',
        skills: ['Growth Strategy', 'Brand Architecture', 'Leadership']
    },
    {
        name: 'Rupesh Jha',
        role: 'Senior Dev.',
        dept: 'engineering',
        img: 'https://bys.marketing/wp-content/uploads/2025/09/about-img-300x300.jpg',
        bio: 'Driven by the belief that great design & tech advancements are about creating meaningful connections between brands and their audiences.',
        skills: ['Engineering', 'Web Perf', 'Architecture']
    },
    {
        name: 'Abhishek Singh',
        role: 'Junior Dev & Automations',
        dept: 'engineering',
        img: 'https://bys.marketing/wp-content/uploads/2025/09/abhishek-300x300.jpeg',
        bio: 'We embrace new technologies, stay ahead of industry trends, and expand our skill sets to remain ready for industry disruption.',
        skills: ['Automations', 'Full Stack', 'AI']
    },
    {
        name: 'Jenny Wilson',
        role: 'Global Client Manager',
        dept: 'marketing',
        img: 'https://bys.marketing/wp-content/uploads/2025/09/Docker-team-3-300x300.webp',
        bio: 'Overseeing business operations from outside India, handling and managing success for our US and UK based clients with total transparency.',
        skills: ['US/UK Markets', 'Client Success', 'Global Strategy']
    },
    {
        name: 'Joining Soon',
        role: 'Lead UI/UX Designer',
        dept: 'design',
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
        bio: 'We are expanding our design team to create world-class digital experiences. This seat is reserved for a visionary designer.',
        skills: ['Figma', 'Prototyping', 'Visual Design']
    },
    {
        name: 'Joining Soon',
        role: 'Creative Director',
        dept: 'media',
        img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
        bio: 'Seeking a creative powerhouse to lead our media and content production efforts on a global scale.',
        skills: ['Video', 'Storytelling', 'Creative Direction']
    },
    {
        name: 'Joining Soon',
        role: 'Performance Marketer',
        dept: 'marketing',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
        bio: 'Expanding our growth team. Looking for a data-driven marketer to scale global campaigns.',
        skills: ['Ads', 'ROAS', 'Scaling']
    },
    {
        name: 'Joining Soon',
        role: 'Security Architect',
        dept: 'security',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
        bio: 'Protecting our clients infrastructure with military-grade protocols. Join our elite security squad.',
        skills: ['Pen Testing', 'Cloud Security', 'Compliance']
    }
];

const cultureValues = [
    { icon: Sparkles, title: 'No Egos, Just Excellence', desc: 'The best idea wins — whether it comes from the CEO or a summer intern.' },
    { icon: Workflow, title: 'Async-First', desc: 'We work across time zones. Deep focus > constant meetings.' },
    { icon: Layers, title: 'Own Your Craft', desc: 'Everyone is a specialist. Everyone ships. No hand-holding required.' },
    { icon: Database, title: 'Data Over Opinions', desc: 'We test, measure, and iterate. Gut feel is a hypothesis, never a strategy.' },
    { icon: Cpu, title: 'Always Learning', desc: 'Weekly tech talks, annual learning budgets, and a culture of curiosity.' },
    { icon: Boxes, title: 'Build in the Open', desc: 'Internal transparency. Everyone sees the P&L, the roadmap, and the highs and lows.' },
];

const deptStats = [
    { label: 'Engineers', count: '4', icon: Code2 },
    { label: 'Designers', count: '3', icon: Palette },
    { label: 'Marketers', count: '3', icon: Megaphone },
    { label: 'Analysts', count: '2', icon: BarChart3 },
    { label: 'Creatives', count: '2', icon: Camera },
    { label: 'Security', count: '1', icon: Shield },
];

const openPositions = [
    { title: 'Senior React Engineer', dept: 'Engineering', type: 'Remote', icon: MonitorSmartphone },
    { title: 'Product Designer', dept: 'Design', type: 'Hybrid (New Delhi)', icon: PenTool },
    { title: 'SEO Strategist', dept: 'Marketing', type: 'Remote', icon: Search },
    { title: 'Performance Marketing Manager', dept: 'Marketing', type: 'Remote', icon: BarChart3 },
];

/* ─── COMPONENT ─── */

export default function Team() {
    const [activeDept, setActiveDept] = useState('all');

    const filteredMembers = activeDept === 'all'
        ? teamMembers
        : teamMembers.filter(m => m.dept === activeDept);

    return (
        <main className="flex flex-col gap-0 pb-32 w-full overflow-hidden">

            {/* ═══ 1. HERO ═══ */}
            <section className="relative min-h-[65vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 dark:bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-pink-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto">
                    <ScrollReveal direction="down" delay={0.05}>
                        <StarBorder as="div" color="#6836f4" speed="4s" className="inline-block mb-8">
                            <span className="text-sm font-bold tracking-widest uppercase opacity-90">15 Specialists · 6 Departments · 1 Mission</span>
                        </StarBorder>
                    </ScrollReveal>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.92] tracking-tighter text-text-main dark:text-white mb-8">
                        The people<br />
                        behind the<br />
                        <span className="text-primary dark:text-primary-light">magic.</span>
                    </h1>

                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-text-sub dark:text-white/60 leading-relaxed max-w-3xl mx-auto font-medium">
                            We're not a factory. We're a hand-picked team of obsessives — engineers, designers, marketers, analysts, and storytellers — who genuinely care about making your brand win.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══ 2. DEPARTMENT SNAPSHOT ═══ */}
            <LazySection fallbackHeight="160px">
                <section className="px-6 pb-16 max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {deptStats.map((d, i) => (
                            <ScrollReveal key={i} delay={i * 0.06}>
                                <div className="glass-panel rounded-2xl p-5 flex flex-col items-center text-center border border-white/60 dark:border-white/10 hover:-translate-y-1 transition-all group">
                                    <d.icon size={20} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-2xl font-black text-text-main dark:text-white">{d.count}</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-sub dark:text-white/40 mt-1">{d.label}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </LazySection>

            {/* ═══ 3. DEPARTMENT FILTER + TEAM GRID ═══ */}
            <LazySection fallbackHeight="800px">
                <section className="px-6 py-20 bg-white dark:bg-[#0b0b0b] transition-colors">
                    <div className="max-w-7xl mx-auto">
                        <ScrollReveal>
                            <div className="text-center mb-10">
                                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">Our Departments</span>
                                <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">
                                    Explore the<br /><span className="text-primary">Team</span>
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* Filter pills */}
                        <ScrollReveal delay={0.1}>
                            <div className="flex flex-wrap justify-center gap-2 mb-14">
                                {departments.map((dept) => (
                                    <button
                                        key={dept.id}
                                        onClick={() => setActiveDept(dept.id)}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                                            ${activeDept === dept.id
                                                ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(104,54,244,0.3)]'
                                                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-text-sub dark:text-white/60 hover:border-primary/40 hover:text-primary'
                                            }
                                        `}
                                    >
                                        <dept.icon size={14} />
                                        {dept.label}
                                    </button>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Team Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredMembers.map((member, i) => (
                                <div
                                    key={member.name}
                                    className="glass-panel rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 group hover:shadow-floating hover:-translate-y-2 transition-all duration-300"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {/* Photo */}
                                    <div className="relative flex flex-col items-center pt-8 pb-4">
                                        <div className="w-40 h-40 relative group-hover:scale-105 transition-transform duration-500">
                                            {/* Creative Organic Shape Backdrop */}
                                            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 rounded-[2.5rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />

                                            {/* Masked Image Container */}
                                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white dark:border-[#1a1a1a] shadow-lg">
                                                <img
                                                    src={member.img}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top filter group-hover:brightness-110 transition-all"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                            </div>
                                        </div>
                                        {/* Dept tag */}
                                        <span className="mt-4 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20">
                                            {member.dept}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight">{member.name}</h3>
                                        <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{member.role}</p>
                                        <p className="text-sm text-text-sub dark:text-white/55 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {member.skills.map((skill, si) => (
                                                <span key={si} className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/15 text-primary">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Socials */}
                                        <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                                            <a href="#" aria-label={`${member.name}'s LinkedIn profile`} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-text-sub dark:text-white/40">
                                                <Linkedin size={12} />
                                            </a>
                                            <a href="#" aria-label={`${member.name}'s Twitter profile`} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-text-sub dark:text-white/40">
                                                <Twitter size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </LazySection>

            {/* ═══ 4. CULTURE & VALUES ═══ */}
            <LazySection fallbackHeight="600px">
                <section className="px-6 py-24 max-w-7xl mx-auto w-full">
                    <ScrollReveal>
                        <div className="text-center mb-14">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">How We Work</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">
                                Our Operating<br /><span className="text-primary">System</span>
                            </h2>
                            <p className="text-text-sub dark:text-white/50 mt-4 max-w-xl mx-auto">
                                Culture isn't a ping-pong table. It's the principles that guide our decisions when no one's watching.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {cultureValues.map((val, i) => (
                            <ScrollReveal key={i} delay={i * 0.07}>
                                <Magnet>
                                    <div className="glass-panel rounded-3xl p-8 border border-white/60 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col cursor-pointer">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                            <val.icon size={26} className="text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">{val.title}</h3>
                                        <p className="text-sm text-text-sub dark:text-white/60 leading-relaxed flex-1">{val.desc}</p>
                                    </div>
                                </Magnet>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </LazySection>

            {/* ═══ 5. BIG QUOTE ═══ */}
            <section className="py-20 px-6 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <p className="text-2xl md:text-4xl font-bold leading-relaxed italic mb-8">
                            "We hire for hunger, not just skill. The best teams are built with people who care about the mission more than the title."
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-0.5 bg-white/40" />
                            <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Arjun Sharma, CEO</span>
                            <div className="w-10 h-0.5 bg-white/40" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══ 6. GLOBAL PRESENCE ═══ */}
            <LazySection fallbackHeight="350px">
                <section className="px-6 py-24 max-w-7xl mx-auto w-full">
                    <ScrollReveal>
                        <div className="text-center mb-14">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">Where We Work</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">
                                Remote-First,<br /><span className="text-primary">Globally Connected</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { city: 'New Delhi', country: 'India', role: 'HQ & Engineering Hub', tz: 'IST  (UTC+5:30)' },
                            { city: 'Dubai', country: 'UAE', role: 'Media & Client Relations', tz: 'GST  (UTC+4)' },
                            { city: 'Remote', country: 'Worldwide', role: 'Distributed Team Members', tz: 'All Time Zones' },
                        ].map((loc, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="glass-panel rounded-3xl p-8 border border-white/60 dark:border-white/10 hover:-translate-y-1 transition-all text-center group">
                                    <Globe size={28} className="text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                                    <h3 className="text-2xl font-black text-text-main dark:text-white">{loc.city}</h3>
                                    <p className="text-text-sub dark:text-white/50 text-sm font-bold mb-2">{loc.country}</p>
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{loc.role}</p>
                                    <p className="text-text-sub dark:text-white/40 text-xs mt-2">{loc.tz}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </LazySection>

            {/* ═══ 7. OPEN POSITIONS / JOIN US ═══ */}
            <section className="px-6 py-24 bg-gray-50/50 dark:bg-white/[0.02] transition-colors">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-14">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">We're Hiring</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">
                                Ready to<br /><span className="text-primary">Join the Squad?</span>
                            </h2>
                            <p className="text-text-sub dark:text-white/50 mt-4 max-w-xl mx-auto">
                                We're always looking for crazy-talented people who want to do the best work of their careers.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {openPositions.map((pos, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <a
                                    href="#"
                                    aria-label={`View details and apply for ${pos.title} position`}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-primary/30 hover:shadow-floating hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <pos.icon size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{pos.title}</h3>
                                            <p className="text-xs text-text-sub dark:text-white/50">
                                                <span className="font-bold">{pos.dept}</span> · {pos.type}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-text-sub dark:text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </a>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 8. FINAL CTA ═══ */}
            <section className="px-6 py-16 max-w-7xl mx-auto w-full">
                <ScrollReveal>
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-black border border-white/10 p-12 md:p-20 text-center">
                        <div className="absolute right-0 top-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
                        <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-[80px]" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                Don't see your role?<br /><span className="text-primary-light">Convince us.</span>
                            </h2>
                            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                                If you're exceptional at what you do and our mission excites you, we want to hear from you. Drop us a line.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <StarBorder as={Link} to="/contact" color="#6836f4" speed="3s">
                                    <span className="flex items-center gap-2 font-bold text-base">
                                        Send Us Your Portfolio <ArrowRight size={18} />
                                    </span>
                                </StarBorder>
                                <Link
                                    to="/about"
                                    className="px-8 py-4 rounded-[20px] border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
                                >
                                    Learn About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </main>
    );
}
