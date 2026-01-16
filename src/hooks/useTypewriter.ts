import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, startDelay: number = 0) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Initial start delay
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
            let currentIndex = 0;

            const type = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(type, speed);
                } else {
                    setIsDone(true);
                }
            };

            type();
        }, startDelay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeoutId);
        };
    }, [text, speed, startDelay]);

    return { displayedText, isDone, hasStarted };
};
