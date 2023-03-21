import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        <Main />
        <NextScript />
      </body>

      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-transparent dark:border-gray-600">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 PICS Project. All Rights Reserved.</span>
      </footer>
    </Html>
  )
}
