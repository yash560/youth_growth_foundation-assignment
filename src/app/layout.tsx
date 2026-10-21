import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NetPulse Guardian OS — AI Agent Network Security Orchestrator & MCP Server',
  description: 'Enterprise AI Agent Platform for Cisco/Juniper/VyOS/pfSense Devices, Unsupervised IDS, LSTM Congestion Prediction, and Intelligent SDN Control for Youth Growth Foundation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
