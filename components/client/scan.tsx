"use client"

import React, { useState } from "react"
import { Info } from "lucide-react"
import { Tooltip } from "nextjs-components"

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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export function ScanForm() {
  const [server, setServer] = useState("")
  const [tool, setTool] = useState("webscan")
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState("")

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    setResult(null)
    setLoading(true)
    const formData = new URLSearchParams()
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
      <div className="container mx-auto">
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="server"
            placeholder="Enter a URL or an IP-address"
            value={server}
            onChange={(e) => {
              setServer(e.target.value)
              setResult(null)
            }}
          />
          <RadioGroup
            name="tool"
            onChange={(e) => {
              setTool(e.target.value)
              setResult(null)
            }}
            defaultValue={tool || "webscan"}
            className="w-80"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="webscan" id="r1" />
              <Label htmlFor="r1">Web Scan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portscan" id="r2" disabled />
              <Label htmlFor="r2">Port Scan</Label>
            </div>
          </RadioGroup>
          {/* <Select name="tool" key="tool">
								<SelectTrigger className="w-80">
										<SelectValue placeholder="Select a tool" />
								</SelectTrigger>
								<SelectContent>
										<SelectGroup>
										<SelectLabel>Websites</SelectLabel>
										<SelectItem value="webscan">Web Scanner</SelectItem>
										<SelectItem value="certinfo" disabled>Certificate Information</SelectItem>
										<SelectItem value="whois" disabled>Domain Lookup</SelectItem>
										</SelectGroup>
										<SelectSeparator />
										<SelectGroup>
										<SelectLabel>Servers</SelectLabel>
										<SelectItem value="portscan" disabled>Port Scanner</SelectItem>
										<SelectItem value="full_portscan" disabled>Full Port scan</SelectItem>
										<SelectItem value="custom_portscan" disabled>Custom Port Scan</SelectItem>
										</SelectGroup>
								</SelectContent>
						</Select> */}
          <Button type="submit">Scan</Button>
          {/* <AlertDialog>
						<AlertDialogTrigger asChild>
								<Button variant="default">Scan</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
								<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure that you want to scan?</AlertDialogTitle>
								<AlertDialogDescription>
										We only reccomend this for educational purposes. If you scan a website or server that you do not own, you may be violating the law.
								</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction type="submit">Start scanning</AlertDialogAction>
								</AlertDialogFooter>
						</AlertDialogContent>
						</AlertDialog> */}
        </form>
      </div>

      {loading && (
        <>
          <div className="w-full mb-8">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl mt-4">
              Scan Result
            </h2>
            <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mt-5">
              <div
                style={{ backgroundPosition: "10px 10px" }}
                className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
              ></div>
              <div className="relative rounded-xl overflow-auto">
                <div className="shadow-sm overflow-hidden my-4">
                  <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-1/6">
                          Key
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-4/6">
                          Value
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-1/6"></th>
                      </tr>
                    </thead>
                    <tbody
                      className="bg-white dark:bg-slate-800"
                      key="scan-result"
                    >
                      {[...Array(8).keys()].map((i) => (
                        <tr key={i}>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            <Skeleton className="h-5 w-3/5" />
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                            <Skeleton className="h-5 w-5/6" />
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                              <span className="sr-only">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                  You did a {tool} the following website: <b>{server}</b>
                </p>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
            </div>
          </div>
          <Separator />
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mt-8 mb-4 border dark:border-slate-700">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex items-center space-x-1 sm:pr-4">
                  JSON Output
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-5 w-2/5 mt-1" />
              <Skeleton className="h-5 w-1/5 mt-1" />
              <Skeleton className="h-5 w-3/5 mt-1" />
            </div>
          </div>
        </>
      )}

      {result && (
        <>
          <div className="w-full mb-8">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl mt-4">
              Scan Result
            </h2>
            <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mt-5">
              <div
                style={{ backgroundPosition: "10px 10px" }}
                className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
              ></div>
              <div className="relative rounded-xl overflow-auto">
                <div className="shadow-sm overflow-hidden my-4">
                  <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-1/6">
                          Key
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-4/6">
                          Value
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-1/6"></th>
                      </tr>
                    </thead>
                    <tbody
                      className="bg-white dark:bg-slate-800"
                      key="scan-result"
                    >
                      {Object.entries(result).map((item) => (
                        <tr key={item}>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            {item[0]}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                            {item[1]}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            <Tooltip
                              text={
                                "We will add more information about this item in a later stage"
                              }
                            >
                              <Info height="15px" />
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                  You did a {tool} the following website: <b>{server}</b>
                </p>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
            </div>
          </div>
          <Separator />
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mt-8 mb-4 border dark:border-slate-700">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex items-center space-x-1 sm:pr-4">
                  JSON Output
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <label htmlFor="json" className="sr-only">
                JSON Output
              </label>
              <textarea
                id="json"
                rows={12}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-slate-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
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
