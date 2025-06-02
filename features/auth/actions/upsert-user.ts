"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { homePath } from "@/app/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

const upsertUserSchema = z.object({
  token: z.string().optional(),
  ip: z.string().nullish()
});

export const upsertUser = async ( params:any,
  _actionState: ActionState,
  formData: FormData) => {
  try {
    const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    console.log('upsertUser')
    console.log(formData)
    const data = upsertUserSchema.parse({
      token: formData.get("cf-turnstile-response"), 
      ip:formData.get('CF-Connecting-IP')
    });
    console.log('--- data ---')
    console.log(data)
    console.log('--- params ---')
    console.log(params)
    // check cfTurnstileToken
    // 
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
      body: JSON.stringify({
        secret: SECRET_KEY,
        response: data.token,
        // remoteip: ip
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const outcome = await result.json();
  if (outcome.success) {
    console.log('outcome success')
  } else {
    console.log('outcome failure')
    const e = new Error('Rejected Captcha.')
    return fromErrorToActionState(e, formData);
  }
    // redirect(homePath());
  } catch (e) {
    console.log("error");
    console.log(e);
    return fromErrorToActionState(e, formData);
  } finally {
    revalidatePath(homePath());
    return toActionState("SUCCESS", "User created");
  }
};
