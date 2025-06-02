"use client";

import { useActionState, useState } from "react";
import React from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { signOutUser } from "../actions/sign-out";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { signOut } from "next-auth/react";
type SignOutFormProps = {};

const SignOutForm = () => {
  const [actionState, action] = useActionState(
    signOutUser.bind(null, null),
    EMPTY_ACTION_STATE
  );
  const [isLoading, setIsLoading] = useState(true);

  useActionFeedback(actionState, {
    onSuccess: async ({ actionState }) => {
      await signOut();
      if (actionState.message) {
        //   // toast.success(actionState.message);
      }

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
        <SubmitButton label={"Signout"} />
        <FieldError actionState={actionState} name="signOut" />
      </Form>
    </>
  );
};
export default SignOutForm;
export { SignOutForm };
