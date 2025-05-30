"use server";

import { drizzleClientHttp as db } from "@/db/drizzle.server";
import { videosTable } from "@/db/schema";

type SeedVideo = {
  url: string
  tags: string[];
}

const clips: Array<SeedVideo> = [
  { url: 'https://www.youtube.com/embed/X-Sb8sIi22g?clip=Ugkx2wj2Cun8N7m2GQ7IOabDUmCEG6O35_x5&amp;clipt=ENSd5wEY2OzoAQ', tags:['foo'] },
  {url: 'https://www.youtube.com/embed/YQJBapVwLqo?clip=UgkxBXaaA4rexAnA6t8x2N-k6iVDmR0GbBYC&amp;clipt=EKz_twEYyZe6AQ', tags:['foo']},
]
    
const main = async () => {
    try {
        await db.delete(videosTable);
        const t0 = performance.now();
        console.log("DB Seed: Started ...");
        // await db.execute('create table if not exists')
        await db.insert(videosTable).values(clips).onConflictDoNothing();
        const t1 = performance.now();
        console.log(`DB Seed Finished ${t1 - t0}ms`);
    } catch (err) {
        console.error(
            "An error occurred while attempting  seed the database:",
            err
        );
    }
};

(async () => await main())();
