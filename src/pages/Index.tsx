import { useState, useRef, useEffect } from "react";
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
import { useScrollHeader } from "@/hooks/useScrollHeader";
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isHeaderVisible = useScrollHeader();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleContactSubmit = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    console.log("Form submission triggered via button click");

    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill out all required fields.",
      });
      return;
    }

    setFormStatus('submitting');
    const formData = new FormData(form);

    // Create a controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      console.log("Sending fetch request to Formbold...");
      const response = await fetch("https://formbold.com/s/oyAWb", {
        method: "POST",
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log("Form submission successful");
        setFormStatus('success');
        form.reset(); // Reset form fields

        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      } else {
        console.error("Form submission failed with status:", response.status);
        const text = await response.text();
        console.error("Response body:", text);
        throw new Error(`Form submission failed: ${response.status} ${text}`);
      }

    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Form submission error", error);
      setFormStatus('idle');

      const errorMessage = error instanceof Error && error.name === 'AbortError'
        ? "Request timed out. Please check your internet connection."
        : "Something went wrong. Please try again or email me directly.";

      toast({
        variant: "destructive",
        title: "Error Sending Message",
        description: errorMessage,
      });
    }
  };

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
      title: "Full Stack Developer",
      organization: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Building scalable web applications using React, Node.js, and cloud technologies. Leading frontend development and implementing CI/CD pipelines.",
      type: "experience" as const,
    },
    {
      title: "Data Analyst Intern",
      organization: "Analytics Corp",
      period: "2022 - 2023",
      description: "Analyzed large datasets using Python and SQL. Created interactive dashboards with Power BI and automated reporting processes.",
      type: "experience" as const,
    },
    {
      title: "Freelance Web Developer",
      organization: "Self-Employed",
      period: "2021 - 2022",
      description: "Developed custom websites and web applications for small businesses. Specialized in responsive design and e-commerce solutions.",
      type: "experience" as const,
    },
  ];

  const education = [
    {
      title: "Bachelor of Technology in Computer Science",
      organization: "University of Technology",
      period: "2019 - 2023",
      description: "Specialized in Software Engineering and Data Science. Graduated with honors. Active member of the coding club and hackathon participant.",
      type: "education" as const,
    },
    {
      title: "Full Stack Web Development Certification",
      organization: "Coursera / Meta",
      period: "2022",
      description: "Completed comprehensive training in React, Node.js, and modern web development practices.",
      type: "education" as const,
    },
    {
      title: "Data Science Professional Certificate",
      organization: "IBM",
      period: "2023",
      description: "Mastered Python, SQL, Machine Learning, and data visualization tools for professional data analysis.",
      type: "education" as const,
    },
  ];

  const certifications = [
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      link: "#",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      link: "#",
    },
    {
      title: "Meta Front-End Developer Certificate",
      issuer: "Meta / Coursera",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      link: "#",
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      link: "#",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and inventory management.",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing business metrics and KPIs in real-time.",
      tech: ["Python", "Flask", "D3.js"],
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team features.",
      tech: ["React", "Firebase", "Tailwind"],
    },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
      <section id="about" className="min-h-screen flex items-center justify-center relative px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
            {/* Profile Image */}
            <div className="opacity-0 animate-scale-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <div className="neu-card p-3 rounded-full overflow-hidden">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full neu-card-inset flex items-center justify-center overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                Ritesh Brahmachari
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                Full Stack Developer & Data Analyst
              </p>
              <p className="text-muted-foreground mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                Passionate about crafting elegant web solutions and transforming data into actionable insights.
                Experienced in building scalable applications with modern technologies.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <NeumorphicButton variant="primary" href="#projects">
                  <Briefcase className="w-5 h-5" />
                  View Projects
                </NeumorphicButton>
                <NeumorphicButton variant="secondary" href="#contact">
                  <Mail className="w-5 h-5" />
                  Contact Me
                </NeumorphicButton>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
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
              <TimelineCard key={item.title} item={item} index={index} />
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
              <TimelineCard key={item.title} item={item} index={index} />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <CertificateCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                image={cert.image}
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
              <div
                key={project.title}
                className="neu-card p-6 opacity-0 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="neu-card-inset rounded-xl h-40 mb-4 flex items-center justify-center">
                  <Layout className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <NeumorphicButton variant="secondary" size="sm">
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </NeumorphicButton>
              </div>
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
