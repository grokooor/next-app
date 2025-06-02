'use server';
import { signIn as naSignIn } from '@/auth'

export const signIn = async (provider: string)=> {
   await naSignIn(provider) 
}