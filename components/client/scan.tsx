"use client"

import React, { useState } from "react"
import { Info } from "lucide-react"

import { Icons } from "@/components/icons"
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
import { Skeleton } from "../ui/skeleton"

interface LoadingState {
    loading: boolean
}

export function ScanForm() {
    const [showScanAlert, setShowScanAlert] = React.useState<boolean>(false)
    const [server, setServer] = useState("")
    const [tool, setTool] = useState("webscan")
    const [protocol, setProtocol] = useState("none")
    const [result, setResult] = useState<any>()
    const [loading, setLoading] = useState<LoadingState["loading"]>(false)

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()
        setResult(null)
        setLoading(true)
        const formData = new URLSearchParams()
        formData.append("protocol", protocol)
        formData.append("server", server)
        formData.append("tool", tool)
        setTool(tool)
        fetch("/api/scan", {
            body: formData.toString(),
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(async (result) => {
            setLoading(false)
            setResult(await result.json())
        })
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="-mx-3 mb-2 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                            <Select
                                name="protocol"
                                key="protocol"
                                onValueChange={setProtocol}
                                required
                            >
                                <SelectTrigger>
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
                                onValueChange={setTool}
                                required
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a tool" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Websites</SelectLabel>
                                        <SelectItem value="webscan">
                                            Web Scanner
                                        </SelectItem>
                                        <SelectItem value="certinfo" disabled>
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
                                        <SelectItem
                                            value="full_portscan"
                                            disabled
                                        >
                                            Full Port scan
                                        </SelectItem>
                                        <SelectItem
                                            value="custom_portscan"
                                            disabled
                                        >
                                            Custom Port Scan
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
                                    <Button
                                        variant="default"
                                        className="w-full"
                                    >
                                        Scan
                                    </Button>
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

            {loading && (
                <>
                    <div className="mb-8 w-full">
                        <h2 className="sm:text-1xl mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                            Scan Result
                        </h2>
                        <div className="not-prose relative mt-5 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25">
                            <div
                                style={{ backgroundPosition: "10px 10px" }}
                                className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                            ></div>
                            <div className="relative overflow-auto rounded-xl">
                                <div className="my-4 overflow-hidden shadow-sm">
                                    <table className="w-full table-auto border-collapse text-sm">
                                        <thead>
                                            <tr>
                                                <th className="w-1/6 border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                    Key
                                                </th>
                                                <th className="w-4/6 border-b p-4 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                    Value
                                                </th>
                                                <th className="w-1/6 border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"></th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className="bg-white dark:bg-slate-800"
                                            key="scan-result"
                                        >
                                            {Array.from(Array(5).keys()).map(
                                                (i) => (
                                                    <tr key={i}>
                                                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            <Skeleton className="h-5 w-3/5" />
                                                        </td>
                                                        <td className="border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            <Skeleton className="h-5 w-5/6" />
                                                        </td>
                                                        <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            <div role="status">
                                                                <svg
                                                                    aria-hidden="true"
                                                                    className="mr-2 inline h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                                                    viewBox="0 0 100 101"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                        fill="currentFill"
                                                                    />
                                                                </svg>
                                                                <span className="sr-only">
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                                    You did a {tool} the following website:{" "}
                                    <b>{server}</b>
                                </p>
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
                        </div>
                    </div>
                    <Separator />
                    <div className="not-prose relative mt-8 mb-4 overflow-hidden rounded-xl border bg-slate-50 dark:border-slate-700 dark:bg-slate-800/25">
                        <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
                            <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
                                <div className="flex items-center space-x-1 sm:pr-4">
                                    JSON Output
                                </div>
                            </div>
                        </div>
                        <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
                            <Skeleton className="h-5 w-3/5" />
                            <Skeleton className="mt-1 h-5 w-2/5" />
                            <Skeleton className="mt-1 h-5 w-1/5" />
                            <Skeleton className="mt-1 h-5 w-3/5" />
                        </div>
                    </div>
                </>
            )}

            {result && (
                <>
                    <div className="mb-8 w-full">
                        <h2 className="sm:text-1xl mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                            Scan Result
                        </h2>
                        <div className="not-prose relative mt-5 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25">
                            <div
                                style={{ backgroundPosition: "10px 10px" }}
                                className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                            ></div>
                            <div className="relative overflow-auto rounded-xl">
                                <div className="my-4 overflow-hidden shadow-sm">
                                    <table className="w-full table-auto border-collapse text-sm">
                                        <thead>
                                            <tr>
                                                <th className="w-1/6 border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                    Key
                                                </th>
                                                <th className="w-4/6 border-b p-4 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                    Value
                                                </th>
                                                <th className="w-1/6 border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"></th>
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
                                                            {result[key]}
                                                        </td>
                                                        <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            <Info height="15px" />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                                    You did a {tool} the following website:{" "}
                                    <b>{server}</b>
                                </p>
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
                        </div>
                    </div>
                    <Separator />
                    <div className="not-prose relative mt-8 mb-4 overflow-hidden rounded-xl border bg-slate-50 dark:border-slate-700 dark:bg-slate-800/25">
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
                            >
                                {JSON.stringify(result, null, 2)}
                            </textarea>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
