"use server";
import { revalidatePath } from "next/cache";

import { homePath } from "@/app/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

export const signOutUser = async ( params:any,
  _actionState: ActionState,
  formData: FormData) => {
  try {
    
  } catch (e) {
    console.log("error");
    console.log(e);
    return fromErrorToActionState(e, formData);
  } finally {
      revalidatePath(homePath());
    return toActionState("SUCCESS", "User signout");
  }

};
