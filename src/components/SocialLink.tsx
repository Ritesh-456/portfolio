import { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="neu-circle w-12 h-12 text-muted-foreground hover:text-primary transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialLink;
