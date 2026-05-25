import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Zé das Frutas",
}

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-[#fffefa]">{children}</div>
}
