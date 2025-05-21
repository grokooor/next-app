"use client";
// style guide: https://github.com/airbnb/javascript/tree/master/react

import Image from "next/image";

import { Card } from "@/components/card";

export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <Card
        title=""
        description=""
        content={
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        }
      />
    </section>
  );
}
