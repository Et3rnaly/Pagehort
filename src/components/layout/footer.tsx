"use client"

import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { footerLinks } from "@/src/config/navigation"
import { siteConfig } from "@/src/config/site"
import Image from "next/image";
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-foreground text-card", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="flex items-center">
                  <Image
                     src="/logo.png"
                     alt="Logo da marca"
                     width={120}
                     height={40}
                     priority
                 />
                 </span>
              </div>
              <div>
                <span className="text-lg font-bold text-card">{siteConfig.name}</span>
                <p className="text-xs text-card/70">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-card/70 mb-4">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.social.facebook} 
                className="text-card/70 hover:text-card transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={siteConfig.social.instagram} 
                className="text-card/70 hover:text-card transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={siteConfig.social.youtube} 
                className="text-card/70 hover:text-card transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href={siteConfig.social.linkedin} 
                className="text-card/70 hover:text-card transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-semibold text-card mb-4">{footerLinks.institucional.title}</h3>
            <ul className="space-y-2">
              {footerLinks.institucional.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h3 className="font-semibold text-card mb-4">{footerLinks.ajuda.title}</h3>
            <ul className="space-y-2">
              {footerLinks.ajuda.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-card mb-4">{footerLinks.contato.title}</h3>
            <ul className="space-y-2">
              {footerLinks.contato.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods and Certifications */}
        <div className="border-t border-card/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-card mb-3">Formas de pagamento</h4>
              <div className="flex gap-2">
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">VISA</div>
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">Mastercard</div>
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">Amex</div>
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">PIX</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-card mb-3">Certificados e garantias</h4>
              <div className="flex gap-2">
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">Google Safe</div>
                <div className="bg-card/10 px-3 py-2 rounded text-xs text-card/70">PCI Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-card/20 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">ZF</span>
            </div>
            <p className="text-sm text-card/70">
              <span className="text-primary">{siteConfig.name}</span> - Saúde e frescor para sua mesa
            </p>
          </div>
          <p className="text-xs text-card/50">
            © {new Date().getFullYear()} {siteConfig.company.name}. CNPJ: {siteConfig.company.cnpj}
          </p>
          <p className="text-xs text-card/50">
            {siteConfig.contact.location} - {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </footer>
  )
}
