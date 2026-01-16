import { useState, useRef, useEffect } from 'react';
import { Layout, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import NeumorphicButton from './NeumorphicButton';

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    link: string;
    index: number;
}

const ProjectCard = ({ title, description, tech, link, index }: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            // Check if content overflows the fixed height
            const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setShowSeeMore(isOverflowing);
        }
    }, [description]);

    return (
        <div
            className="neu-card p-6 opacity-0 animate-fade-in-up group flex flex-col h-full"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
            <div className="neu-card-inset rounded-xl h-40 mb-4 flex items-center justify-center">
                <Layout className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 min-h-[3.5rem] flex items-center">
                {title}
            </h3>

            <div className="mb-4">
                <p
                    ref={descriptionRef}
                    className={`text-muted-foreground text-sm transition-all duration-300 ease-in-out ${isExpanded ? '' : 'h-[4.5rem] line-clamp-3'
                        }`}
                >
                    {description}
                </p>

                {/* Only show the button if content overflows or if already expanded */}
                {(showSeeMore || isExpanded) && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-primary font-medium mt-1 hover:underline flex items-center gap-1 focus:outline-none"
                    >
                        {isExpanded ? (
                            <>See Less <ChevronUp className="w-3 h-3" /></>
                        ) : (
                            <>See More <ChevronDown className="w-3 h-3" /></>
                        )}
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t) => (
                    <span
                        key={t}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <div className="mt-auto">
                <NeumorphicButton variant="secondary" size="sm" href={link}>
                    <ExternalLink className="w-4 h-4" />
                    View Project
                </NeumorphicButton>
            </div>
        </div>
    );
};

export default ProjectCard;
