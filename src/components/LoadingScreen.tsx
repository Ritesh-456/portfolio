import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated Logo Circle */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 w-32 h-32 rounded-full animate-neu-rotate">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
              opacity: 0.3,
            }}
          />
        </div>

        {/* Main neumorphic circle */}
        <div className="relative w-32 h-32 neu-circle animate-neu-pulse">
          <div className="w-24 h-24 neu-circle-inset flex items-center justify-center">
            <span className="text-3xl font-bold text-gradient">RB</span>
          </div>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-2xl font-semibold text-foreground mb-2 animate-fade-in">
        Ritesh Brahmachari
      </h1>
      <p className="text-muted-foreground text-sm mb-8 animate-fade-in delay-200">
        Full Stack Developer & Data Analyst
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-3 neu-card-inset rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
          }}
        />
      </div>

      {/* Progress Text */}
      <p className="mt-4 text-sm text-muted-foreground font-medium">
        {progress}%
      </p>

      {/* Loading dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-float"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
