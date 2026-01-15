import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TypingEffectProps {
    text: string;
    className?: string;
    start?: boolean;
}

const TypingEffect = ({ text, className = "", start = false }: TypingEffectProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useGSAP(() => {
        if (!containerRef.current || !start) return;

        // Split text into spans
        const chars = text.split('').map(char => `<span class="char opacity-0">${char}</span>`).join('');
        containerRef.current.innerHTML = chars;

        const timeline = gsap.timeline();

        // Initialize audio
        audioRef.current = new Audio('/sounds/hero-section-text-typo-sound.mp3');
        audioRef.current.volume = 0.3;

        timeline.to(".char", {
            opacity: 1,
            duration: 0.05,
            stagger: 0.05,
            ease: "none",
            onStart: () => {
                // Loop audio
                if (audioRef.current) {
                    audioRef.current.loop = true;
                    audioRef.current.play().catch(e => {
                        if (e.name !== 'NotAllowedError') {
                            console.warn("Audio play failed", e);
                        }
                    });
                }
            },
            onComplete: () => {
                // Stop audio
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            }
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, { scope: containerRef, dependencies: [text, start] });

    return (
        <span ref={containerRef} className={className}>
            {text}
        </span>
    );
};

export default TypingEffect;
