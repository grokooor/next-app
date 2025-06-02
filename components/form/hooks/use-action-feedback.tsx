import { useEffect } from "react";

import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackoptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackoptions
) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
};
export { useActionFeedback };
