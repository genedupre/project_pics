import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/site"

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

export const metadata: Metadata = {
	title: `${siteConfig.name}`,
};

export default function IndexPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Scan and analyze your network <br className="hidden sm:inline" />
            for vulnerabilities and misconfigurations.
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Get started by filling out the form below.
          </p>
        </div>
        <div className="w-full">
          <div className="flex w-full max-w-4xl items-center space-x-2">
            <Input type="url" placeholder="Enter a URL or an IP-address" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Websites</SelectLabel>
                  <SelectItem value="webscan">Web Scanner</SelectItem>
                  <SelectItem value="certinfo">Certificate Information</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Servers</SelectLabel>
                  <SelectItem value="portscan">Port Scanner</SelectItem>
                  <SelectItem value="full_portscan">Full Port scan</SelectItem>
                  <SelectItem value="custom_portscan" disabled>
                    Custom Port Scan
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <AlertDialog>
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
            </AlertDialog>
          </div>
        </div>
      </section>
    </Layout>
  )
}
