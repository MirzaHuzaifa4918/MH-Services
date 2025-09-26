
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          {/* Add social links here if needed */}
        </div>
        <p className="mt-8 text-center text-base text-slate-400">
          &copy; {new Date().getFullYear()} MH Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;