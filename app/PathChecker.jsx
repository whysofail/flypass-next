'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Components/Navbar/Navbar';

const PathChecker = ({ children }) => {
  const path = usePathname();

  const excludedPaths = ['/login', '/register'];
  const isExcluded = excludedPaths.includes(usePathname());

  return (
    <>
      {!isExcluded ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default PathChecker;
