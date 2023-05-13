import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface MainNavProps {
    items?: NavItem[]
    path?: string
}

export function MainNav({ items, path }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link
                href="/"
                className="hidden items-center space-x-2 no-underline md:flex"
            >
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {items?.map(
                                (item, index) =>
                                    item.href && (
                                        <NavigationMenuItem
                                            className="mr-1"
                                            key={index}
                                        >
                                            <Link
                                                href={item.href}
                                                className="no-underline"
                                                legacyBehavior
                                                passHref
                                            >
                                                <NavigationMenuLink
                                                    active={path === item.href}
                                                    className={navigationMenuTriggerStyle()}
                                                >
                                                    {item.title}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    )
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            ) : null}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
                    >
                        <Icons.logo className="mr-2 h-4 w-4" />{" "}
                        <span className="font-bold">Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    sideOffset={24}
                    className="w-[300px] overflow-scroll"
                >
                    <DropdownMenuLabel>
                        <Link
                            href="/"
                            className="flex items-center no-underline"
                        >
                            <Icons.logo className="mr-2 h-4 w-4" />{" "}
                            {siteConfig.name}
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {items?.map(
                        (item, index) =>
                            item.href && (
                                <DropdownMenuItem key={index} asChild>
                                    <Link
                                        href={item.href}
                                        className="no-underline"
                                    >
                                        {item.title}
                                    </Link>
                                </DropdownMenuItem>
                            )
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
