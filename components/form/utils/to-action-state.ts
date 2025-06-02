import { ZodError } from "zod";

export type ActionState = {
    status?: string;
    // "SUCCESS" | "ERROR";
    message: string;
    payload?: FormData;
    fieldErrors: Record<string, string[] | undefined>;
    timestamp: number;
  };
    
export const EMPTY_ACTION_STATE:ActionState = {
    message: "", fieldErrors: {}, timestamp:Date.now()
}

export const fromErrorToActionState = (error: unknown, formData: FormData) => {
    console.log('fromErrorToActionState')
    console.log(error)
    if (error instanceof ZodError) {
        // if validation error with Zod, return first error msg
        return {
            status:"ERROR",
            message: "Zod error",
            fieldErrors: error.flatten().fieldErrors,
            payload: formData, timestamp:Date.now()
        }
    } else if (error instanceof Error) {
        // if another error instance, return error message
        // eg. database error
        return {
            status:"ERROR",
            message: error.message,
            fieldErrors: {cfTurnstileToken: [error.message],},
            payload: formData, timestamp:Date.now()
        }
    } else {
        // if not an error instance but something else crashed
        // return generic error message
        return {
            status:"ERROR",
            message: "An unkown error occurred",
            fieldErrors: {
                cfTurnstileToken: ['An unkown error occurred']
            },
            payload: formData, timestamp:Date.now()
        }
    }
}

export const toActionState = (
    status: ActionState["status"],
    message: string
  ): ActionState => {
    return {
      status,
      message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  };
  