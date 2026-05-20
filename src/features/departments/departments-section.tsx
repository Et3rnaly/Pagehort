"use client"

import { departments } from "@/src/constants"
import type { Department } from "@/src/types"

interface DepartmentsSectionProps {
  items?: Department[]
}

export function DepartmentsSection({ items = departments }: DepartmentsSectionProps) {
  return (
    <section className="py-8 bg-card" aria-labelledby="departments-title">
      <div className="container mx-auto px-4">
        <h2 id="departments-title" className="text-xl font-semibold text-foreground mb-6">
          Compre por departamento
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {items.map((dept) => (
            <a
              key={dept.name}
              href={dept.href}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className={`w-16 h-16 ${dept.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {dept.icon}
              </div>
              <span className="text-sm text-foreground text-center whitespace-nowrap">
                {dept.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
