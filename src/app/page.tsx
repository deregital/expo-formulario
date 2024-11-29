'use client';

import Information from '@/components/Information';
import InscripcionBox from '@/components/InscripcionBox';
import React from 'react';
import 'react-phone-number-input/style.css';
import './globals.css';

const Home: React.FC = () => {
  return (
    <div className="mx-auto max-w-[800px]">
      <Information />
      <InscripcionBox />
    </div>
  );
};

export default Home;
