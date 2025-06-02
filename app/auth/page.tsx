import React from "react";

import AuthButton from "@/features/auth/components/button";

export default function Page() {
  return (
    <section className="flex-1 flex flex-col gap-y-8 w-full content-center">
      <AuthButton />
    </section>
  );
}
