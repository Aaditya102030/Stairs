
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const revalidate = 900;

const RSS_URL =
  "https://rss.app/feeds/8lCgaKOzhY6ZwFC7.xml";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) =>
    name === "item" || name === "media:content",
});

export async function GET() {
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error(`RSS request failed: ${response.status}`);
    }

    const xml = await response.text();
    const parsed = parser.parse(xml);

    const items = parsed?.rss?.channel?.item;

    if (!Array.isArray(items)) {
      throw new Error("Invalid RSS feed format");
    }

    const reels = items
      .map((item: any) => {
        const media = item["media:content"] ?? [];

        const mediaItems = Array.isArray(media)
          ? media
          : [media];

        const video = mediaItems.find(
          (entry: any) =>
            entry["@_medium"] === "video" ||
            entry["@_type"]?.includes("video")
        );

        const image = mediaItems.find(
          (entry: any) => entry["@_medium"] === "image"
        );

        if (!video?.["@_url"]) return null;

        return {
          id: item.guid?.["#text"] || item.link,
          title: item.title || "Stairs Instagram Reel",
          link: item.link,
          pubDate: item.pubDate || "",
          videoUrl: video["@_url"],
          thumbnailUrl: image?.["@_url"] || null,
        };
      })
      .filter(Boolean)
      .sort(
        (a: any, b: any) =>
          new Date(b.pubDate).getTime() -
          new Date(a.pubDate).getTime()
      )
      .slice(0, 6);

    return NextResponse.json(
      { reels },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Instagram RSS Error:", error);

    return NextResponse.json(
      {
        reels: [],
        error: "Unable to load Instagram videos",
      },
      { status: 502 }
    );
  }
}   
