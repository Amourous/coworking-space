import { memo } from 'react';

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background transition-colors duration-500">
      {/* Animated Orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-blob" 
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-accent/20 blur-[100px] animate-blob" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] rounded-full bg-primary/10 blur-[150px] animate-blob" 
        style={{ animationDelay: '4s' }} 
      />
    </div>
  );
});

export default AnimatedBackground;
