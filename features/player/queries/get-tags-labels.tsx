"use server";

import { drizzleClientWs as db } from "@/db/drizzle.server";
import { tagsTable } from "@/db/schema";

const getTags = async () => {
  try {
    const tags = await db.select().from(tagsTable);
    const setOfIds = new Set(tags.map((t) => t.tag));
    const arrOfTags = Array.from(setOfIds);
    return arrOfTags;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export { getTags };
