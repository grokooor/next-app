"use client";
import { useSession } from "next-auth/react";

import { Card } from "@/components/card";
import { SignInForm } from "@/features/auth/components/sign-in";
import { SignOutForm } from "@/features/auth/components/sign-out";

const AuthButton = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <Card
          content={<SignInForm />}
          className="min-w-[300px] m-auto max-w-fit"
        />
      ) : (
        <Card
          content={<SignOutForm />}
          className="min-w-[300px] m-auto max-w-fit"
        />
      )}
    </>
  );
};

const SignOut = () => {
  const { data: session } = useSession();
  return <>{!session ? null : <SignOutForm />}</>;
};

export default AuthButton;
export { SignOut };
