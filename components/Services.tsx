
import React from 'react';
import type { Service } from '../types';
import { WebDevIcon, VideoIcon, DesignIcon, OfficeIcon } from './icons';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-slate-800 p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
    <div className="bg-slate-700 p-4 rounded-full mb-6">
      <div className="h-8 w-8 text-sky-400">{service.icon}</div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
    <p className="text-slate-400">{service.description}</p>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 text-center">{children}</h2>
);
  
const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 text-lg leading-8 text-slate-400 text-center max-w-2xl mx-auto">{children}</p>
);

const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Web Development',
      description: 'Crafting responsive, high-performance websites with modern frameworks and a focus on user experience.',
      icon: <WebDevIcon />,
    },
    {
      title: 'Video Editing',
      description: 'Producing engaging video content, from promotional clips to detailed tutorials, with professional editing and effects.',
      icon: <VideoIcon />,
    },
    {
      title: 'Logo Design',
      description: 'Creating unique and memorable logos that capture your brand\'s identity and resonate with your audience.',
      icon: <DesignIcon />,
    },
    {
      title: 'MS Office Solutions',
      description: 'Automating tasks, creating advanced templates, and managing data efficiently with expert-level Office skills.',
      icon: <OfficeIcon />,
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>What I Offer</SectionTitle>
        <SectionSubtitle>
          A versatile skill set to bring your digital projects to life, from code to creative.
        </SectionSubtitle>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
