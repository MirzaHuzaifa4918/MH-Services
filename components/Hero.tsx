
import React from 'react';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 bg-opacity-60 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://picsum.photos/1920/1080?grayscale&blur=2)` }}
      ></div>
      <div className="relative z-20 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4">
          <span className="block">Creative Developer</span>
          <span className="block text-sky-400">Video Editor & Designer</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
          I build beautiful, functional websites and create compelling visual content that brings ideas to life.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="inline-block bg-sky-500 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
