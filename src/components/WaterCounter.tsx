import React from 'react';
import { GlassWater } from 'lucide-react';

interface WaterCounterProps {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

const WaterCounter = ({ count }: WaterCounterProps) => {
  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <GlassWater className="w-24 h-24 text-blue-300" />
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-500 rounded-b-lg"
        style={{ 
          height: `${Math.min(100, (count / 8) * 100)}%`,
          opacity: 0.3 
        }}
      />
    </div>
  );
};

export default WaterCounter;