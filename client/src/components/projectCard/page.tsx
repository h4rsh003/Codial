import { 
  Github, 
  ExternalLink, 
  Layout
} from 'lucide-react';
import * as React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Project Type
type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string;
  github: string;
  liveLink?: string;
  thumbnail?: string;
  user: {
    name: string;
  };
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const tags = project.techStack.split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:border-primary/30 h-full flex flex-col">
      {/* Thumbnail Section */}
      <div className="relative h-48 overflow-hidden bg-secondary/50">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Layout className="w-12 h-12 opacity-20" />
          </div>
        )}

        {/* Hover Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
            title="View Code"
          >
            <Github className="w-5 h-5" />
          </a>
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform"
              title="Live Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Card Header - Title & Author */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 mt-1">
          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-secondary-foreground border border-border">
            {project.user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs">
            by <span className="font-medium text-foreground">{project.user.name}</span>
          </span>
        </CardDescription>
      </CardHeader>

      {/* Card Content - Description */}
      <CardContent className="flex-grow pb-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
      </CardContent>

      {/* Card Footer - Tech Stack Tags */}
      <CardFooter className="pt-0 flex-wrap gap-2">
        {tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-[10px] font-semibold rounded-md uppercase tracking-wider border border-border/50"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-2 py-1 text-[10px] text-muted-foreground">
            +{tags.length - 3}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;