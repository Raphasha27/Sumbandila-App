import React from 'react';

export const SumbandilaLogo = ({ size = 48, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="url(#logo_grad)" />
    <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 30L65 37.5V62.5L50 70L35 62.5V37.5L50 30Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2" />
    <circle cx="50" cy="50" r="8" fill="white" />
    <defs>
      <linearGradient id="logo_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);
