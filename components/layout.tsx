import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/config/site"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <div className="sticky top-[100vh] w-full border-t border-t-slate-200 bg-white dark:border-t-slate-700 dark:bg-slate-900">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 text-sm">
          &copy; {currentYear} Copyright {siteConfig.name}. All Rights Reserved.
        </div>
      </div>
    </>
  )
}
