import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  title: string | React.ReactNode;
  organization: string;
  period: string;
  description: string;
  type: "experience" | "education";
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

const TimelineCard = ({ item, index }: TimelineCardProps) => {
  const Icon = item.type === "experience" ? Briefcase : GraduationCap;

  return (
    <div
      className="relative pl-8 pb-8 last:pb-0 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-1 neu-circle w-6 h-6 z-10">
        <Icon className="w-3 h-3 text-primary" />
      </div>

      {/* Card content */}
      <div className="neu-card p-5 ml-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <span className="px-3 py-1 text-xs font-medium rounded-full neu-card-inset text-primary">
            {item.period}
          </span>
        </div>
        <p className="text-primary font-medium text-sm mb-2">{item.organization}</p>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </div>
    </div>
  );
};

export default TimelineCard;
