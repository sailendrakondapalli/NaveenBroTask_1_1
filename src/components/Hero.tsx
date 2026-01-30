import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            PowerStackHub
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Ready-made components for Power Apps, Power BI, and Power Automate.
            Copy code or download instantly after Google sign-in.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;