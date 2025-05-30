"use client";
import React from "react";
import { useEffect, useState } from "react";

import { videosTable } from "@/db/schema";
import Player from "@/features/player/components/player";
import { getTagIds } from "@/features/player/queries/get-tags-ids";
import { getVideos } from "@/features/player/queries/get-videos";

export type DB_Videos = typeof videosTable.$inferSelect;
export type TContent = Array<DB_Videos> | undefined;

export default function Curated() {
  const [content, setContent] = useState<TContent>(undefined);
  useEffect(() => {
    (async () => {
      const videoIds = await getTagIds(undefined);
      // if (!videoIds) return;
      // const videoIdsFiltered = videoIds.filter((v) => v);
      const newContent = await getVideos(videoIds);
      setContent(newContent);
    })();
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <section className="flex-1 flex flex-col gap-y-8 w-full content-center">
      {content ? content.map((c, i) => <Player key={i} url={c.url} />) : null}
    </section>
  );
}
