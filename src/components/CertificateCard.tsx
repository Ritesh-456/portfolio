import { ExternalLink } from "lucide-react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  image: string;
  link?: string;
  delay?: number;
}

const CertificateCard = ({ title, issuer, image, link, delay = 0 }: CertificateCardProps) => {
  return (
    <div
      className="neu-card p-4 opacity-0 animate-fade-in-up group cursor-pointer"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="neu-card-inset rounded-xl overflow-hidden mb-4 aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">
        {issuer}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <ExternalLink className="w-3 h-3" />
          View Certificate
        </a>
      )}
    </div>
  );
};

export default CertificateCard;
