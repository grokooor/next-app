'use server'
import { inArray } from "drizzle-orm";

import { drizzleClientHttp as db } from "@/db/drizzle.server";
import { videosTable } from "@/db/schema";

export type TIds = Array<string | null> | null | undefined;

const getVideos = async (ids?:TIds) => {
    try {
        if (ids) {
            const filteredIds = ids.filter(i => !!i)
            const mappedIds = filteredIds.map(i => i!.toString())
            const items = await db.select().from(videosTable).where(inArray(videosTable.id, mappedIds));
                return items;
        } 
        const items = await db.select().from(videosTable)
        return items        
    } catch (e) {
        console.log(e)
    }
    return []
}

export { getVideos };