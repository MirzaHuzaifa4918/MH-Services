
import React, { useState } from 'react';
import type { Project } from '../types';

const projectsData: Project[] = [
  { id: 1, title: 'E-commerce Platform', description: 'A full-featured online store built with React and Node.js.', imageUrl: 'https://picsum.photos/seed/ecomm/500/350', tags: ['React', 'Node.js', 'Stripe'], category: 'Web Development' },
  { id: 2, title: 'Corporate Brand Identity', description: 'Complete logo and branding guide for a tech startup.', imageUrl: 'https://picsum.photos/seed/branding/500/350', tags: ['Illustrator', 'Branding'], category: 'Logo Design' },
  { id: 3, title: 'Product Hunt Launch Video', description: 'An engaging 60-second promo video for a new mobile app.', imageUrl: 'https://picsum.photos/seed/video1/500/350', tags: ['Premiere Pro', 'After Effects'], category: 'Video Editing' },
  { id: 4, title: 'Automated Financial Reports', description: 'Excel dashboard that automates quarterly financial reporting.', imageUrl: 'https://picsum.photos/seed/excel/500/350', tags: ['Excel', 'VBA'], category: 'MS Office' },
  { id: 5, title: 'SaaS Landing Page', description: 'A sleek and modern landing page for a software service.', imageUrl: 'https://picsum.photos/seed/saas/500/350', tags: ['Next.js', 'Tailwind CSS'], category: 'Web Development' },
  { id: 6, title: 'YouTube Channel Intro', description: 'A dynamic intro animation for a popular content creator.', imageUrl: 'https://picsum.photos/seed/intro/500/350', tags: ['After Effects'], category: 'Video Editing' },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-slate-800">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
    </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 text-center">{children}</h2>
);
  
const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 text-lg leading-8 text-slate-400 text-center max-w-2xl mx-auto">{children}</p>
);

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

  const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>My Work</SectionTitle>
        <SectionSubtitle>
          Here's a selection of projects that showcase my skills and creativity.
        </SectionSubtitle>
        
        <div className="flex justify-center flex-wrap gap-2 mt-12 mb-12">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        filter === category ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
