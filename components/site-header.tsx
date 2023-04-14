"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { DomainOwnership } from "@/components/client/domain-ownership"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
    const path = usePathname()!
    return (
        <>
            <div className="bg-indigo-900 py-4 text-center lg:px-4">
                <Link
                    href={siteConfig.links.github + "/issues"}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div
                        className="flex items-center p-2 leading-none text-indigo-100 sm:bg-indigo-800 md:inline-flex md:rounded-full"
                        role="alert"
                    >
                        <span className="mr-3 flex rounded-full bg-indigo-500 px-2 py-1 text-xs font-bold uppercase">
                            Notice
                        </span>
                        <span className="mr-2 flex-auto text-left font-semibold">
                            This project is currently work in progress, report
                            any bugs on our GitHub
                        </span>
                        <svg
                            className="h-4 w-4 fill-current opacity-75"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <MainNav items={siteConfig.mainNav} path={path} />
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-1">
                            <Link
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                        className:
                                            "text-slate-700 dark:text-slate-400",
                                    })}
                                >
                                    <Icons.gitHub className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </div>
                            </Link>
                            <DomainOwnership />
                            <ThemeToggle />
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}
