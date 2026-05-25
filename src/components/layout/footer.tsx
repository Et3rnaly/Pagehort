import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { footerLinks } from "@/src/config/navigation"
import { siteConfig } from "@/src/config/site"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const visibleSocialLinks = [
    { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
    { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
    { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  ].filter((link) => link.href && link.href !== "#")

  const visibleFooterGroups = [
    footerLinks.institucional,
    footerLinks.ajuda,
    footerLinks.contato,
  ]
    .map((group) => ({
      title: group.title,
      links: group.links.flatMap((link) =>
        "href" in link ? [{ label: link.label, href: link.href }] : []
      ),
    }))
    .filter((group) => group.links.length > 0)

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
                     src="/logo.webp"
                     alt="Logo da marca"
                     width={120}
                     height={40}
                     sizes="40px"
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
            {visibleSocialLinks.length > 0 && (
              <div className="flex gap-4">
                {visibleSocialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-card/70 hover:text-card transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {visibleFooterGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-card mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              </ul>
            </div>
          ))}
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
