"use client"

import React, { useState } from "react"
import { AlertCircle, Info } from "lucide-react"

import { ScanSkeleton } from "@/components/client/scan-skeleton"
import { Icons } from "@/components/icons"
import CertificateData from "@/components/scanning/CertificateData"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function ScanForm() {
    const [showScanAlert, setShowScanAlert] = React.useState<boolean>(false)
    const [server, setServer] = useState("")
    const [tool, setTool] = useState("")
    const [protocol, setProtocol] = useState("none")
    const [result, setResult] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()
        setResult(null)
        setLoading(true)
        setTool(tool)
        fetch("/api/scan", {
            body: JSON.stringify({
                protocol: protocol,
                server: server,
                tool: tool,
            }),
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(async (result) => {
            setLoading(false)
            const apiResult = await result.json()
            if (apiResult.error) {
                setError(apiResult.error)
                setResult(null)
            } else {
                setError(null)
                setResult(apiResult)
            }
        })
    }

    // Reset the results on tool change
    const handleToolChange = (event: string) => {
        setResult(null)
        setTool(event)
    }

    return (
        <>
            <div className="container">
                {error ? (
                    <Alert
                        variant="destructive"
                        className="mb-2 bg-white dark:bg-slate-900"
                    >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : null}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="-mx-3 mb-2 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                            <Select
                                name="protocol"
                                key="protocol"
                                onValueChange={setProtocol}
                                required
                            >
                                <SelectTrigger aria-label="Protocol">
                                    <SelectValue placeholder="Protocol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="https">
                                        https://
                                    </SelectItem>
                                    <SelectItem value="http">
                                        http://
                                    </SelectItem>
                                    <SelectItem value="none">
                                        Not applicable
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-3/6">
                            <Input
                                type="text"
                                name="server"
                                placeholder="Enter a URL or an IP-address"
                                value={server}
                                onChange={(e) => {
                                    setServer(e.target.value)
                                    setResult(null)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                            <Select
                                name="tool"
                                key="tool"
                                onValueChange={handleToolChange}
                                required
                            >
                                <SelectTrigger aria-label="Tool">
                                    <SelectValue placeholder="Select a tool" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Websites</SelectLabel>
                                        <SelectItem value="webscan">
                                            Web Scanner
                                        </SelectItem>
                                        <SelectItem value="cert-info">
                                            Certificate Information
                                        </SelectItem>
                                        <SelectItem value="web-whois">
                                            Domain Lookup
                                        </SelectItem>
                                    </SelectGroup>
                                    <SelectSeparator />
                                    <SelectGroup>
                                        <SelectLabel>Servers</SelectLabel>
                                        <SelectItem value="portscan" disabled>
                                            Port Scanner
                                        </SelectItem>
                                        <SelectItem value="dns-records">
                                            DNS Records
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-6 w-full px-6 md:mb-0 md:w-1/6">
                            <AlertDialog
                                open={showScanAlert}
                                onOpenChange={setShowScanAlert}
                            >
                                <AlertDialogTrigger asChild>
                                    <Button className="w-full">Scan</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure that you
                                            want to scan?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            We only recommend this using this
                                            tool for educational purposes. If
                                            you scan a website or server that
                                            you do not own, you may be violating
                                            the law.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={async (event: any) => {
                                                handleSubmit(event)
                                                setShowScanAlert(false)
                                            }}
                                            className="bg-red-600 focus:ring-red-600"
                                        >
                                            {loading ? (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            ) : null}
                                            <span>Scan</span>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </form>
            </div>

            {loading && <ScanSkeleton />}

            {result && (
                <>
                    <div className="mb-8 w-full">
                        <h2 className="sm:text-1xl mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                            Scan Result
                        </h2>
                        <div className="not-prose relative mt-5 hidden overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25 md:block">
                            <div
                                style={{ backgroundPosition: "10px 10px" }}
                                className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                            ></div>
                            <div className="relative overflow-auto rounded-xl">
                                <div className="my-4 overflow-hidden shadow-sm">
                                    {tool != "cert-info" ? (
                                        <table className="w-full table-auto border-collapse text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="w-1/6 border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                        Key
                                                    </th>
                                                    <th className="w-4/6 border-b p-4 pb-3 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-white dark:bg-slate-800"
                                                key="scan-result"
                                            >
                                                {Object.keys(result).map(
                                                    (key): React.ReactNode => (
                                                        <tr>
                                                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                                {key}
                                                            </td>
                                                            <td className="border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                                {typeof result[
                                                                    key
                                                                ] ===
                                                                "object" ? (
                                                                    <>
                                                                        {result[
                                                                            key
                                                                        ]?.map(
                                                                            (
                                                                                x: string
                                                                            ) => (
                                                                                <div
                                                                                    key={String(
                                                                                        x
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        x
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            result[
                                                                                key
                                                                            ]
                                                                        }
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <CertificateData data={result} />
                                    )}
                                </div>
                                <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                                    You did a {tool} the following website:{" "}
                                    <b>{server}</b>
                                </p>
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
                        </div>
                    </div>

                    <Separator className="hidden md:block" />

                    <div className="not-prose relative mb-4 mt-8 overflow-hidden rounded-xl border bg-slate-50 dark:border-slate-700 dark:bg-slate-800/25">
                        <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
                            <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
                                <div className="flex items-center space-x-1 sm:pr-4">
                                    JSON Output
                                </div>
                            </div>
                        </div>
                        <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
                            <label htmlFor="json" className="sr-only">
                                JSON Output
                            </label>
                            <textarea
                                id="json"
                                rows={12}
                                className="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                                value={JSON.stringify(result, null, 2)}
                                readOnly
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
