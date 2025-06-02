// import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

const Form = ({
  action,
  actionState,
  children,
  className,
}: {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children?: React.ReactNode;
  className?: string;
}) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      console.log("onSuccess");
      if (actionState.message) {
        // toast.success(actionState.message);
        console.log(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      console.log("onError");
      console.log(actionState);
      if (actionState.message) {
        // toast.success(actionState.message);
        console.log(actionState.message);
      }
    },
  });
  return (
    <form action={action} className={cn("flex flex-col gap-y-2", className)}>
      {children}
    </form>
  );
};

export { Form };
