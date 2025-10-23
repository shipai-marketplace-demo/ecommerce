import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopHub - Quality Products at Great Prices',
  description: 'Discover amazing products across electronics, clothing, books, and home goods. Fast shipping and excellent customer service.',
  keywords: 'ecommerce, shopping, electronics, clothing, books, home goods',
  authors: [{ name: 'ShopHub' }],
  openGraph: {
    title: 'ShopHub - Quality Products at Great Prices',
    description: 'Discover amazing products across electronics, clothing, books, and home goods.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Chatbase chatbot */}
        <Script id="chatbase-init" strategy="afterInteractive">
          {`
            (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://chatbase-git-vercel-integration.chatbase.fyi/embed.min.js";script.id="RLlWRZK2q-pknfnZYfRVz";script.domain="chatbase-git-vercel-integration.chatbase.fyi";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
          `}
        </Script>
      </body>
    </html>
  );
}
