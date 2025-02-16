import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/styles/custom-styles.css';
import { Layout } from '@/components/layout'; 
import Script from 'next/script'
import { ContactFormProvider } from '@/contexts/ContactFormContext';
import { ContactFormModal } from '@/components/contact/ContactFormModal';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rocketlift.co'),
  title: {
    default: 'RocketLift Digital',
    template: '%s | RocketLift Digital'
  },
  description: 'Build your Digital Brand',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rocketlift.co/',
    siteName: 'RocketLift',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-576T8GM3');
            `
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-576T8GM3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ContactFormProvider>
          <Layout>{children}</Layout>
          <ContactFormModal />
        </ContactFormProvider>
      </body>
    </html>
  );
}
