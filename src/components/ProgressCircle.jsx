import React from 'react';

const ProgressCircle = ({ progress }) => {
   return (
      <div className="relative w-10 h-10 border-4 border-gray-800 overflow-hidden rounded-full shadow-custom-loader">
         <div className="absolute top-6 left-6 right-6 bottom-6 bg-gray-800 rounded-full border-2 border-gray-700 shadow-inner-loader">
         </div>
         <span className={`absolute w-full h-full rounded-full bg-gradient-to-b from-blue-500 to-blue-300 filter blur-5 ${progress > 0 ? 'animate-loader-fill' : ''}`} style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}>
         </span>
         <div className="absolute z-50 text-white text-sm font-bold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {progress.toFixed(0)}%
         </div>
      </div>
   )
}

export default ProgressCircle;
