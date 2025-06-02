"use server";
import { eq } from "drizzle-orm";

import { drizzleClientHttp as db } from "@/db/drizzle.server";
import { tagsTable } from "@/db/schema";

export type TQuery = string | undefined;

const getTagIds = async (tag?: TQuery) => {
  try {
    if (tag) {
      const tagStr = tag.toString();
      const tags = await db
        .select()
        .from(tagsTable)
        .where(eq(tagsTable.tag, tagStr));
      const setOfIds = new Set(tags.map((t) => t.id));
      const arrOfTags = Array.from(setOfIds);
      return arrOfTags;
    }
    const tags = await db.select().from(tagsTable);
    const setOfIds = new Set(tags.map((t) => t.id));
    const arrOfTags = Array.from(setOfIds);
    return arrOfTags;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export { getTagIds };
