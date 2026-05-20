"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/src/config/site"

const newsletterSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    // TODO: Implement newsletter subscription API call
    console.log("Newsletter subscription:", data.email)
    reset()
  }

  return (
    <section className="py-12 bg-primary" aria-labelledby="newsletter-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">ZF</span>
            </div>
            <div className="text-primary-foreground">
              <p id="newsletter-title" className="font-semibold">Receba nosso blog pelo e-mail</p>
              <p className="text-sm opacity-90">Cadastre-se e fique por dentro das novidades!</p>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
          >
            <div className="flex flex-col">
              <Input 
                type="email" 
                placeholder="Digite seu e-mail"
                className="bg-primary-foreground text-foreground rounded-full px-4 py-2 min-w-[250px]"
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <span id="email-error" className="text-xs text-primary-foreground/80 mt-1 ml-4">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
