
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 text-center">{children}</h2>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>About Me</SectionTitle>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <img 
              className="h-64 w-64 rounded-full object-cover ring-4 ring-slate-700 shadow-lg" 
              src="https://picsum.photos/seed/portfolio-dev/400/400" 
              alt="Portrait of the freelancer" 
            />
          </div>
          <div className="md:col-span-2 text-lg text-slate-300 space-y-4">
            <p>
              Hello! I'm a passionate and versatile creative professional with a strong background in web development, video editing, logo design, and MS Office automation. My journey began with a fascination for technology and design, which evolved into a career dedicated to crafting high-quality digital experiences.
            </p>
            <p>
              As a developer, I specialize in building responsive, user-friendly websites with modern technologies. As a designer and editor, I focus on creating visually stunning content that tells a story and captures attention. My goal is to combine these skills to provide comprehensive solutions for my clients, helping them achieve their business objectives and stand out in the digital landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
