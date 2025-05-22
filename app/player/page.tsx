import React from "react";

import Player from "@/features/player/components/player";

export default function Curated() {
  return (
    <section className="flex-1 flex flex-col gap-y-8 w-full content-center">
      <Player url="https://www.youtube.com/embed/X-Sb8sIi22g?clip=Ugkx2wj2Cun8N7m2GQ7IOabDUmCEG6O35_x5&amp;clipt=ENSd5wEY2OzoAQ" />
    </section>
  );
}
