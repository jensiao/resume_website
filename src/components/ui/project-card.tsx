import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  className?: string;
  color?: string;
  tags?: string[];
  period?: string;
}

export function ProjectCard({
  className,
  imgSrc,
  title,
  description,
  link,
  linkText = "查看详情",
  color = "#4F8CF7",
  tags,
  period,
}: ProjectCardProps) {
  return (
    <Link
      to={link}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[rgba(12,12,12,0.6)] backdrop-blur-sm shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-white/[0.12]",
        className
      )}
    >
      {/* Card Image Section */}
      <div className="aspect-video overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Card Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider"
                style={{
                  background: `${color}20`,
                  border: `1px solid ${color}35`,
                  color: '#D7E2EA',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Period */}
        {period && (
          <p className="text-[#D7E2EA]/45 text-xs font-mono tracking-wider mb-2">
            {period}
          </p>
        )}

        <h3
          className="text-white font-display font-semibold text-lg transition-colors duration-300"
          style={{ color: '#FFFFFF' }}
        >
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[#D7E2EA]/55 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Card CTA */}
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
          style={{ color }}
        >
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
