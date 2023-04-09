"use client"

import * as React from "react"

import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const domains = Array.from({ length: 50 }).map(
    (_, i, a) => `example${a.length - i}.com`
)

const randomKey = Math.random().toString(36)

export function DomainOwnership() {
    return (
        <Sheet>
            <SheetTrigger>
                <div
                    className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                        className: "text-slate-700 dark:text-slate-400",
                    })}
                >
                    <Icons.settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </div>
            </SheetTrigger>
            <SheetContent position="right" size="sm">
                <SheetHeader>
                    <SheetTitle>Domain ownership verification</SheetTitle>
                    <SheetDescription>
                        In order for us to allow you to perform port scanning on
                        our website, we need to verify that you own the domain
                        you are scanning. Please follow the instructions below
                        to verify your domain.
                    </SheetDescription>
                </SheetHeader>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Start by creating a file named <b>pics-project.txt</b> in
                    the root of your domain and add the following content:
                </p>
                <pre className="mt-4 mb-4 rounded-md bg-slate-100 p-4 dark:bg-slate-700">
                    <code>{`key="${randomKey}"`}</code>
                </pre>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Once you have created the file, please enter your domain
                    below and click <b>Verify domain</b>.
                </p>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="domain" className="text-right">
                            Domain
                        </Label>
                        <Input
                            id="domain"
                            placeholder="example.com"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button type="submit">Verify domain</Button>
                </SheetFooter>
                <Separator className="mt-4 mb-4" />
                <h4 className="text-sm font-semibold">Verified domains</h4>
                <ScrollArea className="mt-4 h-72 rounded-md border border-slate-100 dark:border-slate-700">
                    <div className="p-4">
                        {domains.map((domain) => (
                            <React.Fragment>
                                <div className="text-sm" key={domain}>
                                    {domain}
                                </div>
                                <Separator className="my-2" />
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="mt-4 mb-4" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Please note that we will store a cookie in your browser to
                    verify your domain ownership.
                </p>
            </SheetContent>
        </Sheet>
    )
}
