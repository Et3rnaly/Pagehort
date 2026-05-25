import { SectionHeader } from "@/src/components/shared"
import { contentArticles } from "@/src/constants"
import type { Article } from "@/src/types"

interface ContentSectionProps {
  articles?: Article[]
}

export function ContentSection({ articles = contentArticles }: ContentSectionProps) {
  return (
    <section id="conteudos" className="scroll-mt-40 bg-muted py-8" aria-labelledby="content-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Inspire-se com nossos conteúdos"
          titleId="content-title"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.href}
              className="bg-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform" aria-hidden="true">
                  {article.image}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {article.description}
                </p>
                <span className="text-sm text-primary hover:underline">
                  {article.type === "blog" ? "Ver blog" : "Ver receita"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
