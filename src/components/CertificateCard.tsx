import { ExternalLink } from "lucide-react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  image: string;
  credentialId?: string;
  description?: string;
  link?: string;
  delay?: number;
}

const CertificateCard = ({ title, issuer, image, credentialId, description, link, delay = 0 }: CertificateCardProps) => {
  return (
    <div
      className="neu-card p-4 opacity-0 animate-fade-in-up group cursor-pointer flex flex-col h-full"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="neu-card-inset rounded-xl overflow-hidden mb-4 aspect-video bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          {issuer}
        </p>
        {(credentialId || description) && (
          <div className="mb-3 space-y-1">
            {credentialId && (
              <p className="text-[10px] text-muted-foreground/80">
                <span className="font-medium">ID:</span> {credentialId}
              </p>
            )}
            {description && (
              <p className="text-[10px] text-muted-foreground/80 line-clamp-3">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-auto"
        >
          <ExternalLink className="w-3 h-3" />
          View Certificate
        </a>
      )}
    </div>
  );
};

export default CertificateCard;
