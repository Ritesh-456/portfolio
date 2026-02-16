import { useState, useRef, useEffect, useCallback } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import LoadingScreen from "@/components/LoadingScreen";
import profilePic from "../../assets/Profile_image/pic.webp";
import NeumorphicButton from "@/components/NeumorphicButton";
import SkillCard from "@/components/SkillCard";
import SocialLink from "@/components/SocialLink";
import ThemeToggle from "@/components/ThemeToggle";
import TimelineCard from "@/components/TimelineCard";
import CertificateCard from "@/components/CertificateCard";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import ProjectCard from "@/components/ProjectCard";
import ibmCert from "../../assets/certificate_images/data_analytics/IBM_Data_Analyst_8T765S6252YO.webp";
import msCert from "../../assets/certificate_images/data_analytics/Microsoft_Power_BI_Data Analyst_TI046W0BOP59.webp";
import googleCert from "../../assets/certificate_images/ai_engineering/Google_AI_Essentials_Specialization_CAB9X15MFQAR.webp";
import awsCert from "../../assets/certificate_images/cloud/AWS_Fundamentals_QVUENPT79SVA.webp";
import ibmFullStackCert from "../../assets/certificate_images/software_developer/IBM_Full_Stack_Software_SHHZOCK27GBK.webp";
import { ChevronDown } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
import {
  Code2,
  Database,
  Layout,
  Mail,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Server,
  BarChart3,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

const navItems = ["About", "Skills", "Experience", "Education", "Certifications", "Projects", "Contact"];

const skills = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Frontend Development",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend Development",
    skills: ["Python", "Flask", "Django", "Node.js", "RESTful APIs"],
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database & Cloud",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "AWS", "Git"],
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Data Analysis",
    skills: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau"],
  },
];

const experience = [
  {
    title: "Data Analyst Training Program (Scholarship Recipient)",
    organization: "Test Yantra / PySpiders",
    period: "2025 - Present",
    description: "Intensive training program focused on advanced data analytics, SQL optimization, and Python-based data science workflows. Selected as a scholarship recipient for technical merit.",
    type: "experience" as const,
  },
];

const education = [
  {
    title: "B.Tech in Computer Science Engineering",
    organization: "Silicon Institute of Technology, Sambalpur, Odisha",
    period: "2021 - 2025",
    description: "Focused on computer science fundamentals, data structures, and database management systems. Graduated with a CGPA of 7.66.",
    type: "education" as const,
  },
  {
    title: (
      <>
        12<sup>th</sup> / Intermediate (Science - PCM/IT)
      </>
    ),
    organization: "Newton Higher Secondary School, Balasore, Odisha",
    period: "2019 - 2021",
    description: "Pursued science stream with a focus on Physics, Chemistry, Mathematics, and IT. Achieved a CGPA of 7.52.",
    type: "education" as const,
  },
  {
    title: (
      <>
        10<sup>th</sup> / Metriculation (General Studies)
      </>
    ),
    organization: "Phanchyat High School, Balasore, Odisha",
    period: "2019",
    description: "Completed secondary education with general studies. Achieved a CGPA of 6.92.",
    type: "education" as const,
  },
];

const certifications = {
  "Data Analytics": [
    {
      title: "IBM Data Analyst Professional Certificate",
      issuer: "IBM / Coursera",
      image: ibmCert,
      credentialId: "8T765S6252YO",
      description: "Completed an extensive program covering data analysis, visualization, Python SQL, and Excel.",
      link: "https://coursera.org/share/be542ed494a32cb99ceeacaec6322ff0",
    },
    {
      title: "Microsoft Power BI Data Analyst Professional Certificate",
      issuer: "Microsoft / Coursera",
      image: msCert,
      credentialId: "TI046W0BOP59",
      description: "Mastered data modeling, visualization, and dashboard creation using Power BI for business intelligence.",
      link: "https://coursera.org/share/21a9ca6b22b6c998bf800b0b6a0eaaa8",
    },
  ],
  "AI Engineering": [
    {
      title: "Google AI Essentials Specialization",
      issuer: "Google / Coursera",
      image: googleCert,
      credentialId: "CAB9X15MFQAR",
      description: "Learned foundational AI concepts, generative AI applications, and ethical considerations in AI deployment.",
      link: "https://coursera.org/share/7c669670731d102434674f7678523c04",
    },
  ],
  "Cloud Computing": [
    {
      title: "AWS Fundamentals Specialization",
      issuer: "AWS / Coursera",
      image: awsCert,
      credentialId: "QVUENPT79SVA",
      description: "Gained core AWS skills, security concepts, and cloud migration strategies.",
      link: "https://coursera.org/verify/specialization/QVUENPT79SVA",
    },
  ],
  "Software Development": [
    {
      title: "IBM Full Stack Software Developer Professional Certificate",
      issuer: "IBM / Coursera",
      image: ibmFullStackCert,
      credentialId: "SHHZOCK27GBK",
      description: "Mastered full-stack development with Cloud Native, Python, Django, React, and OpenShift.",
      link: "https://coursera.org/verify/professional-cert/SHHZOCK27GBK",
    },
  ]
};

const projects = [
  {
    title: "Customer Shopping Behavior Analysis",
    description: "Analyzed 3,900+ retail records to identify customer trends and engagement insights. Designed SQL queries and interactive Power BI dashboards.",
    tech: ["Python", "PostgreSQL", "SQL", "Power BI"],
    link: "https://github.com/Ritesh-456/customer_sales_data",
  },
  {
    title: "Gold Price & LTV Risk Analysis",
    description: "Processed multi-year datasets for trend analysis and volatility assessment. Developed interactive dashboards for risk assessment.",
    tech: ["Python", "Pandas", "Streamlit"],
    link: "http://github.com/Ritesh-456/gold-price-ltv-analysis",
  },
  {
    title: "Zepto Inventory SQL Data Analysis",
    description: "Analyzed 3,700+ SKU records from a real-world e-commerce dataset for revenue insights and inventory optimization.",
    tech: ["PostgreSQL", "SQL"],
    link: "https://github.com/Ritesh-456/Zepto-Inventory-Analysis-using-SQL",
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isHeaderVisible = useScrollHeader();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"Data Analytics" | "AI Engineering" | "Cloud Computing" | "Software Development">("Data Analytics");
  const { displayedText, isDone: isNameTyped } = useTypewriter("Ritesh Brahmachari", 100, 1000);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: false, skipSnaps: false });

  const categories = Object.keys(certifications) as Array<keyof typeof certifications>;
  // Duplicate categories to ensure smooth looping
  const duplicatedCategories = [...categories, ...categories, ...categories];

  const handleCategoryClick = (category: typeof activeCategory, index: number) => {
    setActiveCategory(category);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // Sync active category with carousel scroll
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      if (!emblaApi) return;
      const index = emblaApi.selectedScrollSnap();
      // Calculate true index based on original categories length
      const trueIndex = index % categories.length;
      if (categories[trueIndex]) {
        setActiveCategory(categories[trueIndex]);
      }
    };

    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, certifications]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-background/80 backdrop-blur-sm transition-all duration-300 ${isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="neu-card-flat px-4 py-2 rounded-xl">
            <span className="text-xl font-bold text-gradient">RB</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NeumorphicButton variant="primary" size="sm" className="hidden sm:flex">
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </NeumorphicButton>
            <MobileNav items={navItems}>
              <div className="sm:hidden">
                <NeumorphicButton variant="primary" size="md">
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                </NeumorphicButton>
              </div>
            </MobileNav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative px-6 py-20 pt-40 md:pt-20">
        <div className="max-w-6xl mx-auto w-full pb-28 md:pb-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
            {/* Profile Image */}
            <div className="opacity-0 animate-scale-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <div className="neu-card p-3 rounded-full overflow-hidden">
                <div className="w-40 h-40 md:w-64 md:h-64 rounded-full neu-card-inset flex items-center justify-center overflow-hidden">
                  <img
                    src={profilePic}
                    alt="Ritesh Brahmachari"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>



            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <p className="text-primary font-medium mb-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                Hello, I'm
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 min-h-[1.2em]">
                {displayedText}
                <span className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-bottom ${isNameTyped ? 'hidden' : 'animate-pulse'}`}></span>
              </h1>

              <div className={`transition-all duration-700 ${isNameTyped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-lg md:text-2xl text-muted-foreground mb-6">
                  Full Stack Developer & Data Analyst
                </p>
                <p className="text-muted-foreground mb-8 text-sm md:text-base">
                  Passionate about crafting elegant web solutions and transforming data into actionable insights.
                  Experienced in building scalable applications with modern technologies.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                  <NeumorphicButton variant="primary" href="#projects" className="flex-1 sm:flex-none">
                    <Briefcase className="w-5 h-5" />
                    View Projects
                  </NeumorphicButton>
                  <NeumorphicButton variant="secondary" href="#contact" className="flex-1 sm:flex-none">
                    <Mail className="w-5 h-5" />
                    Contact Me
                  </NeumorphicButton>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                  <SocialLink
                    href="https://github.com/Ritesh-456"
                    icon={<Github className="w-5 h-5" />}
                    label="GitHub"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/ritesh-brahmachari-1b7b84278/"
                    icon={<Linkedin className="w-5 h-5" />}
                    label="LinkedIn"
                  />
                  <SocialLink
                    href="mailto:brahmachariritesh508805@gmail.com"
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center z-30 pointer-events-none">
          <a href="#skills" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-bounce pointer-events-auto">
            <span className="text-sm font-medium">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Technical Proficiency</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web applications and analyzing data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                skills={skill.skills}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Work History</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey in software development and data analysis
            </p>
          </div>

          <div className="mt-8">
            {experience.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Academic Background</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Education & Degrees
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic achievements and professional training
            </p>
          </div>

          <div className="mt-8">
            {education.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Credentials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and credentials I've earned
            </p>
          </div>

          {/* Certificate Navigation Carousel */}
          <div className="mb-14 relative px-8 flex justify-center">
            <div className="overflow-hidden w-full max-w-4xl" ref={emblaRef}>
              <div className="flex touch-pan-y items-center gap-4">
                {duplicatedCategories.map((category, index) => {
                  return (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => emblaApi && emblaApi.scrollTo(index)}
                      className={`
                        flex-[0_0_auto] min-w-0 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                        flex items-center justify-center
                        ${activeCategory === category ? 'text-primary scale-105' : 'text-muted-foreground hover:text-foreground'}
                      `}
                    >
                      <span className={`px-4 py-2 rounded-full whitespace-nowrap shadow-sm ${activeCategory === category ? 'neu-card-pressed' : 'neu-card-flat'}`}>
                        {category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fade gradients for visual cue of scrollability */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications[activeCategory].map((cert, index) => (
              <CertificateCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                image={cert.image}
                credentialId={cert.credentialId}
                description={cert.description}
                link={cert.link}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
              <Layout className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">My Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects showcasing my skills in full-stack development and data analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tech={project.tech}
                link={project.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 neu-card-flat px-4 py-2 rounded-full mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind? Feel free to reach out and let's create something amazing together.
          </p>

          <div className="neu-card p-8 relative overflow-hidden">
            {isHeaderVisible /* Re-using simple state variable for success visibility hack or better creating new one inside component if possible. Wait, Index IS the component. I should add state at top. */}

            {/* Success Overlay */}
            <div
              className={`absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-all duration-500 ${formStatus === 'success' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-bounce">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for contacting me.</p>
            </div>

            <form className="space-y-6" ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="neu-input"
                  required
                  disabled={formStatus === 'submitting'}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="neu-input"
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="neu-input"
                required
                disabled={formStatus === 'submitting'}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="neu-input resize-none"
                required
                disabled={formStatus === 'submitting'}
              />
              <NeumorphicButton
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </NeumorphicButton>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Ritesh Brahmachari. All rights reserved.
          </p>
          <div className="flex gap-4">
            <SocialLink
              href="https://github.com/Ritesh-456"
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/ritesh-brahmachari-1b7b84278/"
              icon={<Linkedin className="w-4 h-4" />}
              label="LinkedIn"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
