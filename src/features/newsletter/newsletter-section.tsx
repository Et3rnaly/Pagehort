"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterSection() {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get("email") ?? "").trim()

    if (!EMAIL_PATTERN.test(email)) {
      setError("Por favor, insira um e-mail válido")
      return
    }

    setError("")
    setIsSubmitting(true)
    form.reset()
    setIsSubmitting(false)
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
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
          >
            <div className="flex flex-col">
              <Input
                name="email"
                type="email"
                required
                placeholder="Digite seu e-mail"
                className="bg-primary-foreground text-foreground rounded-full px-4 py-2 min-w-[250px]"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "email-error" : undefined}
                onChange={() => {
                  if (error) setError("")
                }}
              />
              {error && (
                <span id="email-error" className="text-xs text-primary-foreground/80 mt-1 ml-4">
                  {error}
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
