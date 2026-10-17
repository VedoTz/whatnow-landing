import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planarela — Less deciding. More doing.",
  description:
    "Planarela turns your free time into personalized plans for solo time, dates, groups, events and vacations.",
  applicationName: "Planarela",

  icons: {
    icon: "/planarela-favicon.png",
    shortcut: "/planarela-favicon.png",
    apple: "/planarela-icon.png",
  },

  openGraph: {
    title: "Planarela — Less deciding. More doing.",
    description:
      "Tell Planarela who you're with, how much time you have and what you're in the mood for. Get a personalized plan in seconds.",
    type: "website",
    siteName: "Planarela",
    images: [
      {
        url: "/planarela-og.png",
        width: 1200,
        height: 630,
        alt: "Planarela",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Planarela — Less deciding. More doing.",
    description:
      "Personalized plans for your free time, groups, events and vacations.",
    images: ["/planarela-og.png"],
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