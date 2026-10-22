import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ygf.thewebvale.com'),
  title: 'NetPulse Guardian OS — Enterprise AI Agent Network Security & Device MCP Server | Youth Growth Foundation',
  description:
    'Enterprise AI Agent Platform for Cisco/Juniper/VyOS/pfSense Devices, Unsupervised IDS, LSTM Congestion Prediction, and Intelligent SDN Control. Powered by TheWebVale.',
  keywords: [
    'NetPulse Guardian OS',
    'Model Context Protocol',
    'MCP Server',
    'Network Security Orchestrator',
    'Autoencoder IDS',
    'SDN Controller',
    'Deep Q-Routing',
    'Youth Growth Foundation',
    'TheWebVale',
    'Next.js 15',
    'React 19',
  ],
  authors: [{ name: 'Youth Growth Foundation & TheWebVale' }],
  creator: 'TheWebVale',
  publisher: 'Youth Growth Foundation',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ygf.thewebvale.com',
    siteName: 'NetPulse Guardian OS',
    title: 'NetPulse Guardian OS — Enterprise AI Agent Network Security | Powered by TheWebVale',
    description:
      'Autonomous hardware MCP orchestration for Cisco, Juniper, VyOS & pfSense with unsupervised zero-day anomaly detection and deep Q-routing.',
    images: [
      {
        url: 'https://ygf.thewebvale.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NetPulse Guardian OS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetPulse Guardian OS — AI Agent Network Security | Powered by TheWebVale',
    description:
      'Hardware MCP Server & Unsupervised IDS for Enterprise Telecommunications Fabrics. Powered by TheWebVale.',
    images: ['https://ygf.thewebvale.com/og-image.png'],
    creator: '@TheWebVale',
  },
  alternates: {
    canonical: 'https://ygf.thewebvale.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
