import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate cursor update
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth trailing animation loop
    let animationFrameId: number;

    const animateTrailing = () => {
      setTrailingPosition(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;

        // Linear interpolation for smooth trailing (0.1 = speed)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      animationFrameId = requestAnimationFrame(animateTrailing);
    };

    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]); // Re-run if position changes significantly (though RAF handles the loop)

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Trailing glow */}
      <div
        className="fixed w-8 h-8 rounded-full bg-primary/30 blur-sm pointer-events-none z-[9998] hidden md:block"
        style={{
          left: trailingPosition.x - 16,
          top: trailingPosition.y - 16,
          opacity: isVisible ? 0.6 : 0,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
