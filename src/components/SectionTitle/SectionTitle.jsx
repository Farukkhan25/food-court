import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
      <div className="mx-auto text-center md:w-5/12 my-8">
        <p className="text-slate-900 font-bold mb-2">--- {subHeading} ---</p>
        <h3 className="md:text-4xl font-Cinzel font-bold uppercase border-y-2 py-4">
          {heading}
        </h3>
      </div>
    );
};

export default SectionTitle;