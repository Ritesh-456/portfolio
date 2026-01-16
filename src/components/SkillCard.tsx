import { ReactNode } from "react";

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  skills: string[];
  delay?: number;
}

const SkillCard = ({ icon, title, skills, delay = 0 }: SkillCardProps) => {
  return (
    <div 
      className="neu-card p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="neu-circle w-14 h-14 mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs font-medium rounded-full text-muted-foreground neu-card-inset"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
