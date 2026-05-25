import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  viewAllHref?: string
  viewAllText?: string
  className?: string
  centered?: boolean
  titleId?: string
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  viewAllHref,
  viewAllText = "Ver tudo",
  className,
  centered = false,
  titleId,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
      centered && "items-center text-center sm:flex-col sm:justify-start sm:gap-2",
      className
    )}>
      <div className={cn(centered && "flex flex-col items-center")}>
        <div className="flex items-center gap-2">
          <h2 id={titleId} className="text-2xl font-bold text-foreground">{title}</h2>
          {badge && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      
      {viewAllHref && !centered && (
        <a 
          href={viewAllHref} 
          className="flex shrink-0 items-center gap-2 text-foreground hover:text-primary transition-colors border border-border rounded-full px-4 py-2 bg-card"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}
