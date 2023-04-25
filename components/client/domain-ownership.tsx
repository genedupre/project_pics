"use client"

import { Fragment, useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

import { Icons } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

type domainType = {
    id: number
    domain: string
    key: string
}

export function DomainOwnership() {
    const [domains, setDomains] = useState<domainType[]>([])
    const [isLoading, setLoading] = useState(false)
    const [isVerifying, setVerifying] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState("")
    const [key, setKey] = useState(Math.random().toString(36))
    const [domain, setDomain] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch("/api/verify")
            .then((res) => res.json())
            .then((data) => {
                setDomains(data)
                setLoading(false)
            })
    }, [])

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        setVerifying(true)
        fetch("/api/verify", {
            body: JSON.stringify({
                key: key,
                domain: domain,
            }),
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(async (result) => {
            setVerifying(false)

            const apiResult = await result.json()

            // display success or error message
            if (apiResult.error) {
                setError(apiResult.error)
                setSuccess("")
            } else {
                setError(null)
                setKey(Math.random().toString(36))
                setSuccess("Domain verified successfully!")
                setDomains([
                    ...domains,
                    {
                        id: Math.random() * Number.MAX_SAFE_INTEGER,
                        domain: domain,
                        key: key,
                    },
                ])
            }
        })
    }

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
            <SheetContent
                position="right"
                size="content"
                className="sm:w-full md:w-96"
            >
                <SheetHeader>
                    <SheetTitle>Domain ownership verification</SheetTitle>
                    <SheetDescription>
                        In order for us to allow you to perform port scanning on
                        our website, we need to verify that you own the domain
                        you are scanning. Please follow the instructions below
                        to verify your domain.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Start by creating a file named <b>pics-project.txt</b>{" "}
                        in the root of your domain and add the following
                        content:
                    </p>
                    <pre className="my-4 rounded-md bg-slate-100 p-4 dark:bg-slate-700">
                        <code id="domainKey">{`key="${key}"`}</code>{" "}
                        <Icons.refresh
                            className="float-right h-5 w-5 cursor-pointer pt-1"
                            onClick={() => {
                                // Generate a new random key
                                const randomKey = Math.random().toString(36)
                                // Update the code element
                                document.querySelector(
                                    "#domainKey"
                                )!.innerHTML = `key="${randomKey}"`

                                setKey(randomKey)
                            }}
                        />
                    </pre>
                    <input type="hidden" id="key" name="key" value={key} />
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Once you have created the file, please enter your domain
                        below and click <b>Verify domain</b>.
                    </p>
                    {error ? (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : null}
                    {success ? (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Domain Verified!</AlertTitle>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    ) : null}
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="domain" className="text-right">
                                Domain
                            </Label>
                            <Input
                                id="domain"
                                name="domain"
                                placeholder="example.com"
                                className="col-span-3"
                                onChange={(e) => {
                                    setDomain(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <SheetFooter>
                        {isVerifying ? (
                            <Button variant="secondary" type="submit" disabled>
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Verify domain
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="secondary"
                                onClick={async (event: any) => {
                                    event.preventDefault()
                                    handleSubmit(event)
                                }}
                            >
                                Verify domain
                            </Button>
                        )}
                    </SheetFooter>
                </form>

                {domains.length < 1 ? null : (
                    <>
                        <Separator className="my-4" />
                        <h4 className="text-sm font-semibold">
                            Verified domains
                        </h4>
                        <ScrollArea className="my-4 h-72 rounded-md border border-slate-100 dark:border-slate-700">
                            <div className="p-4">
                                {isLoading ? (
                                    <p>Loading..</p>
                                ) : (
                                    <>
                                        {domains.map((domain: domainType) => (
                                            <Fragment key={domain.id}>
                                                <div className="text-sm">
                                                    {domain.domain}
                                                </div>
                                                <Separator className="my-2" />
                                            </Fragment>
                                        ))}
                                    </>
                                )}
                            </div>
                        </ScrollArea>
                    </>
                )}

                <Separator className="my-4" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Please note that we will store a cookie in your browser to
                    verify your domain ownership. You can, at any time, delete
                    the cookies in your browser to remove the domain ownership
                    verification.
                </p>
            </SheetContent>
        </Sheet>
    )
}
