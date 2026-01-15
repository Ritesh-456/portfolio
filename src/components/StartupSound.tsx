import { useEffect } from 'react';

interface StartupSoundProps {
    onComplete?: () => void;
}

const StartupSound = ({ onComplete }: StartupSoundProps) => {
    useEffect(() => {
        const soundUrl = '/sounds/startup-page-turn-chime.mp3';
        const startupSound = new Audio(soundUrl);
        startupSound.volume = 0.5;

        // Listener for when audio finishes
        const handleEnded = () => {
            if (onComplete) onComplete();
        };
        startupSound.addEventListener('ended', handleEnded);

        const playSound = async () => {
            try {
                await startupSound.play();
                console.log("Startup sound played successfully.");
            } catch (error) {
                // This is expected if the user hasn't interated yet
                console.log("Autoplay blocked. Waiting for user interaction.");

                // Fallback: Play on first interaction
                const enableAudio = () => {
                    startupSound.play().catch(() => { });
                    document.removeEventListener('click', enableAudio);
                    document.removeEventListener('keydown', enableAudio);
                };

                document.addEventListener('click', enableAudio);
                document.addEventListener('keydown', enableAudio);
            }
        };

        playSound();

        return () => {
            startupSound.removeEventListener('ended', handleEnded);
            startupSound.pause();
            startupSound.currentTime = 0;
        };
    }, [onComplete]);

    return null;
};

export default StartupSound;
