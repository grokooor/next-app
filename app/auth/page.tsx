"use client";
import { useSession } from "next-auth/react";
import React from "react";

import { SignInForm } from "@/features/auth/components/sign-in";
import { SignOutForm } from "@/features/auth/components/sign-out";

export default function Page() {
  const { data: session } = useSession();
  return (
    <section className="flex-1 flex flex-col gap-y-8 w-full content-center">
      {!session ? <SignInForm /> : <SignOutForm />}
    </section>
  );
}
