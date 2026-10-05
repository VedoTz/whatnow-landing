import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatNow — Less deciding. More doing.",
  description:
    "WhatNow turns your free time into personalized plans for solo time, dates, groups, events and vacations.",
  applicationName: "WhatNow",

  icons: {
    icon: "/whatnow-icon.png",
    shortcut: "/whatnow-icon.png",
    apple: "/whatnow-icon.png",
  },

  openGraph: {
    title: "WhatNow — Less deciding. More doing.",
    description:
      "Tell WhatNow who you're with, how much time you have and what you're in the mood for. Get a personalized plan in seconds.",
    type: "website",
    siteName: "WhatNow",
    images: [
      {
        url: "/whatnow-og.png",
        width: 1200,
        height: 630,
        alt: "WhatNow",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WhatNow — Less deciding. More doing.",
    description:
      "Personalized plans for your free time, groups, events and vacations.",
    images: ["/whatnow-og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}