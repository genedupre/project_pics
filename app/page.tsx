import type { Metadata } from "next"
import dynamic from "next/dynamic"

import { siteConfig } from "@/config/site"
import { MagicText } from "@/components/client/magic-text"
import { ScanForm } from "@/components/client/scan"
import { Layout } from "@/components/layout"
import { LatestCVEsSkeleton } from "@/components/server/latest-cves-skeleton"
import { Separator } from "@/components/ui/separator"

const LatestCVEs = dynamic(
    /* @ts-expect-error Dynamic Component */
    () =>
        import("@/components/server/latest-cves").then((mod) => mod.LatestCVEs),
    {
        loading: () => <LatestCVEsSkeleton />,
    }
)

// This is the default metadata for all pages.
export const metadata: Metadata = {
    title: `${siteConfig.name}`,
    description: `${siteConfig.description}`,
}

export default async function IndexPage() {
    return (
        <Layout>
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
                        <MagicText text="Scan and analyze" /> your network{" "}
                        <br className="hidden sm:inline" />
                        for vulnerabilities and misconfigurations.
                    </h1>
                    <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
                        Get started by filling out the form below.
                    </p>
                </div>
                <div className="w-full">
                    <ScanForm />
                </div>
                <Separator />
                <LatestCVEs />
            </section>
        </Layout>
    )
}
