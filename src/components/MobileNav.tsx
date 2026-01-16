import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface MobileNavProps {
  items: string[];
  children?: React.ReactNode;
}

const MobileNav = ({ items, children }: MobileNavProps) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="neu-circle w-10 h-10 text-foreground flex items-center justify-center p-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col items-center justify-center w-full sm:w-[300px] bg-background/95 backdrop-blur-md border-l border-white/10">
          <nav className="flex flex-col items-center gap-8">
            {items.map((item, index) => (
              <SheetClose asChild key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-medium text-foreground hover:text-primary transition-colors opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  {item}
                </a>
              </SheetClose>
            ))}

            {children && (
              <div
                className="mt-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${items.length * 100}ms`, animationFillMode: 'forwards' }}
              >
                {children}
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
