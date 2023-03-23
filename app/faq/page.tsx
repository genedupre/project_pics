
import { Layout } from "@/components/layout"
import { siteConfig } from "@/config/site"
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
	title: `FAQ - ${siteConfig.name}`,
};

export default async function IndexPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Frequently asked questions
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            If something is not answered here, please contact us.
          </p>
        </div>
        <div className="flex gap-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this leagal?</AccordionTrigger>
              <AccordionContent>
                Yes. It should be
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where can I find the source code?</AccordionTrigger>
              <AccordionContent>
                You can find it on our github, click the github icon in the top right corner.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the purpose of this project?</AccordionTrigger>
              <AccordionContent>
                The purpose is to give the user a better understanding of their network. Scan for issues and misconfigurations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </Layout>
  )
}
