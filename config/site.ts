import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "PICS Project",
  description:
    "A tool for cybersecurity professionals to to scan and analyze their network for vulnerabilities and misconfigurations.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ],
  links: {
    github: "https://github.com/genedupre/project_pics",
    docs: "https://ui.shadcn.com",
  },
}
