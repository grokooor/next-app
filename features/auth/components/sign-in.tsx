"use client";

import { useSession } from "next-auth/react";
import { useActionState, useState } from "react";
import React from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { upsertUser } from "../actions/upsert-user";
import Script from "next/script";
// import { LucideLoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { signIn } from "next-auth/react";
// type SignInFormProps = {};

const SignInForm = () => {
  // const { data: session } = useSession();
  const [actionState, action] = useActionState(
    upsertUser.bind(null, null),
    EMPTY_ACTION_STATE
  );
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // @ts-ignore
    globalThis.window.javascriptCallback = () => {
      // Enable input field only after Turnstile has succesfully loaded note that if turnstile fails this never runs
      setIsLoading(false);
    };
  }, []);

  useActionFeedback(actionState, {
    onSuccess: async ({ actionState }) => {
      console.log("useActionFeedback onSuccess");
      console.log(actionState);
      await signIn("twitter");
      // if (actionState.message) {
      //   // toast.success(actionState.message);
      // }

      // onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        // toast.error(actionState.message);
      }
    },
  });

  return (
    <>
      <Form action={action} actionState={actionState} className="min-w-[300px]">
        {/* Embed Turnstile library */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
        {/* Add sitekey and callback for when the token is ready */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-callback="javascriptCallback"
        />
        {/* {!isLoading ? (  // ) : (
      //   <Button color="ghost" disabled={true} className="w-full">
      //     <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
      //     <p>Waiting for cloudflare</p>
      //   </Button>
      // )}*/}
        <SubmitButton label={"Signin"} />
        <FieldError actionState={actionState} name="cfTurnstileToken" />
      </Form>
    </>
  );
};
export default SignInForm;
export { SignInForm };
