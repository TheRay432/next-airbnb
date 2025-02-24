import React from 'react';

interface RDotNavgationProps {
  selectedIndex: number;
  length: number;
}
const RDotNavgation = ({ selectedIndex, length }: RDotNavgationProps) => {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            selectedIndex === index ? 'bg-white' : 'bg-gray-500'
          }`}
        />
      ))}
    </div>
  );
};

export default RDotNavgation;
