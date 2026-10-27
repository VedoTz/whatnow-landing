import type { Metadata, ResolvingMetadata } from "next";
import Home from "./home";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const inherited = await parent;
  return {
    metadataBase: new URL("https://planarela.com"),
    alternates: { canonical: "https://planarela.com/" },
    openGraph: { ...inherited.openGraph, url: "https://planarela.com/", images: [{ url: "https://planarela.com/planarela-og.png", width: 1200, height: 630, alt: "Planarela" }] },
    twitter: { ...inherited.twitter, card: "summary_large_image", images: ["https://planarela.com/planarela-og.png"] },
  };
}

export default Home;
