import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-200 cursor-pointer' : '';
  
  const Component = hover || onClick ? motion.div : 'div';
  const props = hover || onClick ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
};

